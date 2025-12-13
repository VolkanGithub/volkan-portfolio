"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeName = exports.writeB64ToFile = void 0;
const fs = require("fs");
let path = require('path');
const vscode_1 = require("vscode");
function writeB64ToFile(b64, path, done) {
    let data = Buffer.from(b64, 'base64'); // new Buffer(b64, 'base64');
    fs.writeFile(path, data, e => {
        done(e);
    });
}
exports.writeB64ToFile = writeB64ToFile;
function changeName(uri, callback) {
    let baseName = path.basename(uri.fsPath);
    let oldExt = path.extname(baseName);
    let oldName = baseName.substr(0, baseName.length - oldExt.length);
    let newPath = path.join(path.dirname(uri.fsPath), callback(oldName, oldExt));
    return vscode_1.Uri.file(newPath);
}
exports.changeName = changeName;
//# sourceMappingURL=unit.js.map