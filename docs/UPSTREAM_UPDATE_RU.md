# Обновление из upstream

Этот репозиторий ведется как локальный форк upstream-проекта `Wei-Shaw/sub2api`. При обновлении важно сохранить локальные изменения:

- русскую локализацию интерфейса;
- локальный фикс Responses-shaped `/v1/chat/completions` запросов для API-key OpenAI аккаунтов;
- fork-specific compliance middleware and legal/admin documentation;
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

Находясь в `main`, выполнить merge без немедленного коммита, чтобы проверить удалённые upstream файлы:

```bash
git checkout main
git merge --no-commit --no-ff upstream/main
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

В форке есть regression-тест полноты русской локали:

```bash
cd frontend
pnpm vitest run src/i18n/__tests__/ruLocaleKeys.spec.ts
```

При каждом upstream merge нужно запускать этот тест и переводить все новые ключи, а не добавлять английский fallback в `ru.ts`.

### Новые upstream возможности

После обновления до версии `0.1.162` дополнительно проверить:

- Grok SSO-cookie import и Grok CLI/OpenCode configuration;
- OpenAI long-context billing и ручной ChatGPT plan tier;
- Codex Web Search per-call pricing;
- host-фильтр системных логов;
- выбор пользователей в OpenAI Fast/Flex policy;
- импорт Codex `auth.json` и Agent Identity;
- duplicate account и новый optional ID column в списках accounts/groups/keys;
- Grok OAuth reconciliation, pool health и безопасный refresh;
- failover при отмене клиентом запроса и failover passthrough 5xx;
- Responses/Anthropic direct bridge, Read tool finalization и parallel tool-use;
- configurable OpenAI first-output timeout;
- security audit, session binding и step-up 2FA для чувствительных операций;
- prompt audit: хранилище полных промптов, Qwen3Guard pool, blocking/async режимы и retention;
- audit log IP/UA binding и новый ingress-reject cleanup;
- async image task API и object storage настройки;
- upstream billing probe, image-input billing и account scheduler cost weighting;
- duplicate operations для групп и channel monitors;
- Grok protected video/media quarantine, paid eligibility и custom headers/base URL;
- OpenAI API-key alpha/search scheduling, body-limit failover и WS turn lifecycle;
- новые security switches (по умолчанию отключены) и step-up gates для S3 backup/role promotion;
- миграции `177`–`184` и соответствующие schema changes.
- настраиваемый режим определения client IP, trusted proxies и пользовательские IP-заголовки;
- runtime-настройки object storage для async image tasks и защита S3 SecretAccessKey от временных ключей;
- Grok client-tool cache для Claude Desktop, Codex Lite и Trae, включая сохранение маршрутизации между ходами;
- Codex models manifest, стандартный OpenAI model-list envelope, quota errors и OAuth 401 unschedulable handling;
- HTTP bridge failover до реального terminal event и отсутствие повторного cache billing при retry того же аккаунта;
- Agent Identity import с изоляцией по Team и ограничение длины Codex `call_id`;
- обновлённый логотип, batch image guide i18n и удаление legacy `frontend/public/logo.png`.

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

Проверка нового frontend toolchain без изменения файлов:

```bash
cd frontend
pnpm typecheck
pnpm build
```

Перед push проверить, что текущая версия соответствует `backend/cmd/server/VERSION`, а `git diff --check` не сообщает об ошибках.

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

Серверный SSH закрыт от прямого доступа по публичному IP. Доступ выполняется через Cloudflare Tunnel и локальный SSH alias `sub2api`.

После успешной публикации образа проверить доступ:

```bash
ssh sub2api
```

Не пытаться подключаться напрямую к IP сервера или публичному `:22`: SSH daemon слушает локально за Cloudflare Tunnel.

Для production используется compose-файл:

```text
/opt/sub2api/docker-compose.yml
```

Имя сервиса приложения:

```text
sub2api
```

Обновить только контейнер приложения:

```bash
ssh sub2api "docker compose -f /opt/sub2api/docker-compose.yml pull sub2api"
ssh sub2api "docker compose -f /opt/sub2api/docker-compose.yml up -d sub2api"
ssh sub2api "docker compose -f /opt/sub2api/docker-compose.yml ps sub2api"
```

Логи после запуска:

```bash
ssh sub2api "docker compose -f /opt/sub2api/docker-compose.yml logs --tail=100 sub2api"
```

## Проверка после деплоя

Проверить, что контейнер запущен с новым образом:

```bash
ssh sub2api "docker compose -f /opt/sub2api/docker-compose.yml ps sub2api"
ssh sub2api "docker inspect sub2api --format '{{.Image}} {{.Config.Image}} {{.State.Status}} {{if .State.Health}}{{.State.Health.Status}}{{end}}'"
```

Затем повторить запрос, который раньше падал с `Instructions required`. Для API-key OpenAI аккаунта Responses-shaped `/v1/chat/completions` запрос должен уходить upstream с непустым `instructions`.
