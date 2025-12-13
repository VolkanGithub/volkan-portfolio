"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModeDocument = exports.getModeAtOffset = exports.getModes = void 0;
const vscode_css_languageservice_1 = require("vscode-css-languageservice");
function getModes(content) {
    var _a, _b;
    let modes = [];
    let styleReg = /(<style[^>]*>)(<\!\[CDATA\[)?([\s\S]*)(\]\]>)?(<\/style>)/gim;
    let scriptReg = /(<script[^>]*>)(<\!\[CDATA\[)?([\s\S]*)(\]\]>)?(<\/script>)/gim;
    let offset = 0;
    let result = null;
    while (result = styleReg.exec(content)) {
        let blockStart = result.index + result[1].length + (((_a = result[2]) === null || _a === void 0 ? void 0 : _a.length) || 0);
        let blockEnd = blockStart + result[3].length;
        //let styleContext = content.substring(blockStart, blockEnd);
        modes.push({
            languageId: 'css',
            startOffset: blockStart,
            endOffset: blockEnd
        });
    }
    while (result = scriptReg.exec(content)) {
        let blockStart = result.index + result[1].length + (((_b = result[2]) === null || _b === void 0 ? void 0 : _b.length) || 0);
        let blockEnd = blockStart + result[3].length;
        //let styleContext = content.substring(blockStart, blockEnd);
        modes.push({
            languageId: 'javascript',
            startOffset: blockStart,
            endOffset: blockEnd
        });
    }
    return modes;
}
exports.getModes = getModes;
function getModeAtOffset(modes, offset) {
    for (let mode of modes) {
        if (mode.startOffset <= offset && mode.endOffset > offset) {
            return mode;
        }
    }
    return null;
}
exports.getModeAtOffset = getModeAtOffset;
function whitespace(content, start, end) {
    let s = '';
    for (let i = start; i < end; i++) {
        if (content[i] == '\r' || content[i] == '\n') {
            s += content[i];
        }
        else {
            s += ' ';
        }
    }
    return s;
}
function getModeDocument(document, content, modes, languageId) {
    let output = [];
    let offset = 0;
    for (let mode of modes) {
        if (mode.languageId == languageId) {
            if (mode.startOffset > offset) {
                output.push(whitespace(content, offset, mode.startOffset));
            }
            output.push(content.substring(mode.startOffset, mode.endOffset));
            offset = mode.endOffset;
        }
    }
    output.push(whitespace(content, offset, content.length));
    let cssContent = output.join('');
    let doc = vscode_css_languageservice_1.TextDocument.create(document.uri, languageId, document.version, cssContent);
    return doc;
}
exports.getModeDocument = getModeDocument;
//# sourceMappingURL=modes.js.map