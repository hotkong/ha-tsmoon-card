# HA-TSMOON

> **非官方中文适配 fork**（`hotkong/ha-tsmoon-card`，版本 `0.20.1-zh.1`）
>
> 本仓库基于上游 [trollix/ha-tsmoon-card](https://github.com/trollix/ha-tsmoon-card) v0.20，新增 `zh-CN` / `zh-TW` 语言包、语言代码解析与中文可视化编辑器；与上游作者无隶属关系。
>
> 原项目 MIT 许可，Copyright (c) 2020 Max Chodorowski；完整第三方声明见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。
>
> HACS 自定义仓库安装：`https://github.com/hotkong/ha-tsmoon-card`（类别 Dashboard）；Release 资产为 `tsmoon-card.js`。

Startup setup for new lovelace (Home Assistant) card development

## What is here?

* Card code written in TypeScript
* Bundling all the files to single output
* CSS code minimized, converted to TS and included in output bundle

## Goals

* [X] Display a simple card to display moon phase

## Installation

For installation you should have [HACS](https://hacs.xyz/docs/setup/download/) installed. Then add this repository <https://github.com/trollix/ha-tsmoon-card> in HACS and install the card. You have to reload you browser after installation.

Then you can add the new card into your dashboard.

### Easiest method

✨ Install via HACS

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=trollix&repository=ha-tsmoon-card)

### Alternative method

1. Download `tsmoon-card.js` from the [Releases](https://github.com/trollix/ha-tsmoon-card/releases) page
2. Upload to `/www/ha-tsmoon-card/tsmoon-card.js` (via Samba, File Editor, SSH, etc.)
3. Visit the Resources page in your Home Assistant install and add `/ha-tsmoon-card/tsmoon-card.js` as a
   JavaScript Module.
   [![Open your Home Assistant instance and show your dashboard resources.](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)
4. Refresh your browser

## Configuration

| Name        | Type    | Default      | Description                                              |
| ----------- | ------- | ------------ | -------------------------------------------------------- |
| type        | string  | **Required** | `custom:custom:tsmoon-card`                              |
| entity      | string  | **Required** | The entity id of moon sensor -> sensor.moon              |
| title       | string  | **optional** | Title displayed on the card                              |
| icon_type   | string  | **optional** | Type of picture for the moon (forms/round/photos)        |
| language    | string  | **optional** | The language used in the card                            |
| time_format | string  | **optional** | Time Format: 12h / 24h                                   |
| hemisphere  | string  | **optional** | Hemisphere (North:N - South:S)                           |

Example:

```yaml

type: custom:tsmoon-card
title: Lune
entity: sensor.moon
icon_type: round
time_format: 24h
language: fr
hemisphere: N

```

## Preview

### Card (en)

#### form-en

![HA-TSMOON-CARD](https://github.com/trollix/ha-tsmoon-card/blob/main/img_forms_en.png?raw=true "Ha TSMoon Card")

#### round-en

![HA-TSMOON-CARD](https://github.com/trollix/ha-tsmoon-card/blob/main/img_round_en.png?raw=true "Ha TSMoon Card")

#### photo-en

![HA-TSMOON-CARD](https://github.com/trollix/ha-tsmoon-card/blob/main/img_photos_en.png?raw=true "Ha TSMoon Card")

### Card (fr)

#### form-fr

![HA-TSMOON-CARD](https://github.com/trollix/ha-tsmoon-card/blob/main/img_forms_fr.png?raw=true "Ha TSMoon Card")

#### round-fr

![HA-TSMOON-CARD](https://github.com/trollix/ha-tsmoon-card/blob/main/img_round_fr.png?raw=true "Ha TSMoon Card")

#### photo-fr

![HA-TSMOON-CARD](https://github.com/trollix/ha-tsmoon-card/blob/main/img_photos_fr.png?raw=true "Ha TSMoon Card")

## Credits

### Code

* Time Format option : [tmcarr](https://github.com/tmcarr "tmcarr")

### Localization

* de: [MickLesk](https://github.com/MickLesk "MickLesk")
* es: [ldsmovil](https://github.com/ldsmovil "ldsmovil")
* sk: [misa1515](https://github.com/misa1515 "misa1515")
* ca: [rogodra](https://github.com/rogodra "rogodra")
* ru: [Nikolay-Ch](https://github.com/Nikolay-Ch "Nikolay-Ch")
* cz: [havlejan](https://github.com/havlejan "havlejan")
* pl: [arnione](https://github.com/arnione "arnione")
* pt: [ViPeR5000](https://github.com/ViPeR5000 "ViPeR5000")
* pt-BR : [netsoft-ruidias](https://github.com/netsoft-ruidias "netsoft-ruidias")
* ro: [boogytotyo](https://github.com/boogytotyo "boogytotyo")
* it: [sky7176](https://github.com/sky7176 "sky7176")
