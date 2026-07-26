# 翻译风格指南（Style Guide）

本指南规范翻译的语气、文化适配策略和质量标准。

## 总体原则

1. **意译优于直译**：传达意图和情感，而非逐字翻译
2. **文化适配**：中国旅游行业特有概念须解释或适配目标文化
3. **营销语气**：这是营销网站，文案要有感染力和吸引力
4. **信息完整**：不删减源文信息，不添加源文没有的内容

## 文化适配策略

### 行业特色词

中国入境旅游行业有一些特有的概念，目标语言用户可能不理解：

- **"纯玩无购物"**：这是中国旅游行业的卖点，指不安排强制购物店停留。对东南亚/欧美用户须解释为"不强制购物"（No forced shopping stops），而非字面翻译"pure play no shopping"。
- **"管家"**：不是酒店门童（concierge），是全程跟随的私人旅行顾问。译为 "personal travel consultant" / "ที่ปรึกษาท่องเที่ยวส่วนตัว" 等。
- **"VIP通道"**：指景区免排队特权。译为 "fast-track VIP access" 等，强调价值。
- **"五星級"**：可保留，但可加 "international standard" 增强信任感。

### 营销文案

诗意/情感类文案需意译，保留感染力：

| 源文（zh-TW） | 不好的直译 | 推荐译法（en） |
|---|---|---|
| 我們深信，旅行是有溫度的 | We believe, travel has warmth | We believe every journey should warm the heart |
| 冰冷冷的世界裏 | In this cold cold world | In a world that can feel impersonal |
| 海涛旅行定制熱忱期盼您來中國旅行！ | Haitao Travel Custom hotly expects you to come to China! | We can't wait to welcome you to China! |

### 目标市场侧重点

| 市场 | 侧重点 |
|---|---|
| th/vi/id/ms（东南亚） | 性价比、中文服务、签证便利、美食 |
| en（欧美） | 深度文化体验、英语导游、安全可靠、独特景观 |
| zh-CN（大陆） | 纯玩无购物、品质保障、价格透明 |
| zh-TW（港澳台） | 深度体验、品质服务、文化探索 |

## 技术规范

### JSON 格式

- 保持与源文件相同的 key 结构，不增减 key
- 字符串值中的引号须用 `\"` 转义
- 保留 ICU 占位符 `{rank}` 原样
- 数组顺序须与源文件一致

### 字符编码

- 所有文件 UTF-8 编码，LF 换行
- zh-TW 文件须为纯繁体（不含简体字）
- zh-CN 文件须为纯简体（不含繁体字）
- 其他 locale 文件不应包含中文字符（除品牌名等特例）

### 标点符号

- zh-TW/zh-CN：使用中文标点（，。！？「」）
- en：使用英文标点（, . ! ? ""）
- th/vi/ms/id：使用各自语言的标点习惯
- 中文引号在 zh-TW 用「」，在 zh-CN 用 ""

## 质量检查清单

翻译完成后须逐项检查：

- [ ] 所有 key 与源文件一致
- [ ] 无源语言残留（非中文 locale 不含中文，zh-TW 不含简体，zh-CN 不含繁体）
- [ ] 品牌名、地名、人名符合术语表
- [ ] ICU 占位符 `{rank}` 保留
- [ ] 行业特色词已文化适配
- [ ] 营销文案有感染力（非机械直译）
- [ ] JSON 语法有效
