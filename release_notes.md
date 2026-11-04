# tsmoon-card 0.20.1-zh.1（中文适配）

这是 [ha-tsmoon-card](https://github.com/trollix/ha-tsmoon-card) 的非官方中文适配 fork。

## 新增

- 新增 `zh-CN`（简体）与 `zh-TW`（繁体）语言包，覆盖卡片、编辑器、错误提示和 8 个月相名称。
- 支持 `zh` / `zh-Hans` / `zh-CN` / `zh-Hans-CN` / `zh-TW` / `zh-Hant` / `zh-HK` 等语言代码。
- 卡片不写 `language:` 时自动跟随 Home Assistant 界面语言。
- 可视化编辑器标签中文化，语言改为下拉选择（含「自动（跟随 Home Assistant）」）。
- 语言回退链：目标语言 → 英文 → 原始 key。
- 无月出/月落时显示 `--:--`；未设置标题时不渲染空标题栏。

## 安装

HACS → 三个点 → **Custom repositories**：

- Repository: `https://github.com/hotkong/ha-tsmoon-card`
- Category: **Dashboard**

然后搜索 `Simple Moon Card` 安装。Release 资产：

- `tsmoon-card.js`
- `LICENSE`
- `THIRD_PARTY_NOTICES.md`

## 许可

原项目 MIT License，Copyright (c) 2020 Max Chodorowski。打包的第三方代码：`lit`（BSD-3-Clause）、`dayjs`（MIT）、`suncalc3`（BSD-2-Clause）、`tslib`（0BSD）。完整文本见 `THIRD_PARTY_NOTICES.md`。
