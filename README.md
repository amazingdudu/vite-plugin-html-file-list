# vite-plugin-html-file-list [![npm](https://img.shields.io/npm/v/vite-plugin-html-file-list.svg)](https://npmjs.com/package/vite-plugin-html-file-list)

Lists all html files under the current project, useful for multi-page applications.

## Install

```sh
npm i vite-plugin-html-file-list -D
```

## Usage

```js
import htmlFileList from 'vite-plugin-html-file-list';

export default {
    plugins: [htmlFileList()]
};
```

## Options

```js
interface Options {
    /**
     * html file dir ,if src: ''， list the html of the root directory.
     * @default 'src'
     */
    dir?: string;
}
```
