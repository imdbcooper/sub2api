# Hardcoded Chinese UI Text Audit

Generated: 2026-06-11

Scope: `frontend/src` runtime files.

Excluded from actionable runtime scope: `frontend/src/i18n/locales/*`, tests/specs, comments, docs, and type-only comments.

## Status

No remaining user-visible hardcoded Chinese UI strings were found outside excluded locale/test paths.

The i18n extraction was completed in reviewable batches:

| Commit | Area |
| --- | --- |
| `0e312a73` | Auth/login agreement, common labels, channel pricing fallbacks, first email-template/settings cleanup |
| `c53fb2f2` | Auth source default labels |
| `06327f65` | DingTalk sync attribute names |
| `80474315` | Email OAuth settings copy |
| `0690c33f` | WeChat Connect settings copy |
| `a47b36fe` | Groups and account creation UI copy |
| `d0cfb47d` | Ops system logs and custom page copy |
| `98dca1a6` | Admin helper/runtime copy, validation helpers, email template metadata, legal defaults |

## Resolved Areas

| Area | Resolution |
| --- | --- |
| Auth/login agreement | Login/register warnings, prompt copy, document labels, and icon heuristics moved to i18n or locale-independent metadata. |
| Admin settings | Removed `localText(zh, en)` runtime copy in targeted settings sections and added locale keys for RU/EN/ZH. |
| Groups | Model selector controls, account filters, and copy-account labels moved to i18n. |
| Ops system logs | System-log table, filters, runtime config, health metrics, and actions moved to i18n. |
| Custom pages | TOC labels, inline load errors, and copy button states moved to i18n. |
| Account creation | Gemini/OpenAI account option labels, badges, and helper texts moved to i18n. |
| Channels pricing | Hardcoded fallbacks and interval validation messages replaced with locale keys or English non-UI fallback. |
| Email templates | Event metadata names/categories/descriptions moved from zh/en maps into i18n locale keys. |
| Legal documents | Default document titles are localized; icon detection no longer depends on Chinese title words. |
| Risk control | Default block message moved to i18n. |
| Settings API helpers | Option labels now expose `labelKey`/`fallbackLabel` instead of embedded Chinese labels. |
| Model whitelist presets | Remaining Chinese `pass-through` labels and console diagnostics replaced with non-Chinese text. |

## Remaining Intentional Runtime Han

These are intentionally left outside the actionable hardcoded-UI scope:

| File | Context | Reason |
| --- | --- | --- |
| `frontend/src/i18n/index.ts` | `name: '中文'` | Language self-name in locale picker. |
| `frontend/src/components/auth/DingTalkOAuthSection.vue` | SVG text `钉` | DingTalk brand/icon glyph. |
| `frontend/src/stores/adminCompliance.ts` | `FALLBACK_ZH_PHRASE` | Compliance acknowledgement phrase fallback; protocol/server phrase must remain exact. |
| `frontend/src/components/admin/monitor/MonitorTemplateApplyPickerDialog.vue` | `.replace(/^仅|^Only /, '')` | Locale-prefix cleanup for monitor template labels, not standalone UI copy. |
| `frontend/src/views/user/CustomPageView.vue` | `/[^\w一-鿿]+/g` | Allows Han characters in generated heading slugs. |

## Remaining Non-Runtime Matches

Remaining Han matches outside locale files are comments, type-only notes, CSS/template comments, or documentation-oriented examples. They are not user-visible runtime UI strings.

Representative examples:

| Area | Examples |
| --- | --- |
| API/type comments | `frontend/src/api/admin/ops.ts`, `frontend/src/api/admin/settings.ts`, `frontend/src/types/index.ts` |
| Implementation comments | `frontend/src/views/admin/SettingsView.vue`, `frontend/src/views/admin/GroupsView.vue`, `frontend/src/views/admin/UsersView.vue` |
| Utility/doc comments | `frontend/src/utils/apiError.ts`, `frontend/src/utils/format.ts`, `frontend/src/views/admin/ops/utils/opsFormatters.ts` |

## Verification

Final targeted checks run during extraction:

| Command | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run test:run -- src/components/admin/channel/__tests__/types.spec.ts src/api/__tests__/settings.paymentVisibleMethods.spec.ts src/views/admin/__tests__/SettingsView.spec.ts` | Passed, 28 tests |
| `git diff --check` | Passed |

Read-only final audit result: no likely user-visible hardcoded Chinese remained outside excluded locale/test paths.
