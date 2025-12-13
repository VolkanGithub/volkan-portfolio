"use strict";
// 用于提供 emmet 风格的自动完成功能
Object.defineProperty(exports, "__esModule", { value: true });
exports.doComplete = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const emmet_builder_1 = require("./emmet-builder");
function createRange(start, end) {
    return {
        start,
        end
    };
}
function doComplete(doc, position, lang, svginfo) {
    const items = [];
    try {
        const lineRange = createRange(vscode_languageserver_1.Position.create(position.line, 0), vscode_languageserver_1.Position.create(position.line + 1, -1));
        const line = doc.getText(lineRange);
        if (line.includes('<')) {
            // 只要本行内有这个字符就不应该处理
            return { isIncomplete: false, items };
        }
        let matches = emmet_builder_1.execAll(line);
        for (let match of matches) {
            if (match.index < position.character && match.endIndex >= position.character) {
                const eb = new emmet_builder_1.ENodeBuilder(svginfo);
                eb.defaultTagUseTree = true;
                if (eb.parse(match.texts)) {
                    const code = eb.toCode();
                    const label = match.texts.join('');
                    const startPosition = vscode_languageserver_1.Position.create(position.line, match.index + eb.partStartIndex);
                    const endPosition = vscode_languageserver_1.Position.create(position.line, match.endIndex);
                    const completionItem = {
                        label,
                        kind: vscode_languageserver_1.CompletionItemKind.Snippet,
                        documentation: {
                            kind: vscode_languageserver_1.MarkupKind.Markdown,
                            value: `<span style="opacity:0.5">SVG emmet abbreviations</span>
\`\`\`
${code.replace('$0', '|')}
\`\`\`
`
                        },
                        insertTextFormat: vscode_languageserver_1.InsertTextFormat.Snippet,
                        textEdit: vscode_languageserver_1.TextEdit.replace(createRange(startPosition, endPosition), code),
                        commitCharacters: ['\t']
                    };
                    items.push(completionItem);
                }
            }
        }
    }
    catch (e) {
        console.error(e);
    }
    return { isIncomplete: false, items };
}
exports.doComplete = doComplete;
//# sourceMappingURL=emmet.js.map