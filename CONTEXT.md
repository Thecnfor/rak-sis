# 海涛旅行定制上下文

本文件定义这个营销站点里需要稳定命名的业务概念，避免在重构时同一个概念出现多种叫法。

## Language

**Destination**:
面向游客的一条目的地内容线，拥有稳定的 slug、页面路径、文案命名空间和配图结构。
_Avoid_: 景点页, slug 页面, travel item

**Featured destination**:
在首页或页脚等导览位置被挑选出来的 Destination 子集。它仍然是 Destination，只是展示位置不同。
_Avoid_: 热门卡片, 首页项, footer item
