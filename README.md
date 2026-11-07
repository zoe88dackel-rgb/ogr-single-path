# OGR 单线指南

针对旧版 OGR 卖家指南「入口太多、概念重复」的重构原型。

## 核心假设

如果卖家打开后只有一条决策路径，且每个概念只出现一次，他们更容易读完并做出「做 / 不做 / 先算一票」的判断。

## 路径

1. `index.html` — 唯一主 CTA 入口  
2. `step-1.html` — 能不能做（准入说明，无勾选门槛）  
3. `step-2.html` — 值不值得（费用 + 计算器）  
4. `step-3.html` — 怎么发第一票（八步清单）  
5. `step-4.html` — 卖了能提多少（可提现）

视觉沿用现有 OGR 卖家指南的 `style.css` / `polish.css`，不另起一套。

## 本地预览

静态站点，无需构建：

```bash
npx --yes serve .
```

或直接用浏览器打开 `index.html`。

## 部署 GitHub Pages

推到仓库 `main` 根目录后，Settings → Pages → Deploy from branch → `main` / root。

内容口径参考 2026 年 Ozon OGR 招商资料，费用与准入以后台为准。
