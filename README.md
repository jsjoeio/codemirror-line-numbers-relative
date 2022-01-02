# Relative Line Numbers for CM6

## Installation

```shell
yarn add codemirror-line-numbers-relative
```

## Usage

[![Edit cm6-relative-line-numbers-ts (with package)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/cm6-relative-line-numbers-ts-with-package-tud4i?fontsize=14&hidenavigation=1&theme=dark)

```js
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { lineNumbersRelative } from "codemirror-line-numbers-relative";

new EditorView({
  state: EditorState.create({
    doc: `hello world!
who doesn't love relative line numbers?`,
    extensions: [lineNumbersRelative()],
  }),
  parent: document.querySelector("#editor"),
});
```

## Credit

This wouldn't be possible these resources:

- [updateListener example](https://gist.github.com/dralletje/058fe51415fe7dbac4709a65c615b52e#file-awesome-line-wrapping-js-L32-L44)
- [How to make a code editor with CodeMirror 6](https://www.raresportan.com/how-to-make-a-code-editor-with-codemirror6/)
- [Codemirror 6: Offset line numbers](https://discuss.codemirror.net/t/codemirror-6-offset-line-numbers/2675/2)
- [Relative (VIM style?) Line Numbers?](https://discuss.codemirror.net/t/relative-vim-style-line-numbers/2855)
- [relative line numbers cm5](https://github.com/codemirror/CodeMirror/issues/4116#issuecomment-426877029)
- [@replit/codemirror-vim](https://github.com/replit/codemirror-vim)
