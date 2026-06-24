# Agent Notes

## Server Access

- Production server access is through Cloudflare Tunnel, not direct SSH to the server IP.
- Use the local SSH alias:

```bash
ssh sub2api
```

- Do not assume port `22` is publicly reachable. The server SSH daemon is intentionally not exposed directly.
- The local machine must have `cloudflared` and an SSH config entry for `Host sub2api` that proxies through Cloudflare Access.
- Production compose file:

```text
/opt/sub2api/docker-compose.yml
```

- Production service name:

```text
sub2api
```

- To update only the application container after a successful GitHub Actions image build:

```bash
ssh sub2api "docker compose -f /opt/sub2api/docker-compose.yml pull sub2api"
ssh sub2api "docker compose -f /opt/sub2api/docker-compose.yml up -d sub2api"
ssh sub2api "docker compose -f /opt/sub2api/docker-compose.yml ps sub2api"
```

- The published image is:

```text
ghcr.io/imdbcooper/sub2api:latest
```

## Local Fork Requirements

- Preserve Russian localization in `frontend/src/i18n/locales/ru.ts` when merging upstream changes.
- Preserve the local Responses-shaped `/v1/chat/completions` API-key fix in `backend/internal/service/openai_gateway_chat_completions.go` unless upstream adds an equivalent fix.
- See `docs/UPSTREAM_UPDATE_RU.md` for the full upstream update and deploy checklist.
