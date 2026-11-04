import ca from './languages/ca.json';
import cz from './languages/cz.json';
import de from './languages/de.json';
import en from './languages/en.json';
import es from './languages/es.json';
import fr from './languages/fr.json';
import hu from './languages/hu.json';
import it from './languages/it.json';
import nb from './languages/nb.json';
import nl from './languages/nl.json';
import pl from './languages/pl.json';
import pt from './languages/pt.json';
import ptBR from './languages/pt-BR.json';
import ro from './languages/ro.json';
import ru from './languages/ru.json';
import sk from './languages/sk.json';
import zhCN from './languages/zh-CN.json';
import zhTW from './languages/zh-TW.json';

type LanguageTable = {
    [section: string]: {
        [key: string]: string;
    };
};

/**
 * Every table is keyed by its normalized language code (lowercase, no dash).
 * `ptbr` / `zhcn` / `zhtw` keep the region distinction that Home Assistant
 * exposes as `pt-BR`, `zh-CN` and `zh-TW`.
 */
const LANGUAGES = {
    ca,
    cz,
    de,
    en,
    es,
    fr,
    hu,
    it,
    nb,
    nl,
    pl,
    pt,
    ptbr: ptBR,
    ro,
    ru,
    sk,
    zhcn: zhCN,
    zhtw: zhTW,
} as unknown as Record<string, LanguageTable>;

const LANGUAGE_ALIASES: Record<string, string> = {
    cs: 'cz',
    no: 'nb',
    'nb-no': 'nb',
    'pt-br': 'ptbr',
};

export interface LanguageOption {
    value: string;
    label: string;
}

/** Native names, so the selector stays readable in every UI language. */
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
    { value: 'ca', label: 'Català' },
    { value: 'cz', label: 'Čeština' },
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'hu', label: 'Magyar' },
    { value: 'it', label: 'Italiano' },
    { value: 'nb', label: 'Norsk bokmål' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'pl', label: 'Polski' },
    { value: 'pt', label: 'Português' },
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'ro', label: 'Română' },
    { value: 'ru', label: 'Русский' },
    { value: 'sk', label: 'Slovenčina' },
    { value: 'zh-CN', label: '中文（简体）' },
    { value: 'zh-TW', label: '中文（繁體）' },
];

function normalizeLocale(locale?: string): string {
    return String(locale ?? '')
        .trim()
        .replace(/['"]+/g, '')
        .replace(/_/g, '-')
        .toLowerCase();
}

/**
 * Resolve a Home Assistant / card locale (e.g. `zh-Hans`, `zh-CN`, `pt-BR`)
 * to a key in {@link LANGUAGES}. Unknown locales fall back to English.
 */
export function resolveLanguage(locale?: string): string {
    const tag = normalizeLocale(locale);

    if (LANGUAGE_ALIASES[tag]) return LANGUAGE_ALIASES[tag];

    // Chinese needs script/region handling: zh-Hans* is Simplified,
    // zh-Hant* / zh-TW / zh-HK / zh-MO are Traditional.
    if (tag === 'zh' || tag.startsWith('zh-')) {
        return /(^|-)(hant|tw|hk|mo)($|-)/.test(tag) ? 'zhtw' : 'zhcn';
    }

    const compact = tag.replace(/-/g, '');
    if (LANGUAGES[compact]) return compact;

    const primary = tag.split('-')[0];
    if (LANGUAGE_ALIASES[primary]) return LANGUAGE_ALIASES[primary];
    if (LANGUAGES[primary]) return primary;

    return 'en';
}

function lookup(table: LanguageTable | undefined, path: string[]): string | undefined {
    let current: unknown = table;

    for (const part of path) {
        if (typeof current !== 'object' || current === null) return undefined;
        current = (current as Record<string, unknown>)[part];
    }

    return typeof current === 'string' ? current : undefined;
}

/**
 * Translate a dotted key. Missing translations fall back to English and,
 * as a last resort, to the key itself (never `undefined`).
 */
export function localize(key: string, locale?: string): string {
    const path = key.split('.');
    const language = resolveLanguage(locale);

    return lookup(LANGUAGES[language], path)
        ?? lookup(LANGUAGES.en, path)
        ?? key;
}
