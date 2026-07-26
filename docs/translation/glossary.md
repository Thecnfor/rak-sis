# 翻译术语表（Glossary）

本文件定义所有 locale 文件中必须统一使用的专有名词译法。任何翻译工作（人工或 LLM）都须遵循此表。

## 品牌名

| 术语 | zh-TW | zh-CN | en | th | vi | ms | id |
|---|---|---|---|---|---|---|---|
| 海涛旅行定制 | 海涛旅行定制 | 海涛旅行定制 | Haitao Travel Custom | ไห่เทาทราเวล คัสต้อม | Haitao Travel Custom | Haitao Travel Custom | Haitao Travel Custom |

**规则：** 品牌名在 en/vi/ms/id 统一用英文 "Haitao Travel Custom"；th 用音译 "ไห่เทาทราเวล คัสต้อม"；zh-TW/zh-CN 用中文 "海涛旅行定制"。禁止混用。

## 目的地名称

| 中文 | en | th | vi | ms | id |
|---|---|---|---|---|---|
| 重庆 | Chongqing | ฉงชิ่ง | Trùng Khánh | Chongqing | Chongqing |
| 四川 | Sichuan | เสฉวน | Tứ Xuyên | Sichuan | Sichuan |
| 张家界 | Zhangjiajie | จางเจียเจี๋ย | Trương Gia Giới | Zhangjiajie | Zhangjiajie |
| 贵州 | Guizhou | กุ้ยโจว | Quý Châu | Guizhou | Guizhou |
| 广西 | Guangxi | กว่างซี | Quảng Tây | Guangxi | Guangxi |
| 云南 | Yunnan | ยูนนาน | Vân Nam | Yunnan | Yunnan |
| 北京 | Beijing | ปักกิ่ง | Bắc Kinh | Beijing | Beijing |
| 西安 | Xi'an | ซีอาน | Tây An | Xi'an | Xi'an |

**规则：** en/ms/id 用拼音；th/vi 用传统音译（泰文音译、汉越音）。

## 行业特色词

| 术语 | zh-TW | en | th | vi | ms | id |
|---|---|---|---|---|---|---|
| 纯玩无购物 | 純玩無購物 | No forced shopping stops | ท่องเที่ยวโดยไม่มีร้านช้อปปิ้ง | Không mua sắm bắt buộc | Tanpa paksaan berhenti beli-belah | Tanpa perhentian belanja wajib |
| 管家 | 管家 | Personal travel consultant | ที่ปรึกษาท่องเที่ยวส่วนตัว | Cố vấn du lịch cá nhân | Perunding perjalanan peribadi | Konsultan perjalanan pribadi |
| VIP通道 | VIP通道 | Fast-track VIP access | ทางเข้า VIP พิเศษ | Lối VIP nhanh | Akses VIP pantas | Akses VIP cepat |
| 包车 | 包車 | Private car charter | เช่ารถส่วนตัว | Thuê xe riêng | Sewa kereta persendirian | Sewa mobil pribadi |
| 五星级 | 五星級 | Five-star | ระดับห้าดาว | Năm sao | Bintang lima | Bintang lima |
| 自有车队 | 自有車隊 | In-house fleet | รถของบริษัทเอง | Đội xe riêng | Armada syarikat sendiri | Armada perusahaan sendiri |

## 人名处理

客户评价中的人名统一用拼音 + 目标语言敬称：
- en/id/ms: "Ms. Zhang", "Mr. Chen", "Ms. Lin", "Mrs. Wang"
- th: "คุณจาง", "คุณเฉิน", "คุณหลิน", "คุณหวาง"
- vi: "Cô Trương", "Anh Trần", "Cô Lâm", "Bà Vương"

管家/导游的名字保留拼音："Xiao Zhou", "Ah-Ming", "Xiao Zhao" 等。

## ICU 占位符

`{rank}` 等占位符在所有 locale 中必须原样保留，不可翻译或移除。`TOP {rank}` 中的 "TOP" 可本地化：
- zh-TW: `TOP {rank}`（保留英文，品牌风格）
- en: `TOP {rank}`
- th: `อันดับ {rank}`
- vi: `TOP {rank}`
- ms/id: `TOP {rank}`

## Locales 部分命名规则

`Locales` 部分的值采用 **endonym**（语言自称）方式，在所有 locale 文件中保持一致：

| key | value（所有文件统一） |
|---|---|
| zh-TW | 繁體中文 |
| zh-CN | 简体中文 |
| en | English |
| th | ภาษาไทย |
| vi | Tiếng Việt |
| ms | Bahasa Melayu |
| id | Bahasa Indonesia |

> **注意：** 当前 en/id/ms/th/vi/zh-CN 文件使用了翻译方式而非 endonym。这是已知的待统一项。
