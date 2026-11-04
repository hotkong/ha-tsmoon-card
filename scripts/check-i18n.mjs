#!/usr/bin/env node
/**
 * Verify that the Chinese tables cover every English key and that no
 * translation is empty. Run with: npm run check:i18n
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const languagesDir = path.join(root, 'src', 'localize', 'languages');

const en = JSON.parse(fs.readFileSync(path.join(languagesDir, 'en.json'), 'utf8'));

function flatten(table, prefix = '') {
    const out = [];
    for (const [key, value] of Object.entries(table)) {
        const full = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object') out.push(...flatten(value, full));
        else out.push(full);
    }
    return out;
}

function get(table, key) {
    return key.split('.').reduce((node, part) => node?.[part], table);
}

const englishKeys = flatten(en);
const targets = ['zh-CN.json', 'zh-TW.json'];
let failed = false;

for (const file of targets) {
    const table = JSON.parse(fs.readFileSync(path.join(languagesDir, file), 'utf8'));
    const missing = [];
    const empty = [];

    for (const key of englishKeys) {
        const value = get(table, key);
        if (typeof value !== 'string') missing.push(key);
        else if (!value.trim()) empty.push(key);
    }

    if (missing.length || empty.length) {
        failed = true;
        console.error(`✗ ${file}: missing=${missing.length} empty=${empty.length}`);
        if (missing.length) console.error('  missing:', missing.join(', '));
        if (empty.length) console.error('  empty:', empty.join(', '));
    } else {
        console.log(`✓ ${file}: ${englishKeys.length} keys`);
    }
}

// Every other language must at least keep the original upstream structure;
// new editor keys may be missing there and fall back to English by design.
for (const file of fs.readdirSync(languagesDir).filter((f) => f.endsWith('.json'))) {
    const table = JSON.parse(fs.readFileSync(path.join(languagesDir, file), 'utf8'));
    for (const section of ['common', 'errors', 'card', 'moon']) {
        if (!table[section]) {
            failed = true;
            console.error(`✗ ${file}: missing section "${section}"`);
        }
    }
}

if (failed) process.exit(1);
console.log('All translation checks passed.');
