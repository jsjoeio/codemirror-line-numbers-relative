import { Extension } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Compartment, EditorState } from "@codemirror/state";
import { lineNumbers, gutter, GutterMarker } from "@codemirror/gutter";

let relativeLineNumberGutter = new Compartment();

class Marker extends GutterMarker {
  /** The text to render in gutter */
  text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  toDOM() {
    return document.createTextNode(this.text);
  }
}

const absoluteLineNumberGutter = gutter({
  lineMarker: (view, line) => {
    const lineNo = view.state.doc.lineAt(line.from).number;
    const absoluteLineNo = new Marker(lineNo.toString());
    const cursorLine = view.state.doc.lineAt(
      view.state.selection.asSingle().ranges[0].to
    ).number;

    if (lineNo === cursorLine) {
      return absoluteLineNo;
    }

    return null;
  },
  initialSpacer: () => {
    const spacer = new Marker("0");
    return spacer;
  },
});

function relativeLineNumbers(lineNo: number, state: EditorState) {
  if (lineNo > state.doc.lines) {
    return lineNo.toString();
  }
  const cursorLine = state.doc.lineAt(
    state.selection.asSingle().ranges[0].to
  ).number;
  if (lineNo === cursorLine) {
    return lineNo.toString();
  } else {
    return Math.abs(cursorLine - lineNo).toString();
  }
}
// This shows the numbers in the gutter
const showLineNumbers = relativeLineNumberGutter.of(
  lineNumbers({ formatNumber: relativeLineNumbers })
);

// This ensures the numbers update
// when selection (cursorActivity) happens
const lineNumbersUpdateListener = EditorView.updateListener.of(
  (viewUpdate: ViewUpdate) => {
    if (viewUpdate.selectionSet) {
      viewUpdate.view.dispatch({
        effects: relativeLineNumberGutter.reconfigure(
          lineNumbers({ formatNumber: relativeLineNumbers })
        ),
      });
    }
  }
);

export function lineNumbersRelative(): Extension {
  return [absoluteLineNumberGutter, showLineNumbers, lineNumbersUpdateListener];
}
