import { LitElement, html } from 'lit';
import type { TemplateResult } from 'lit';

import { property, state } from 'lit/decorators.js';

import type { HomeAssistant } from 'custom-card-helpers';
import type { ICardConfig } from './types';
import { localize, SUPPORTED_LANGUAGES } from './localize/localize';

export class TSMoonCardEditor extends LitElement {

    @property({ attribute: false })
    public accessor hass!: HomeAssistant;

    @state()
    private accessor _config!: ICardConfig;

    /**
     * Called when the card configuration changes.
     */
    setConfig(config: ICardConfig): void {
        this._config = config;
    }

    /**
     * The editor follows the Home Assistant UI language, not the card
     * language, so labels stay readable while editing a card in another locale.
     */
    private t(key: string): string {
        return localize(key, this.hass?.locale?.language ?? 'en');
    }

    private _valueChanged(ev: CustomEvent): void {
        if (!this._config || !this.hass) {
            return;
        }

        const target = ev.currentTarget as HTMLElement & {
            configValue?: keyof ICardConfig;
            value?: string;
        };

        const configValue = target.configValue;

        if (!configValue) {
            return;
        }

        const value = ev.detail?.value ?? target.value;

        if (value === undefined) {
            return;
        }

        // The language selector uses `auto` to mean "no language key in YAML".
        const nextValue = configValue === 'language' && value === 'auto' ? '' : value;
        const currentValue = this._config[configValue] ?? '';

        if (currentValue === nextValue) {
            return;
        }

        const newConfig: ICardConfig = {
            ...this._config,
            [configValue]: nextValue,
        };

        if (configValue === 'language' && !nextValue) {
            delete newConfig.language;
        }

        this._config = newConfig;

        this.dispatchEvent(
            new CustomEvent('config-changed', {
                detail: { config: newConfig },
                bubbles: true,
                composed: true,
            }),
        );
    }

    render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        return html`
            <div class="card-config">
                <!-- Title -->
                <ha-textfield
                    label=${this.t('editor.title')}
                    .value=${this._config.title || ''}
                    .configValue=${'title'}
                    @input=${this._valueChanged}
                ></ha-textfield>

                <!-- Entity -->
                <ha-entity-picker
                    label=${this.t('editor.entity')}
                    .hass=${this.hass}
                    .value=${this._config.entity || ''}
                    .configValue=${'entity'}
                    @value-changed=${this._valueChanged}
                    allow-custom-entity
                ></ha-entity-picker>

                <!-- Icon type -->
                <ha-select
                    label=${this.t('editor.icon_type')}
                    .value=${this._config.icon_type || 'forms'}
                    .configValue=${'icon_type'}
                    .options=${[
                        { value: 'forms', label: this.t('editor.icon_forms') },
                        { value: 'round', label: this.t('editor.icon_round') },
                        { value: 'photo', label: this.t('editor.icon_photo') },
                        { value: 'clear', label: this.t('editor.icon_clear') },
                    ]}
                    @selected=${this._valueChanged}
                    @wa-hide=${(ev: Event) => ev.stopPropagation()}
                    @wa-after-hide=${(ev: Event) => ev.stopPropagation()}
                >
                </ha-select>

                <!-- Time format -->
                <ha-select
                    label=${this.t('editor.time_format')}
                    .value=${this._config.time_format || '24h'}
                    .configValue=${'time_format'}
                    .options=${[
                        { value: '24h', label: this.t('editor.time_24h') },
                        { value: '12h', label: this.t('editor.time_12h') },
                    ]}
                    @selected=${this._valueChanged}
                    @wa-hide=${(ev: Event) => ev.stopPropagation()}
                    @wa-after-hide=${(ev: Event) => ev.stopPropagation()}
                >
                </ha-select>

                <!-- Hemisphere -->
                <ha-select
                    label=${this.t('editor.hemisphere')}
                    .value=${this._config.hemisphere || 'N'}
                    .configValue=${'hemisphere'}
                    .options=${[
                        { value: 'N', label: this.t('editor.hemisphere_north') },
                        { value: 'S', label: this.t('editor.hemisphere_south') },
                    ]}
                    @selected=${this._valueChanged}
                    @wa-hide=${(ev: Event) => ev.stopPropagation()}
                    @wa-after-hide=${(ev: Event) => ev.stopPropagation()}
                >
                </ha-select>

                <!-- Language -->
                <ha-select
                    label=${this.t('editor.language')}
                    .value=${this._config.language || 'auto'}
                    .configValue=${'language'}
                    .options=${[
                        { value: 'auto', label: this.t('editor.language_auto') },
                        ...SUPPORTED_LANGUAGES,
                    ]}
                    @selected=${this._valueChanged}
                    @wa-hide=${(ev: Event) => ev.stopPropagation()}
                    @wa-after-hide=${(ev: Event) => ev.stopPropagation()}
                >
                </ha-select>
            </div>
        `;
    }
}

// Register the custom element
customElements.define('tsmoon-card-editor', TSMoonCardEditor);
