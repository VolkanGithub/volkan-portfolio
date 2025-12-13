"use strict";
// Path data hightlight support
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPathDataHightlightProvider = void 0;
const vscode_1 = require("vscode");
const path_grammar_1 = require("./path-grammar");
let PathCommandType, PathStopPointType;
let disposables = [];
let pathDataHighlight = null;
const defaultColors = {
    command: '#99f',
    stopPoint: '#f0f',
};
console.log('pdl.ts', __dirname);
function onDidChangeVisibleTextEditors(editors) {
    for (let editor of editors) {
        if (editor.document.languageId == 'svg') {
            handlePathDataHightlight(editor);
        }
    }
}
function createRange(doc, pathDataOffset, token) {
    return new vscode_1.Range(doc.positionAt(pathDataOffset + token.start), doc.positionAt(pathDataOffset + token.end));
}
function addStopRanges(doc, ranges, node, start, stepLen, pathDataOffset) {
    for (let s = 0; s < node.args.length; s += stepLen) {
        for (let i = s + start; i < node.args.length && i < s + stepLen; i++) {
            let token = node.args[i];
            ranges.push(new vscode_1.Range(doc.positionAt(pathDataOffset + token.start), doc.positionAt(pathDataOffset + token.end)));
        }
    }
}
function handlePathDataHightlight(editor) {
    if (pathDataHighlight === null) {
        let svg = vscode_1.workspace.getConfiguration('svg');
        pathDataHighlight = svg.pathDataHighlight;
    }
    if (!pathDataHighlight) {
        editor.setDecorations(PathCommandType, []);
        editor.setDecorations(PathStopPointType, []);
        return;
    }
    let content = editor.document.getText();
    let pathDataAttrRegex = /<(path|glyph|missing-glyph)[^>]*\sd\s*=\"([^\"]+)/g;
    let r;
    let commandRanges = [];
    let stopRanges = [];
    while (r = pathDataAttrRegex.exec(content)) {
        if (r.length > 2) {
            let pathData = r[2];
            let pathDataOffset = content.indexOf(pathData, r.index);
            let ast = path_grammar_1.parsePath(pathData);
            for (let node of ast) {
                commandRanges.push(createRange(editor.document, pathDataOffset, node.command));
                switch (node.commandType) {
                    case path_grammar_1.PathDataCommand.MovetoAbs:
                    case path_grammar_1.PathDataCommand.MovetoRel:
                    case path_grammar_1.PathDataCommand.LinetoAbs:
                    case path_grammar_1.PathDataCommand.LinetoRel:
                    case path_grammar_1.PathDataCommand.LinetoHorizontalAbs:
                    case path_grammar_1.PathDataCommand.LinetoHorizontalRel:
                    case path_grammar_1.PathDataCommand.LinetoVerticalAbs:
                    case path_grammar_1.PathDataCommand.LinetoVerticalRel:
                    case path_grammar_1.PathDataCommand.CurvetoQuadraticSmoothAbs:
                    case path_grammar_1.PathDataCommand.CurvetoQuadraticSmoothRel:
                        addStopRanges(editor.document, stopRanges, node, 0, 1, pathDataOffset);
                        break;
                    case path_grammar_1.PathDataCommand.ArcAbs:
                    case path_grammar_1.PathDataCommand.ArcRel:
                        addStopRanges(editor.document, stopRanges, node, 5, 7, pathDataOffset);
                        break;
                    case path_grammar_1.PathDataCommand.CurvetoCubicAbs:
                    case path_grammar_1.PathDataCommand.CurvetoCubicRel:
                        addStopRanges(editor.document, stopRanges, node, 4, 6, pathDataOffset);
                        break;
                    case path_grammar_1.PathDataCommand.CurvetoQuadraticAbs:
                    case path_grammar_1.PathDataCommand.CurvetoQuadraticRel:
                        addStopRanges(editor.document, stopRanges, node, 2, 4, pathDataOffset);
                        break;
                    case path_grammar_1.PathDataCommand.CurvetoCubicSmoothAbs:
                    case path_grammar_1.PathDataCommand.CurvetoCubicSmoothRel:
                        addStopRanges(editor.document, stopRanges, node, 2, 4, pathDataOffset);
                        break;
                }
            }
        }
    }
    editor.setDecorations(PathCommandType, commandRanges);
    editor.setDecorations(PathStopPointType, stopRanges);
}
function onDidChangeTextDocument(e) {
    let editor = vscode_1.window.visibleTextEditors.find(d => d.document.uri.toString() == e.document.uri.toString());
    if (editor) {
        handlePathDataHightlight(editor);
    }
}
function updatePathDataHighlightFromConfiguration() {
    let svg = vscode_1.workspace.getConfiguration('svg');
    pathDataHighlight = svg.pathDataHighlight;
}
function onDidChangeConfiguration(e) {
    if (e.affectsConfiguration('svg')) {
        updatePathDataHighlightFromConfiguration();
        onDidChangeVisibleTextEditors(vscode_1.window.visibleTextEditors);
    }
}
function registerPathDataHightlightProvider() {
    disposables.push(PathCommandType = vscode_1.window.createTextEditorDecorationType({ color: defaultColors.command, fontWeight: 'bold', rangeBehavior: vscode_1.DecorationRangeBehavior.ClosedClosed, overviewRulerLane: vscode_1.OverviewRulerLane.Full }), PathStopPointType = vscode_1.window.createTextEditorDecorationType({ color: defaultColors.stopPoint, rangeBehavior: vscode_1.DecorationRangeBehavior.ClosedClosed, overviewRulerLane: vscode_1.OverviewRulerLane.Full }), vscode_1.workspace.onDidChangeConfiguration(onDidChangeConfiguration), vscode_1.window.onDidChangeVisibleTextEditors(onDidChangeVisibleTextEditors), vscode_1.workspace.onDidChangeTextDocument(onDidChangeTextDocument));
    onDidChangeVisibleTextEditors(vscode_1.window.visibleTextEditors);
    return {
        dispose: () => {
            disposables.forEach(d => d.dispose());
        }
    };
}
exports.registerPathDataHightlightProvider = registerPathDataHightlightProvider;
//# sourceMappingURL=pdl.js.map