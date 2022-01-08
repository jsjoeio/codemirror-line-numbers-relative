import { Extension } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Compartment, EditorState } from "@codemirror/state";
import { lineNumbers } from "@codemirror/gutter";

let gutter = new Compartment();

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
const showLineNumbers = gutter.of(
  lineNumbers({ formatNumber: relativeLineNumbers })
);

// This ensures the numbers update
// when selection (cursorActivity) happens
const lineNumbersUpdateListener = EditorView.updateListener.of(
  (viewUpdate: ViewUpdate) => {
    if (viewUpdate.selectionSet) {
      viewUpdate.view.dispatch({
        effects: gutter.reconfigure(
          lineNumbers({ formatNumber: relativeLineNumbers })
        ),
      });
    }
  }
);

export function lineNumbersRelative(): Extension {
  return [showLineNumbers, lineNumbersUpdateListener];
}
