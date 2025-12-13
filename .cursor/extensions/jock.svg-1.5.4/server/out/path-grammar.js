"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePath = exports.PathDataTokenType = exports.PathDataCommand = void 0;
var PathDataCommand;
(function (PathDataCommand) {
    PathDataCommand["MovetoAbs"] = "M";
    PathDataCommand["MovetoRel"] = "m";
    PathDataCommand["LinetoAbs"] = "L";
    PathDataCommand["LinetoRel"] = "l";
    PathDataCommand["CurvetoCubicAbs"] = "C";
    PathDataCommand["CurvetoCubicRel"] = "c";
    PathDataCommand["CurvetoQuadraticAbs"] = "Q";
    PathDataCommand["CurvetoQuadraticRel"] = "q";
    PathDataCommand["ArcAbs"] = "A";
    PathDataCommand["ArcRel"] = "a";
    PathDataCommand["LinetoHorizontalAbs"] = "H";
    PathDataCommand["LinetoHorizontalRel"] = "h";
    PathDataCommand["LinetoVerticalAbs"] = "V";
    PathDataCommand["LinetoVerticalRel"] = "v";
    PathDataCommand["CurvetoCubicSmoothAbs"] = "S";
    PathDataCommand["CurvetoCubicSmoothRel"] = "s";
    PathDataCommand["CurvetoQuadraticSmoothAbs"] = "T";
    PathDataCommand["CurvetoQuadraticSmoothRel"] = "t";
    PathDataCommand["ClosePathAbs"] = "Z";
    PathDataCommand["ClosePathRel"] = "z";
})(PathDataCommand = exports.PathDataCommand || (exports.PathDataCommand = {}));
var PathDataTokenType;
(function (PathDataTokenType) {
    PathDataTokenType[PathDataTokenType["Command"] = 0] = "Command";
    PathDataTokenType[PathDataTokenType["Number"] = 1] = "Number";
    PathDataTokenType[PathDataTokenType["WhitespaceComma"] = 2] = "WhitespaceComma";
    PathDataTokenType[PathDataTokenType["Invalid"] = 3] = "Invalid";
})(PathDataTokenType = exports.PathDataTokenType || (exports.PathDataTokenType = {}));
function readNumber(p, i) {
    let sign = false;
    let dot = false;
    let num = false;
    let start = i;
    while (i < p.length) {
        let c = p.charAt(i);
        if (c == '+' || c == '-') {
            if (sign || num) {
                break;
            }
            i++;
            sign = true;
        }
        else if (c == '.') {
            if (dot) {
                break;
            }
            i++;
            dot = true;
        }
        else if (/\d/.test(c)) {
            num = true;
            i++;
        }
        else {
            break;
        }
    }
    return { type: PathDataTokenType.Number, start, end: i, data: p.substring(start, i) };
}
function whitespaceComma(p, i) {
    let comma = false;
    let start = i;
    while (i < p.length) {
        let c = p.charAt(i);
        if (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
            i++;
        }
        else if (c == ',') {
            if (comma) {
                break;
            }
            i++;
            comma = true;
        }
        else {
            break;
        }
    }
    return { type: PathDataTokenType.WhitespaceComma, start, end: i, data: p.substring(start, i) };
}
function getTokens(pathdata) {
    let i = 0;
    let tokens = [];
    while (i < pathdata.length) {
        let c = pathdata.charAt(i);
        if (c == ' ' || c == '\t' || c == '\r' || c == '\n' || c == ',') {
            let token = whitespaceComma(pathdata, i);
            tokens.push(token);
            i = token.end;
        }
        else if (/[0-9.+-]/.test(c)) {
            let token = readNumber(pathdata, i);
            tokens.push(token);
            i = token.end;
        }
        else if (/[mlhvcsqtaz]/i.test(c)) {
            tokens.push({ start: i, end: i + 1, type: PathDataTokenType.Command, data: c });
            i++;
        }
        else {
            tokens.push({ start: i, end: i + 1, type: PathDataTokenType.Invalid, data: c });
            i++;
        }
    }
    return tokens;
}
function buildAst(tokens) {
    let i = 0;
    let items = [];
    let item = null;
    let command = null;
    let commandPos = { start: 0, end: 0 };
    let args = [];
    let bads = [];
    for (; i < tokens.length; i++) {
        let token = tokens[i];
        if (token.type == PathDataTokenType.WhitespaceComma) {
            if (item) {
                item.end = token.end;
            }
            continue;
        }
        else if (token.type == PathDataTokenType.Command) {
            if (command != null) {
                items.push(item = {
                    start: commandPos.start,
                    end: token.start,
                    command,
                    commandType: command.data,
                    args,
                    bads
                });
                args = [];
            }
            command = token;
            commandPos.start = token.start;
        }
        else if (token.type == PathDataTokenType.Number) {
            if (command != null) {
                args.push(token);
                commandPos.end = token.end;
            }
            else {
                // invalid number position
                bads.push(token);
                commandPos.end = token.end;
            }
        }
        else {
            // invalid tokens
            bads.push(token);
            commandPos.end = token.end;
        }
    }
    if (command) {
        items.push(item = {
            start: command.start,
            end: getEndPos(command.end, args, bads),
            command,
            commandType: command.data,
            args,
            bads
        });
    }
    return items;
}
function getEndPos(offset, args, bads) {
    if (args && args.length && bads && bads.length) {
        return Math.max(args[args.length - 1].end, bads[bads.length - 1].end);
    }
    if (args && args.length) {
        return args[args.length - 1].end;
    }
    if (bads && bads.length) {
        return bads[bads.length - 1].end;
    }
    return offset;
}
function parsePath(pathdata) {
    let tokens = getTokens(pathdata);
    return buildAst(tokens);
}
exports.parsePath = parsePath;
//# sourceMappingURL=path-grammar.js.map