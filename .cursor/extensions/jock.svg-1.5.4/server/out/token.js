"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildActiveToken = exports.getParentTagName = exports.getOwnerTagName = exports.getOwnerAttributeName = exports.getAllAttributeNames = exports.getTokenLen = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["None"] = 0] = "None";
    TokenType[TokenType["Invalid"] = 1] = "Invalid";
    TokenType[TokenType["Whitespace"] = 2] = "Whitespace";
    TokenType[TokenType["ProcessingInstruction"] = 3] = "ProcessingInstruction";
    TokenType[TokenType["String"] = 4] = "String";
    TokenType[TokenType["Comment"] = 5] = "Comment";
    TokenType[TokenType["CDATA"] = 6] = "CDATA";
    TokenType[TokenType["Entity"] = 7] = "Entity";
    TokenType[TokenType["Notation"] = 8] = "Notation";
    TokenType[TokenType["Name"] = 9] = "Name";
    TokenType[TokenType["TagName"] = 10] = "TagName";
    TokenType[TokenType["AttributeName"] = 11] = "AttributeName";
    TokenType[TokenType["StartTag"] = 12] = "StartTag";
    TokenType[TokenType["SimpleEndTag"] = 13] = "SimpleEndTag";
    TokenType[TokenType["EndTag"] = 14] = "EndTag";
    TokenType[TokenType["StartEndTag"] = 15] = "StartEndTag";
    TokenType[TokenType["Equal"] = 16] = "Equal";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
function getTokenLen(token) {
    return token.endIndex - token.startIndex;
}
exports.getTokenLen = getTokenLen;
const NO_OUTPUT_WHITE_TOKEN = false;
let spaceRegex = /^[ \r\n\t\f]+/;
let processingRegex = /^<\?.*?\?>/;
let commentRegex = /^<!--.*?-->/s;
let cdataRegex = /^<!\[CDATA\[.*?\]\]>/;
let entityRegex = /^<!ENTITY.*?>/;
let notationRegex = /^<!NOTATION.*?>/;
let nameRegex = /^[a-zA-Z0-9\-:]+/;
let startTagRegex = /^</;
let endTagRegex = /^>/;
let simpleEndTagRegex = /^\/>/;
let startEndTagRegex = /^<\//;
let equalRegex = /^=/;
let stringRegex = /^".*?"/s;
function getTokens(connection, content) {
    let tokens = [];
    let pos = 0;
    let lastToken = null;
    let regexTest = (reg, tokenType) => {
        let lifeContent = content.substring(pos);
        let r = lifeContent.match(reg);
        if (r) {
            let startIndex = pos;
            pos = startIndex + r[0].length;
            let token = {
                index: tokens.length,
                type: tokenType,
                startIndex: startIndex,
                endIndex: pos
            };
            if (NO_OUTPUT_WHITE_TOKEN && tokenType == TokenType.Whitespace) {
                return true;
            }
            tokens.push(lastToken = token);
            // connection.console.log("" + (tokens.length - 1) + ":" + tokenType + ":" + content.substring(token.startIndex, token.endIndex));
            return true;
        }
        return false;
    };
    let getLastTokenNoWitespace = () => {
        let idx = tokens.length;
        while (idx > 0) {
            idx--;
            if (tokens[idx].type != TokenType.Whitespace) {
                return tokens[idx];
            }
        }
    };
    let nameTest = (reg) => {
        let lifeContent = content.substring(pos);
        let r = lifeContent.match(nameRegex);
        if (r) {
            let startIndex = pos;
            pos = startIndex + r[0].length;
            let tokenType = TokenType.Name;
            let lt = getLastTokenNoWitespace();
            if (lastToken && lt) {
                if (lastToken.type == TokenType.StartTag || lastToken.type == TokenType.StartEndTag) {
                    tokenType = TokenType.TagName;
                }
                else if (lt.type == TokenType.String || lt.type == TokenType.TagName) {
                    tokenType = TokenType.AttributeName;
                }
            }
            let token = {
                index: tokens.length,
                type: tokenType,
                startIndex: startIndex,
                endIndex: pos
            };
            tokens.push(lastToken = token);
            return true;
        }
        return false;
    };
    while (pos < content.length) {
        let readed = regexTest(cdataRegex, TokenType.CDATA) ||
            regexTest(spaceRegex, TokenType.Whitespace) ||
            regexTest(processingRegex, TokenType.ProcessingInstruction) ||
            regexTest(commentRegex, TokenType.Comment) ||
            regexTest(entityRegex, TokenType.Entity) ||
            regexTest(notationRegex, TokenType.Notation) ||
            nameTest(nameRegex) ||
            regexTest(startEndTagRegex, TokenType.StartEndTag) ||
            regexTest(endTagRegex, TokenType.EndTag) ||
            regexTest(simpleEndTagRegex, TokenType.SimpleEndTag) ||
            regexTest(startTagRegex, TokenType.StartTag) ||
            regexTest(stringRegex, TokenType.String) ||
            regexTest(equalRegex, TokenType.Equal);
        if (!readed) {
            // TODO Create INVALID or add to last INVALID Token.
            tokens.push({ index: tokens.length, type: TokenType.Invalid, startIndex: pos, endIndex: ++pos });
        }
    }
    return tokens;
}
function getAllAttributeNames(content, tokens, tokenStart) {
    let names = [];
    let index = tokenStart;
    while (index < tokens.length) {
        let token = tokens[index];
        let prevToken = tokens[index - 1];
        if (prevToken.type == TokenType.Name && token.type == TokenType.Equal) {
            names.push(content.substring(prevToken.startIndex, prevToken.endIndex).toUpperCase());
        }
        else if (prevToken.type == TokenType.StartTag || prevToken.type == TokenType.EndTag || prevToken.type == TokenType.StartEndTag || prevToken.type == TokenType.SimpleEndTag) {
            break;
        }
        index++;
    }
    return names;
}
exports.getAllAttributeNames = getAllAttributeNames;
function getOwnerAttributeName(tokens, index) {
    while (index >= 1) {
        let token = tokens[index];
        let prevToken = tokens[index - 1];
        if (prevToken.type == TokenType.AttributeName || prevToken.type == TokenType.Name) {
            return prevToken;
        }
        else if (prevToken.type == TokenType.StartTag || prevToken.type == TokenType.EndTag || prevToken.type == TokenType.StartEndTag || prevToken.type == TokenType.SimpleEndTag) {
            break;
        }
        index--;
    }
    return null;
}
exports.getOwnerAttributeName = getOwnerAttributeName;
function getOwnerTagName(tokens, index) {
    while (index >= 1) {
        let token = tokens[index];
        let prevToken = tokens[index - 1];
        if (token.type == TokenType.SimpleEndTag) {
            return null;
        }
        else if (token.type == TokenType.TagName && prevToken.type == TokenType.StartTag) {
            return token;
        }
        else if (token.type == TokenType.TagName && prevToken.type == TokenType.StartEndTag) {
            return null;
        }
        index--;
    }
    return null;
}
exports.getOwnerTagName = getOwnerTagName;
function getParentTagName(tokens, index) {
    let depth = 0;
    while (index >= 1) {
        let token = tokens[index];
        let prevToken = tokens[index - 1];
        if (token.type == TokenType.SimpleEndTag) {
            // />
            depth++;
        }
        else if (token.type == TokenType.TagName && prevToken.type == TokenType.StartTag) {
            // <Tag
            depth--;
            if (depth < 0) {
                return token;
            }
        }
        else if (token.type == TokenType.TagName && prevToken.type == TokenType.StartEndTag) {
            // </
            depth++;
        }
        index--;
    }
    return null;
}
exports.getParentTagName = getParentTagName;
let tokenCaches = {};
function getCacheTokens(doc) {
    if (doc && (doc.uri in tokenCaches)) {
        if (tokenCaches[doc.uri].version == doc.version) {
            return tokenCaches[doc.uri].tokens;
        }
    }
    return null;
}
function buildActiveToken(connection, doc, content, activeOffset) {
    let nodeTrace = [];
    let tokens = getCacheTokens(doc) || getTokens(connection, content);
    if (doc) {
        tokenCaches[doc.uri] = { version: doc.version, tokens: tokens };
    }
    let index = 0;
    let activeEndToken = undefined;
    for (let index = 0; index < tokens.length; index++) {
        let token = tokens[index];
        if (token.endIndex == activeOffset) {
            activeEndToken = token;
        }
        if (token.endIndex > activeOffset && token.startIndex <= activeOffset) {
            return {
                all: tokens,
                index: index,
                activeEndToken,
                prevToken: index > 0 ? tokens[index - 1] : undefined,
                token: token
            };
        }
        // else if(token.endIndex == activeOffset) {
        //     return {
        //         all: tokens,
        //         index: index,
        //         prevToken: index > 0 ? tokens[index - 1] : undefined,
        //         token: token
        //     };
        // }
        else if (token.startIndex > activeOffset) {
            return {
                all: tokens,
                activeEndToken,
                index: -1,
                prevToken: index > 0 ? tokens[index - 1] : undefined,
            };
        }
        // else if(token.startIndex > activeOffset) {
        //     return {
        //         all: tokens,
        //         index: index - 1,
        //         prevToken: index > 2 ? tokens[index - 2] : undefined,
        //         token: index > 1 ? tokens[index - 1] : undefined,
        //     };
        // }
    }
    return {
        all: tokens,
        activeEndToken,
        index: -1
    };
}
exports.buildActiveToken = buildActiveToken;
//# sourceMappingURL=token.js.map