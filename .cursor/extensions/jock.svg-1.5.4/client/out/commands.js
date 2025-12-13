"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SvgFormattingProvider = exports.svgMinify = exports.copyDataUri = exports.svgMinifyToFile = void 0;
const SVGO = require("svgo");
const fs = require("fs");
const vscode_1 = require("vscode");
const unit_1 = require("./unit");
const formatPlugins = [{
        cleanupAttrs: false
    }, {
        removeDoctype: false,
    }, {
        removeXMLProcInst: false,
    }, {
        removeComments: false,
    }, {
        removeMetadata: false,
    }, {
        removeTitle: false,
    }, {
        removeDesc: false,
    }, {
        removeUselessDefs: false,
    }, {
        removeEditorsNSData: false,
    }, {
        removeEmptyAttrs: false,
    }, {
        removeHiddenElems: false,
    }, {
        removeEmptyText: false,
    }, {
        removeEmptyContainers: false,
    }, {
        removeViewBox: false,
    }, {
        cleanupEnableBackground: false,
    }, {
        convertStyleToAttrs: false,
    }, {
        convertColors: false,
    }, {
        convertPathData: false,
    }, {
        convertTransform: false,
    }, {
        removeUnknownsAndDefaults: false,
    }, {
        removeNonInheritableGroupAttrs: false,
    }, {
        removeUselessStrokeAndFill: false,
    }, {
        removeUnusedNS: false,
    }, {
        cleanupIDs: false,
    }, {
        cleanupNumericValues: false,
    }, {
        moveElemsAttrsToGroup: false,
    }, {
        moveGroupAttrsToElems: false,
    }, {
        collapseGroups: false,
    }, {
        removeRasterImages: false,
    }, {
        mergePaths: false,
    }, {
        convertShapeToPath: false,
    }, {
        sortAttrs: false,
    }, {
        removeDimensions: false,
    }, {
        removeAttrs: false,
    }, {
        inlineStyles: false
    }, {
        minifyStyles: false
    }];
const defaultMinifyPlugins = {
    cleanupAttrs: true,
    inlineStyles: true,
    removeDoctype: true,
    removeXMLProcInst: true,
    removeComments: true,
    removeMetadata: true,
    removeTitle: true,
    removeDesc: true,
    removeUselessDefs: true,
    removeXMLNS: true,
    removeEditorsNSData: true,
    removeEmptyAttrs: true,
    removeHiddenElems: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    removeViewBox: true,
    cleanupEnableBackground: true,
    minifyStyles: true,
    convertStyleToAttrs: true,
    convertColors: true,
    convertPathData: true,
    convertTransform: true,
    removeUnknownsAndDefaults: true,
    removeNonInheritableGroupAttrs: true,
    removeUselessStrokeAndFill: true,
    removeUnusedNS: true,
    prefixIds: true,
    cleanupIDs: true,
    cleanupNumericValues: true,
    cleanupListOfValues: true,
    moveElemsAttrsToGroup: true,
    moveGroupAttrsToElems: true,
    collapseGroups: true,
    removeRasterImages: false,
    mergePaths: true,
    convertShapeToPath: true,
    convertEllipseToCircle: true,
    sortAttrs: false,
    sortDefsChildren: true,
    removeDimensions: false,
    removeAttrs: false,
    removeAttributesBySelector: false,
    removeElementsByAttr: false,
    addClassesToSVGElement: false,
    addAttributesToSVGElement: false,
    removeOffCanvasPaths: false,
    removeStyleElement: false,
    removeScriptElement: false,
    reusePaths: false,
};
function getFullRange(doc) {
    let length = doc.getText().length;
    return new vscode_1.Range(new vscode_1.Position(0, 0), doc.positionAt(length));
}
function svgMinifyToFile(context, uri) {
    if (uri && uri.fsPath) {
        showMinifyWarning(context, () => {
            let newUri = unit_1.changeName(uri, (n, e) => n + '.min' + e);
            fs.readFile(uri.fsPath, { encoding: 'utf8' }, (e, data) => {
                if (data) {
                    let svgo = createMinifySVGO();
                    svgo.optimize(data)
                        .then(r => {
                        if (r.data) {
                            fs.writeFile(newUri.fsPath, r.data, { encoding: 'utf8' }, err => {
                                if (!err) {
                                    vscode_1.workspace.openTextDocument(newUri).then(doc => {
                                        vscode_1.window.showTextDocument(doc);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}
exports.svgMinifyToFile = svgMinifyToFile;
function createMinifySVGO() {
    let cplugins = vscode_1.workspace.getConfiguration('svg').get('minify', defaultMinifyPlugins);
    let plugins = [];
    for (let cp in cplugins) {
        if (typeof (cplugins[cp]) == 'boolean' || typeof (cplugins[cp]) == 'object') {
            let op = {};
            op[cp] = cplugins[cp];
            plugins.push(op);
        }
    }
    return new SVGO({
        plugins
    });
}
function copyDataUri(textEditor, edit) {
    if (textEditor.document.languageId == 'svg') {
        let svgo = createMinifySVGO();
        svgo.optimize(textEditor.document.getText()).then(r => {
            if (r.data) {
                // 转换为 base64
                let s = 'data:image/svg+xml;base64,' + Buffer.from(r.data).toString('base64');
                vscode_1.env.clipboard.writeText(s);
            }
        }).catch(reason => {
            vscode_1.window.showErrorMessage('Failed to minify the document.\n' + reason);
        });
    }
}
exports.copyDataUri = copyDataUri;
function showMinifyWarning(context, fn) {
    if (context.workspaceState.get('svg.skipMinifyWarning', false)) {
        fn();
        return;
    }
    vscode_1.window.showWarningMessage('[SVG] Irreversibly broken warning, Backup your svg!', {
        modal: true,
        detail: 'There have been multiple reports that the minimization feature may break your SVG, and we are still looking for a better library replacement for SVGO, so back up your SVG documentation when using the minimize feature.'
    }, { title: 'OK' }, { title: 'OK, Needless to say' }, { title: 'Cancel', isCloseAffordance: true })
        .then(r => {
        if (r && r.title.startsWith("OK")) {
            if (r.title === 'OK, Needless to say') {
                context.workspaceState.update('svg.skipMinifyWarning', true);
            }
            fn();
        }
    });
}
function svgMinify(context, textEditor, edit) {
    if (textEditor.document.languageId == 'svg') {
        showMinifyWarning(context, () => {
            let svgo = createMinifySVGO();
            svgo.optimize(textEditor.document.getText()).then(r => {
                if (r.data) {
                    textEditor.edit(edit => edit.replace(getFullRange(textEditor.document), r.data));
                }
            }).catch(reason => {
                vscode_1.window.showErrorMessage('Failed to minify the document.\n' + reason);
            });
        });
    }
}
exports.svgMinify = svgMinify;
class SvgFormattingProvider {
    provideDocumentFormattingEdits(document, options, token) {
        if (!vscode_1.window.activeTextEditor) {
            return null;
        }
        let svgo = new SVGO({
            full: false,
            plugins: formatPlugins,
            js2svg: { pretty: true, indent: vscode_1.window.activeTextEditor.options.tabSize }
        });
        return svgo.optimize(document.getText()).then(r => {
            if (r.data) {
                return [vscode_1.TextEdit.replace(getFullRange(document), r.data)];
            }
            return null;
        }).catch(reason => {
            vscode_1.window.showErrorMessage('Failed to format the document.\n' + reason);
            return null;
        });
    }
}
exports.SvgFormattingProvider = SvgFormattingProvider;
//# sourceMappingURL=commands.js.map