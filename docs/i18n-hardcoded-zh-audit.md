# Hardcoded Chinese UI Text Audit

Generated: 2026-06-11

Scope: `frontend/src` runtime files.

Excluded from the actionable list: `frontend/src/i18n/locales/*`, tests/specs, comments, docs, and type-only comments.

Classification:

| Code | Meaning |
| --- | --- |
| P0 | Direct user-facing Chinese text with no i18n key. |
| P1 | `localText(zh, en)` or bilingual helper text; still hardcoded and should move to i18n. |
| P2 | Existing `t(...)` i18n key with hardcoded Chinese fallback. Lower risk, but still embedded Chinese copy. |
| P3 | Chinese text used in runtime logic/heuristics, not necessarily displayed directly. Should become locale-independent metadata or i18n-aware logic. |

## Summary

| Area | Main issue |
| --- | --- |
| Auth/login agreement | User-visible warnings, agreement modal copy, and legal document labels are hardcoded in Chinese. |
| Admin settings | Large blocks use `localText(zh, en)` instead of locale files. |
| Groups | Model selector controls and account-filter section contain direct Chinese text. |
| Ops system logs | Entire system-log table/config UI is mostly hardcoded in Chinese. |
| Account creation | Several Gemini/OpenAI account option labels and helper texts are hardcoded. |
| Channels pricing | Mostly already keyed, but Chinese fallbacks and validation messages remain. |
| Email templates | Event metadata names/categories/descriptions are hardcoded in Chinese. |
| Legal documents | Runtime icon/category detection checks Chinese title words. |

## Actionable List

### `frontend/src/composables/useModelWhitelist.ts`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 292 | `3.1-Pro-High透传` | Preset label. | Add model whitelist preset label key. |
| P0 | 293 | `3.1-Pro-Low透传` | Preset label. | Add model whitelist preset label key. |
| P0 | 297 | `2.5-Flash-Image透传` | Preset label. | Add model whitelist preset label key. |
| P0 | 298 | `3.1-Flash-Image透传` | Preset label. | Add model whitelist preset label key. |
| P0 | 300 | `3-Flash透传` | Preset label. | Add model whitelist preset label key. |
| P0 | 301 | `2.5-Flash-Lite透传` | Preset label. | Add model whitelist preset label key. |

### `frontend/src/views/KeyUsageView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 710 | `日` | `locale.value === 'zh' ? '日' : 'D'`. | Replace with i18n unit key or formatter. |
| P0 | 738 | `日` | Quota label unit. | Replace with i18n unit key or formatter. |
| P0 | 745 | `周` | Quota label unit. | Replace with i18n unit key or formatter. |
| P0 | 752 | `月` | Quota label unit. | Replace with i18n unit key or formatter. |

### `frontend/src/views/auth/RegisterView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 570 | `未同意最新条款前，无法注册或使用快捷登录。` | `appStore.showWarning(...)`. | Add auth agreement warning key. |
| P0 | 760 | `请先阅读并同意最新条款后再注册。` | `appStore.showWarning(...)`. | Add auth agreement warning key. |

### `frontend/src/views/auth/LoginView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 400 | `未同意最新条款前，无法输入账号密码或使用快捷登录。` | `appStore.showWarning(...)`. | Add login agreement warning key. |
| P0 | 431 | `请先阅读并同意最新条款后再登录。` | `appStore.showWarning(...)`. | Add login agreement warning key. |

### `frontend/src/views/auth/DingTalkCallbackView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 298 | `钉钉` | Displayed provider name. | Move to provider-label i18n map. |

### `frontend/src/components/auth/LoginAgreementPrompt.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 20 | `我已阅读并同意` | Checkbox text. | Add agreement checkbox key. |
| P0 | 45 | `继续登录前需要先同意最新条款。` | Modal body. | Add agreement modal key. |
| P0 | 47 | `未同意前，账号密码输入和快捷登录会保持禁用。` | Modal body. | Add agreement modal key. |
| P0 | 55 | `查看条款` | Link/button text. | Add agreement action key. |
| P0 | 75 | `条款更新通知` | Modal heading. | Add agreement heading key. |
| P0 | 85 | `我们的服务条款已于 {{ updatedAt || '近期' }} 更新。在继续使用服务之前，请仔细阅读并同意以下条款。` | Modal copy with `近期` fallback. | Add parameterized key and date fallback key. |
| P0 | 93 | `相关文档` | Section heading. | Add agreement documents key. |
| P0 | 124 | `拒绝` | Button text. | Add action key. |
| P0 | 131 | `同意并继续` | Button text. | Add action key. |
| P3 | 187 | `政策`, `隐私` | Title matching heuristic. | Replace with document metadata/type. |
| P3 | 190 | `国家`, `地区` | Title matching heuristic. | Replace with document metadata/type. |

### `frontend/src/components/auth/WechatOAuthSection.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 68 | `当前仅配置微信移动应用登录，需要在原生 App 中通过微信 SDK 发起授权。` | Warning/help text. | Add WeChat OAuth warning key. |

### `frontend/src/components/auth/DingTalkOAuthSection.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 22 | `钉` | Brand glyph in UI. | Decide whether to keep as brand glyph or move to provider branding config. |

### `frontend/src/views/admin/ChannelsView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P2 | 158 | `基础设置` | `t('admin.channels.form.basicSettings', fallback)`. | Existing key; remove hardcoded fallback when locales are complete. |
| P2 | 233 | `平台配置` | `t('admin.channels.form.platformConfig', fallback)`. | Existing key; remove hardcoded fallback when locales are complete. |
| P2 | 286 | `已选 ${section.group_ids.length} 个` | `t('admin.channels.form.selectedCount', ..., fallback)`. | Existing key; keep pluralization in locale. |
| P2 | 1437 | `${platformLabel} 平台未选择分组，请至少选择一个分组或禁用该平台` | `t('admin.channels.noGroupsSelected', ..., fallback)`. | Existing key; remove fallback. |
| P2 | 1444 | `${platformLabel} 平台下有定价条目未添加模型，请添加模型或删除该条目` | `t('admin.channels.emptyModelsInPricing', ..., fallback)`. | Existing key; remove fallback. |
| P0 | 1463 | `模型模式 '...' 和 '...' 冲突：匹配范围重叠` | Validation message. | Add parameterized conflict key. |
| P0 | 1476 | `模型映射源 '...' 和 '...' 冲突：匹配范围重叠` | Validation message. | Add parameterized conflict key. |
| P2 | 1491 | `按次/图片计费模式必须设置默认价格或至少一个计费层级` | `t('admin.channels.form.perRequestPriceRequired', fallback)`. | Existing key; remove fallback. |

### `frontend/src/components/admin/channel/PricingEntryCard.vue`

| Priority | Lines | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P2 | 37 | `未添加模型` | `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 51 | `定价配置` | `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 74 | `模型列表` | `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 80 | `输入模型名后按回车添加，支持通配符 *` | Placeholder fallback. | Existing key; remove fallback. |
| P2 | 86 | `计费模式` | `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 101 | `默认价格（未命中区间时使用）` | `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 106, 111, 116, 121, 126 | `输入`, `输出`, `缓存写入`, `缓存读取`, `图片输出` | Price labels. | Existing keys; remove fallbacks. |
| P2 | 108, 113, 118, 123, 128, 165, 201 | `默认` | Placeholder fallback. | Existing key; remove fallback. |
| P2 | 136 | `上下文区间定价（可选）` | `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 140 | `添加区间` | `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 160 | `默认单次价格（未命中层级时使用）` | `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 171, 174, 188 | `按次计费层级`, `添加层级`, `暂无层级，点击添加配置按次计费价格` | Tier UI. | Existing keys; remove fallbacks. |
| P2 | 196, 207, 210 | `默认图片价格（未命中层级时使用）`, `图片计费层级（按次）`, `添加层级` | Image pricing UI. | Existing keys; remove fallbacks. |
| P2 | 258, 259 | `按次`, `图片（按次）` | Billing mode labels. | Existing keys; remove fallbacks. |

### `frontend/src/components/admin/channel/IntervalRow.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 12, 53 | `含` | Direct text in max-bound labels. | Add interval inclusive label key. |
| P2 | 17, 22, 27, 32, 42, 58 | `输入`, `输出`, `缓存W`, `缓存R`, `分辨率`, `层级`, `单次价格` | Existing `t(...)` fallbacks. | Existing keys; remove fallbacks. |

### `frontend/src/components/admin/channel/types.ts`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 146 | `区间 #...: 最小 token 数 (...) 不能为负数` | Runtime validation helper. | Add parameterized validation key. |
| P0 | 150 | `区间 #...: 最大 token 数 (...) 必须大于 0` | Runtime validation helper. | Add parameterized validation key. |
| P0 | 153 | `区间 #...: 最大 token 数 (...) 必须大于最小 token 数 (...)` | Runtime validation helper. | Add parameterized validation key. |
| P0 | 161-165 | `输入价格`, `输出价格`, `缓存写入价格`, `缓存读取价格`, `单次价格` | Validation field-name constants. | Add field label keys. |
| P0 | 169 | `区间 #...: ...不能为负数` | Runtime validation helper. | Add parameterized validation key. |
| P0 | 179 | `区间 #...: 无上限区间（最大 token 数为空）只能是最后一个` | Runtime validation helper. | Add parameterized validation key. |
| P0 | 186 | `区间 #... 和 #... 重叠：前一个区间上界 (...) 大于当前区间下界 (...)` | Runtime validation helper. | Add parameterized validation key. |

### `frontend/src/views/admin/SettingsView.vue`

#### Email OAuth

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P1 | 1796 | `邮箱快捷登录` | Section heading via `localText`. | Add settings email OAuth key. |
| P1 | 1801 | `开启 GitHub 或 Google 邮箱授权登录后，系统会读取已验证邮箱，存在则直接登录，不存在则自动注册。` | Section description. | Add settings email OAuth key. |
| P1 | 1818 | `GitHub OAuth App 需要 read:user user:email 权限，回调地址填写下方后端地址。` | Help copy. | Add provider help key. |
| P1 | 1830-1838 | `开通引导：GitHub Settings ... Authorization callback URL 填下面的后端回调地址。` | Setup guide. | Add rich-text/linked guide key. |
| P1 | 1871 | `密钥已配置，留空以保留当前值。` | Placeholder/help text. | Add shared secret placeholder key. |
| P1 | 1880 | `后端回调地址` | Label. | Add shared callback label key. |
| P1 | 1894 | `生成并复制` | Button. | Add shared action key. |
| P1 | 1907 | `前端回跳地址` | Label. | Add shared callback label key. |
| P1 | 1928 | `Google OAuth 客户端需要 openid email profile 范围，并在凭据里登记后端回调地址。` | Help copy. | Add provider help key. |
| P1 | 1941 | `开通引导：Google Cloud Console ... Authorized redirect URIs。` | Setup guide. | Add rich-text/linked guide key. |
| P1 | 1965 | `密钥已配置，留空以保留当前值。` | Placeholder/help text. | Reuse shared secret placeholder key. |
| P1 | 1974 | `后端回调地址` | Label. | Reuse shared callback label key. |
| P1 | 1988 | `生成并复制` | Button. | Reuse shared action key. |
| P1 | 2001 | `前端回跳地址` | Label. | Reuse shared callback label key. |

#### WeChat OAuth

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P1 | 2055 | `PC 应用` | App type label. | Add WeChat app type key. |
| P1 | 2060 | `桌面浏览器通过微信开放平台扫码登录。可与公众号或移动应用同时存在。` | Help copy. | Add WeChat app type description key. |
| P1 | 2089 | `微信开放平台 PC 应用 AppID` | Placeholder/label. | Add WeChat field key. |
| P1 | 2109 | `密钥已配置，留空以保留当前值。` | Placeholder/help text. | Reuse shared secret placeholder key. |
| P1 | 2113 | `微信开放平台 PC 应用 AppSecret` | Placeholder/label. | Add WeChat field key. |
| P1 | 2128 | `公众号` | App type label. | Add WeChat app type key. |
| P1 | 2133 | `仅在微信内浏览器可用；非微信环境下会显示不可用。` | Help copy. | Add WeChat app type description key. |
| P1 | 2153, 2162 | `公众号 AppID` | Label/placeholder. | Add WeChat field key. |
| P1 | 2174, 2191 | `公众号 AppSecret` | Label/placeholder. | Add WeChat field key. |
| P1 | 2187 | `密钥已配置，留空以保留当前值。` | Placeholder/help text. | Reuse shared secret placeholder key. |
| P1 | 2206 | `移动应用` | App type label. | Add WeChat app type key. |
| P1 | 2211 | `原生移动端通过微信 SDK 唤起授权，网页端不会直接发起该流程。` | Help copy. | Add WeChat app type description key. |
| P1 | 2231, 2240 | `移动应用 AppID` | Label/placeholder. | Add WeChat field key. |
| P1 | 2250, 2264 | `移动应用 AppSecret` | Label/placeholder. | Add WeChat field key. |
| P1 | 2260 | `密钥已配置，留空以保留当前值。` | Placeholder/help text. | Reuse shared secret placeholder key. |
| P1 | 2284 | `如果同时启用 PC 应用和公众号/移动应用，这些应用需要挂在同一个微信开放平台主体下，否则 UnionID 无法稳定归并账号。` | Warning/help copy. | Add WeChat UnionID warning key. |
| P1 | 2297 | `浏览器回调地址` | Label. | Add WeChat callback label key. |
| P1 | 2312 | `用于 PC 应用和公众号的网页回调。移动应用走原生 SDK 时不直接使用这个浏览器回调。` | Help copy. | Add WeChat callback help key. |
| P0 | 8129 | `公众号和移动应用不能同时启用。` | Validation/error text. | Add WeChat validation key. |

#### DingTalk Attribute Mapping

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 2540 | `钉钉姓名` | Placeholder. | Add DingTalk attribute key. |
| P0 | 2586 | `钉钉企业邮箱` | Placeholder. | Add DingTalk attribute key. |
| P0 | 2632 | `钉钉部门` | Placeholder. | Add DingTalk attribute key. |
| P0 | 7119 | `钉钉企业邮箱` | Default form value/attribute label. | Add DingTalk attribute key. |
| P0 | 7120 | `钉钉姓名` | Default form value/attribute label. | Add DingTalk attribute key. |
| P0 | 7121 | `钉钉部门` | Default form value/attribute label. | Add DingTalk attribute key. |
| P0 | 7269 | `钉钉` | Provider title constant. | Move to provider-label i18n map. |
| P0 | 7271 | `通过钉钉首次注册或首次绑定时应用。` | Provider description. | Add provider description key. |

#### Login Agreement Settings

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P1 | 4989 | `登录条款确认` | Section heading via `localText`. | Add login agreement settings key. |
| P1 | 4994 | `控制登录页是否要求用户先阅读并同意服务条款、隐私政策或其他 Markdown 文档。` | Description. | Add login agreement settings key. |
| P1 | 5002 | `已启用`, `未启用` | Status text. | Reuse shared enabled/disabled keys. |
| P1 | 5013 | `展示形式` | Label. | Add display mode key. |
| P1 | 5027 | `弹窗` | Option label. | Add display mode option key. |
| P1 | 5040 | `复选框` | Option label. | Add display mode option key. |
| P1 | 5046 | `复选框会显示在登录按钮下方，未勾选前所有登录入口禁用。` | Help text. | Add display mode help key. |
| P1 | 5047 | `弹窗会在登录页打开，用户拒绝后所有登录入口保持禁用。` | Help text. | Add display mode help key. |
| P1 | 5054 | `条款更新日期` | Label. | Add updated date key. |
| P1 | 5062 | `日期或文档内容变化后，用户需要重新同意。` | Help text. | Add updated date help key. |
| P1 | 5071 | `协议文档` | Section heading. | Add agreement docs key. |
| P1 | 5076 | `文档名称可自定义，内容按 Markdown 保存。可参考：服务条款、使用政策、支持的国家和地区、服务特定条款。` | Help text. | Add agreement docs help key. |
| P1 | 5088 | `添加文档` | Button. | Add agreement docs action key. |
| P1 | 5116 | `未命名文档` | Fallback title. | Add agreement doc fallback key. |
| P1 | 5139 | `文档名称` | Label. | Add agreement doc field key. |
| P1 | 5145 | `例如：服务条款` | Placeholder. | Add agreement doc placeholder key. |
| P1 | 5150 | `路由标识` | Label. | Add agreement doc field key. |
| P1 | 5167 | `Markdown 内容` | Label. | Add agreement doc field key. |
| P1 | 5173 | `在这里填写正式 Markdown 内容。` | Placeholder. | Add agreement doc placeholder key. |
| P0 | 6939 | `服务条款` | Default document title. | Add localized default document factory. |
| P0 | 6944 | `使用政策` | Default document title. | Add localized default document factory. |
| P0 | 6949 | `支持的国家和地区` | Default document title. | Add localized default document factory. |
| P0 | 6954 | `服务特定条款` | Default document title. | Add localized default document factory. |
| P0 | 8057 | `启用登录条款确认时，至少需要保留一份文档。` | Validation/error text. | Add login agreement validation key. |
| P0 | 8069 | `登录条款文档名称不能为空。` | Validation/error text. | Add login agreement validation key. |
| P0 | 8080 | `登录条款文档路由不能重复：/legal/...` | Validation/error text. | Add parameterized validation key. |

#### Provider Descriptions And Actions

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 7255 | `通过 GitHub 已验证邮箱首次注册或首次绑定时应用。` | Provider description constant. | Add provider description key. |
| P0 | 7263 | `通过 Google 已验证邮箱首次注册或首次绑定时应用。` | Provider description constant. | Add provider description key. |
| P1 | 7614 | `回调地址已写入并复制。` | Success toast via `localText`. | Add shared success message key. |

### `frontend/src/views/admin/RiskControlView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 1226 | `内容审计命中风险规则，请调整输入后重试` | Default `block_message`. | Add localized default or server-configured localized message. |
| P0 | 1702 | `内容审计命中风险规则，请调整输入后重试` | Config fallback. | Add localized default or server-configured localized message. |
| P0 | 1782 | `内容审计命中风险规则，请调整输入后重试` | Payload fallback. | Add localized default or server-configured localized message. |

### `frontend/src/views/admin/GroupsView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 686 | `已选` | Selected count label. | Add model selector selected-count key. |
| P0 | 695 | `全选` | Button. | Add shared select-all key. |
| P0 | 702 | `反选` | Button. | Add shared invert-selection key. |
| P0 | 1300 | `账号过滤控制` | Section heading. | Add account-filter section key. |
| P0 | 1307 | `仅允许 OAuth 账号` | Setting label. | Add account-filter setting key. |
| P0 | 1312 | `已启用 — 排除 API Key 类型账号` | Status/help text. | Add account-filter status key. |
| P0 | 1313 | `未启用` | Status text. | Reuse shared disabled key. |
| P0 | 1344 | `仅允许隐私保护已设置的账号` | Setting label. | Add account-filter setting key. |
| P0 | 1349 | `已启用 — Privacy 未设置的账号将被排除` | Status/help text. | Add account-filter status key. |
| P0 | 1350 | `未启用` | Status text. | Reuse shared disabled key. |
| P0 | 1974 | `已选` | Edit modal selected count. | Reuse selected-count key. |
| P0 | 1983 | `全选` | Button. | Reuse shared select-all key. |
| P0 | 1990 | `反选` | Button. | Reuse shared invert-selection key. |
| P0 | 2584 | `账号过滤控制` | Edit section heading. | Reuse account-filter section key. |
| P0 | 2591 | `仅允许 OAuth 账号` | Edit setting label. | Reuse account-filter setting key. |
| P0 | 2596 | `已启用 — 排除 API Key 类型账号` | Edit status/help text. | Reuse account-filter status key. |
| P0 | 2597 | `未启用` | Status text. | Reuse shared disabled key. |
| P0 | 2628 | `仅允许隐私保护已设置的账号` | Edit setting label. | Reuse account-filter setting key. |
| P0 | 2633 | `已启用 — Privacy 未设置的账号将被排除` | Edit status/help text. | Reuse account-filter status key. |
| P0 | 2634 | `未启用` | Status text. | Reuse shared disabled key. |
| P0 | 3242 | `${g.name} (${g.account_count || 0} 个账号)` | Option label formatter. | Add parameterized/plural group account-count key. |
| P0 | 3257 | `${g.name} (${g.account_count || 0} 个账号)` | Option label formatter. | Add parameterized/plural group account-count key. |

### `frontend/src/views/admin/ops/components/OpsSystemLogTable.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 84 | `全部` | Filter option label. | Add ops logs filter key. |
| P0 | 200 | `系统日志加载失败` | Error toast. | Add ops logs message key. |
| P0 | 243 | `日志运行时配置已生效` | Success toast. | Add ops logs message key. |
| P0 | 246 | `保存日志配置失败` | Error toast. | Add ops logs message key. |
| P0 | 253 | `确认回滚为启动配置（env/yaml）并立即生效？` | `window.confirm`. | Add confirmation key. |
| P0 | 266 | `已回滚到启动日志配置` | Success toast. | Add ops logs message key. |
| P0 | 270 | `回滚日志配置失败` | Error toast. | Add ops logs message key. |
| P0 | 277 | `确认按当前筛选条件清理系统日志？该操作不可撤销。` | `window.confirm`. | Add confirmation key. |
| P0 | 294 | `清理完成，删除 ... 条日志` | Success toast. | Add parameterized/plural key. |
| P0 | 299 | `清理系统日志失败` | Error toast. | Add ops logs message key. |
| P0 | 363 | `系统日志` | Heading. | Add ops logs heading key. |
| P0 | 364 | `默认按最新时间倒序，支持筛选搜索与按条件清理。` | Description. | Add ops logs description key. |
| P0 | 367-370 | `队列`, `写入`, `丢弃`, `失败` | Metric badges. | Add ops logs metric label keys. |
| P0 | 376 | `运行时日志配置（实时生效）` | Section heading. | Add runtime config heading key. |
| P0 | 377, 485 | `加载中...` | Loading text. | Reuse shared loading key. |
| P0 | 381, 440, 492 | `级别` | Label/table header. | Add log level key. |
| P0 | 385 | `堆栈阈值` | Label. | Add stack threshold key. |
| P0 | 389 | `采样初始` | Label. | Add sampling initial key. |
| P0 | 393 | `采样后续` | Label. | Add sampling thereafter key. |
| P0 | 397 | `保留天数` | Label. | Add retention days key. |
| P0 | 414 | `保存中...`, `保存并生效` | Button state. | Add action keys. |
| P0 | 417 | `回滚默认值` | Button. | Add action key. |
| P0 | 423 | `最近写入错误：` | Error label. | Add recent error key. |
| P0 | 428 | `时间范围` | Label. | Add time range key. |
| P0 | 432 | `开始时间（可选）` | Label. | Add start time key. |
| P0 | 436 | `结束时间（可选）` | Label. | Add end time key. |
| P0 | 444 | `组件` | Label. | Add component key. |
| P0 | 445 | `如 http.access` | Placeholder. | Add example placeholder key. |
| P0 | 464 | `平台` | Label. | Add platform key or reuse. |
| P0 | 468 | `模型` | Label. | Add model key or reuse. |
| P0 | 472 | `关键词` | Label. | Add keyword key. |
| P0 | 473 | `消息/request_id` | Placeholder. | Add search placeholder key. |
| P0 | 478 | `查询` | Button. | Add action key. |
| P0 | 479 | `重置` | Button. | Add action key. |
| P0 | 480 | `按当前筛选清理` | Button. | Add action key. |
| P0 | 481 | `刷新健康指标` | Button. | Add action key. |
| P0 | 486 | `暂无系统日志` | Empty state. | Add empty state key. |
| P0 | 491 | `时间` | Table header. | Add table header key. |
| P0 | 493 | `日志详细信息` | Table header. | Add table header key. |

### `frontend/src/views/admin/ops/components/OpsDashboardHeader.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 891 | `剩余 {{ props.autoRefreshCountdown }}s` | Countdown text. | Add parameterized auto-refresh key. |

### `frontend/src/views/admin/settings/EmailTemplateEditor.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P1 | 116 | `可退订通知`, `事务邮件` | Status labels via `localText`. | Add email template status keys. |
| P0 | 321-378 | `邮箱验证码`, `密码重置`, `通知邮箱验证码`, `订阅开通成功`, `订阅到期提醒`, `余额不足提醒`, `余额充值成功`, `账号限额告警`, `内容审计违规提醒`, `内容审计禁用账号`, `运维告警`, `运维定时报表` | Email event metadata names. | Add event metadata keys. |
| P0 | 321-378 | Event descriptions, for example `注册、绑定邮箱、OAuth 补全邮箱或 TOTP 邮箱校验时发送。` | Email event metadata descriptions. | Add event metadata description keys. |
| P0 | 321-378 | `认证安全`, `订阅`, `计费`, `管理告警`, `风控`, `运维` | Email event categories. | Add category label keys. |
| P1 | 479 | `通知` | Fallback category via `localText`. | Add category fallback key. |
| P0 | 481-486 | `认证安全`, `订阅`, `计费`, `管理告警`, `风控`, `运维` | Category label map. | Move category labels to i18n. |

### `frontend/src/views/user/CustomPageView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 38 | `目录` | TOC title. | Add custom page TOC key. |
| P0 | 67 | `目录` | Mobile/inline TOC text. | Reuse TOC key. |
| P0 | 319 | `复制` | Injected code-copy button text. | Add code-copy key. |
| P0 | 324 | `已复制 ✓` | Copied state. | Add copied state key. |
| P0 | 325 | `复制` | Reset text. | Reuse code-copy key. |
| P0 | 327 | `失败` | Failed state. | Add copy failed key. |
| P0 | 328 | `复制` | Reset text. | Reuse code-copy key. |

### `frontend/src/views/public/LegalDocumentView.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P3 | 167 | `政策`, `隐私` | Title matching heuristic. | Replace with document metadata/type. |
| P3 | 170 | `国家`, `地区` | Title matching heuristic. | Replace with document metadata/type. |
| P3 | 173 | `特定` | Title matching heuristic. | Replace with document metadata/type. |

### `frontend/src/api/admin/settings.ts`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 120, 133 | `未配置` | Payment option `labelZh`. | Move to localized option factory. |
| P0 | 123 | `支付宝官方` | Payment option `labelZh`. | Move to i18n. |
| P0 | 128 | `易支付支付宝` | Payment option `labelZh`. | Move to i18n. |
| P0 | 136 | `微信官方` | Payment option `labelZh`. | Move to i18n. |
| P0 | 141 | `易支付微信` | Payment option `labelZh`. | Move to i18n. |
| P0 | 169 | `PC 应用` | WeChat app type `labelZh`. | Move to i18n. |
| P0 | 172 | `公众号` | WeChat app type `labelZh`. | Move to i18n. |
| P0 | 177 | `移动应用` | WeChat app type `labelZh`. | Move to i18n. |

### `frontend/src/components/common/GroupOptionItem.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 34 | `倍率` | Direct text in `{{ rateMultiplier }}x 倍率`. | Add group multiplier key. |

### `frontend/src/components/account/ReAuthAccountModal.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 109 | `个人账号` | Display fallback. | Add account type label key. |

### `frontend/src/components/admin/account/ReAuthAccountModal.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 109 | `个人账号` | Display fallback. | Reuse account type label key. |

### `frontend/src/components/account/OAuthAuthorizationFlow.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P2 | 59 | `手动输入 Mobile RT` | Existing `t(...)` fallback. | Existing key; remove fallback. |
| P2 | 81 | `手动输入 AT` | Existing `t(...)` fallback. | Existing key; remove fallback. |

### `frontend/src/components/account/CreateAccountModal.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 515 | `个人账号，享受 Google One 订阅配额` | Card/body text. | Add Gemini account option key. |
| P0 | 521 | `推荐个人用户` | Feature text. | Add feature label key. |
| P0 | 526 | `无需 GCP` | Feature text. | Add feature label key. |
| P0 | 558 | `企业级，需要 GCP 项目` | Card/body text. | Add Vertex account option key. |
| P0 | 561 | `需要激活 GCP 项目并绑定信用卡` | Feature text. | Add feature label key. |
| P0 | 575 | `企业用户` | Feature text. | Add feature label key. |
| P0 | 580 | `高并发` | Feature text. | Add feature label key. |
| P0 | 603 | `隐藏`, `显示`, `高级选项（自建 OAuth Client）` | Toggle text. | Add advanced options keys. |
| P0 | 3013 | `修改归属地` | Label/button text. | Add region edit key. |

### `frontend/src/components/admin/monitor/MonitorTemplateApplyPickerDialog.vue`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P3 | 64 | `仅` | Regex `.replace(/^仅|^Only /, '')`. | Replace text manipulation with metadata-based label composition. |

### `frontend/src/stores/adminCompliance.ts`

| Priority | Line | Chinese text | Context | Action |
| --- | ---: | --- | --- | --- |
| P0 | 6 | `我已阅读、理解并同意 Sub2API 部署与运营合规承诺` | Fallback phrase constant. | Prefer server-provided localized phrase or i18n fallback key. |

## Recommended Extraction Order

| Order | Area | Reason |
| ---: | --- | --- |
| 1 | Auth/login agreement and admin compliance | Blocks login/admin flows and is highly visible. |
| 2 | SettingsView login/OAuth/legal agreement sections | Largest concentration of `localText` and direct Chinese copy. |
| 3 | OpsSystemLogTable | Whole screen is currently Chinese-heavy. |
| 4 | GroupsView and CreateAccountModal | High-traffic admin workflows. |
| 5 | Channel pricing validation and fallbacks | Important error messages; many already have keys. |
| 6 | EmailTemplateEditor metadata | Large but mostly data-map conversion. |
| 7 | P3 heuristics | Requires small design change to avoid title-language detection. |

## Notes

Chinese fallbacks inside `t(key, fallback)` are included because the next cleanup step can remove hardcoded Chinese literals once `en`, `zh`, and `ru` locale files have complete keys. `localText(zh, en)` is treated as hardcoded because it bypasses the central i18n locale files and has no Russian source string.
