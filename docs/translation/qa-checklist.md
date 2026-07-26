# 翻译质量检查清单（QA Checklist）

## CI 自动检查项

`scripts/check-i18n.mjs` 会在 CI 中自动检查以下项：

1. **结构完整性**：所有 locale 文件的 key 结构与 `zh-TW.json` 完全一致
2. **无源语言残留**：
   - `en`/`th`/`vi`/`ms`/`id` 的值不应包含中文字符（`[\u4e00-\u9fff]`），以下例外：
     - `Footer.brand`、`Navbar.brand`（品牌名）
     - `Locales.*` 的 endonym 值
   - `zh-TW.json` 不应包含明确的简体专用字
   - `zh-CN.json` 不应包含繁体专用字
3. **ICU 占位符保留**：`{rank}` 在所有 locale 的 `DestinationView.rankLabel` 中必须存在
4. **无空值**：所有 leaf value 不为空（除非源文件该位置也为空，如 `closing` 字段）
5. **品牌名一致**：`Metadata.title` 和 `Navbar.brand` 在每个 locale 内一致

## 人工检查项

CI 无法自动检查但须人工确认：

1. **术语一致性**：品牌名、地名、人名符合 `glossary.md`
2. **文化适配**：行业特色词已按 `style-guide.md` 做文化适配
3. **营销语气**：文案有感染力，非机械直译
4. **无拼写错误**：目标语言无拼写/语法错误
5. **上下文合理**：closing 字段内容与对应景点相关（无 copy-paste 错误）

## 已知历史问题（已修复）

以下问题在 2026-07-26 的翻译质量修复中处理：

- `Metadata.description` 在 6 个非中文 locale 全部未翻译 → 已翻译
- `destinationCards[].alt` 在所有 locale 用中文 → 已本地化
- `th.json` 27 处大段内容未翻译（中文/英文残留）→ 已补译
- `th.json` 拼写错误（`หยางซuo`、`fleet` 混入、品牌名不一致）→ 已修复
- `zh-TW.json` 简繁混用 → 已统一为纯繁体
- `zh-TW.json` copy-paste 错误（蚩尤九黎城 closing 写了海南内容）→ 已修复
- `zh-TW.json` 错别字（热枕→熱忱、壯麊→壯麗）→ 已修复

## 待统一项（待决策）

- `Locales` 部分命名方式：`zh-TW.json` 用 endonym，其他文件用翻译方式。是否统一为 endonym？
