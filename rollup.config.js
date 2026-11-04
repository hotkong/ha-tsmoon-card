import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cssImports from 'rollup-plugin-import-css';
//import template from 'rollup-plugin-html-literals';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image'
import versionInjector from 'rollup-plugin-version-injector';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import replace from '@rollup/plugin-replace';

let targetFileName = pkg.main;

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * Chinese-localization fork of ha-tsmoon-card (https://github.com/trollix/ha-tsmoon-card).
 * Original code Copyright (c) 2020 Max Chodorowski, MIT License.
 * Fork: https://github.com/hotkong/ha-tsmoon-card
 * Bundled dependencies: lit (BSD-3-Clause), dayjs (MIT), suncalc3 (BSD-2-Clause).
 * See THIRD_PARTY_NOTICES.md for full license texts.
 */`;

const plugins = [
  cssImports({minify:true}),
  resolve(),
  json(),
  image(),
  typescript(),
  commonjs(),
  versionInjector({
    injectInComments: false,
    logLevel: 'warn',
  }),
  replace({
    'typeof window': JSON.stringify('object'), // Replace 'typeof window' with a string
    preventAssignment: true,
  }), 
];


if (process.env.release) {
  //plugins.push(template())
  plugins.push(
    terser({
      compress: {},
      format: { comments: /^!/ },
    })
  );

  let repoRoot = pkg.repository.url
    .replace("https://github.com", "https://raw.githubusercontent.com")
    .replace(/.git$/, "");
  repoRoot += "/";

}

export default {
  external: [],
  input: 'src/index.ts',
  output: {
    globals: {
    },
    banner,
    file: targetFileName,
    format: 'iife',
    name: 'TSMoonCard'
  },
  context: 'this',
  plugins: plugins,

}