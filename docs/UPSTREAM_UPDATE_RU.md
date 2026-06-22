# Обновление из upstream

Этот репозиторий ведется как локальный форк upstream-проекта `Wei-Shaw/sub2api`. При обновлении важно сохранить локальные изменения:

- русскую локализацию интерфейса;
- локальный фикс Responses-shaped `/v1/chat/completions` запросов для API-key OpenAI аккаунтов;
- рабочую схему публикации Docker image через GitHub Actions.

## Репозитории

Основной fork для деплоя:

```bash
git remote -v
```

Ожидаемая схема:

```text
origin   https://github.com/imdbcooper/sub2api
upstream https://github.com/Wei-Shaw/sub2api.git
```

`origin/main` используется для GitHub Actions и публикации образа `ghcr.io/imdbcooper/sub2api:latest`.

## Перед обновлением

Проверить рабочее дерево:

```bash
git status --short
git log --oneline -10
```

Если есть незакоммиченные локальные изменения, сначала закоммитить их или отдельно сохранить. Не начинать merge/rebase с грязным рабочим деревом.

## Обновление из upstream

Получить свежий upstream:

```bash
git fetch upstream
```

Находясь в `main`, выполнить merge:

```bash
git checkout main
git merge upstream/main
```

Если возникли конфликты, разрешать их вручную, не удаляя локальные изменения, описанные ниже.

## Что обязательно сохранить

### Русская локализация

Проверить файл:

```text
frontend/src/i18n/locales/ru.ts
```

После merge убедиться, что новые ключи из upstream добавлены и переведены, а существующие русские строки не заменены китайскими/английскими значениями.

Полезная проверка:

```bash
git diff upstream/main -- frontend/src/i18n/locales/ru.ts
```

Если upstream добавил новые i18n-ключи в другие локали, нужно синхронизировать их в `ru.ts`.

### Локальный фикс instructions

Фикс защищает API-key OpenAI аккаунты, когда клиент отправляет Responses-shaped body (`input` без `messages`) на `/v1/chat/completions`. Без него upstream может вернуть `Instructions required`.

После обновления проверить файл:

```text
backend/internal/service/openai_gateway_chat_completions.go
```

В `ForwardAsChatCompletions`, перед `applyOpenAIFastPolicyToBody`, должна остаться логика:

```go
if isResponsesShape && isResponsesBodyInstructionsEmpty(responsesBody) {
	responsesBody, err = sjson.SetBytes(responsesBody, "instructions", defaultCodexSynthInstructions(upstreamModel))
	if err != nil {
		return nil, fmt.Errorf("set default instructions in responses-shape body: %w", err)
	}
}
```

Также должен остаться helper:

```go
func isResponsesBodyInstructionsEmpty(body []byte) bool {
	instructions := gjson.GetBytes(body, "instructions")
	return !instructions.Exists() || instructions.Type != gjson.String || strings.TrimSpace(instructions.String()) == ""
}
```

Если upstream сам добавит эквивалентную защиту, дублировать ее не нужно. Главный критерий: регрессионный тест ниже должен проходить.

## Проверки после merge

Минимальная проверка локального фикса:

```bash
cd backend
go test ./internal/service -run 'TestForwardAsChatCompletions_APIKeyResponsesShapeSynthesizesInstructions|TestForwardAsChatCompletions_APIKeyPropagatesPromptCacheKeyInResponsesBody' -count=1
```

Желательно также прогнать backend unit tests:

```bash
cd backend
make test-unit
```

Если менялись frontend/i18n файлы:

```bash
make test-frontend
```

## Коммит обновления

После успешного merge и проверок:

```bash
git status --short
git add .
git commit
```

Для чистого upstream merge обычно подходит сообщение вида:

```text
Merge remote-tracking branch 'upstream/main'
```

Для отдельной правки русской локализации:

```text
fix: sync Russian locale with upstream updates
```

Для восстановления локального фикса instructions:

```text
fix: preserve instructions for responses-shaped chat requests
```

## Публикация Docker image

Запушить в fork:

```bash
git push origin main
```

Push в `main` запускает GitHub Actions workflow:

```text
.github/workflows/docker-image.yml
```

Он собирает и публикует:

```text
ghcr.io/imdbcooper/sub2api:latest
```

Проверить workflow можно через GitHub UI или CLI:

```bash
gh run list --workflow docker-image.yml --limit 5
```

## Обновление сервера

После успешной публикации образа зайти на сервер через Cloudflare SSH:

```bash
ssh sub2api
```

Дальше в директории деплоя выполнить:

```bash
docker compose pull
docker compose up -d
docker compose logs -f --tail=100
```

Если compose-файл использует другое имя сервиса, обновить только нужный сервис:

```bash
docker compose pull backend
docker compose up -d backend
docker compose logs -f --tail=100 backend
```

## Проверка после деплоя

Проверить, что контейнер запущен с новым образом:

```bash
docker compose ps
docker image ls | grep sub2api
```

Затем повторить запрос, который раньше падал с `Instructions required`. Для API-key OpenAI аккаунта Responses-shaped `/v1/chat/completions` запрос должен уходить upstream с непустым `instructions`.
