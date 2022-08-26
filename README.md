# vite-plugin-html-file-list

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
     * html file dir
     * @default 'src'
     */
    dir?: string;
}
```
