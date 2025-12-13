"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagBuilder = void 0;
/**
 * 提供生成标签的工具
 */
class TagBuilder {
    constructor() {
        // 还没有 end 的 tag
        this.openTags = [];
        this.output = [];
        this.indent = '  ';
    }
    closeAttributesIfNeed() {
        if (this.activeTag) {
            // 关闭上一个属性组
            this.output.push('>');
            this.activeTag = undefined;
            return true;
        }
        return false;
    }
    addIndent(level) {
        if (typeof level === 'undefined') {
            level = this.openTags.length - 1;
        }
        if (level > 0) {
            this.output.push(this.indent.repeat(level));
        }
    }
    getOpenTagName() {
        if (this.openTags.length) {
            return this.openTags[this.openTags.length - 1];
        }
        return null;
    }
    /**
     * 开始一个标签
     * @param name 标签名称
     */
    startTag(name, inline, simple) {
        let tag = {
            name,
            inline,
            simple
        };
        if (!name) {
            throw new Error('标签名称不能为空！');
        }
        this.closeAttributesIfNeed();
        this.activeTag = tag;
        let parentTag;
        this.openTags.push(tag);
        if (this.openTags.length > 1) {
            parentTag = this.openTags[this.openTags.length - 2];
            if (!tag.inline) {
                parentTag.contentBlock = true;
            }
            const needBr = parentTag.content && parentTag.contentBlock || !tag.inline;
            parentTag.content = true;
            if (needBr) {
                // console.log(tag.name, parentTag.content, parentTag.contentBlock, !tag.inline, inline, simple);
                tag.indentLevel = (parentTag.indentLevel || 0) + 1;
                this.output.push('\n');
            }
        }
        else {
            tag.indentLevel = 0;
            if (this.output.length) {
                this.output.push('\n');
            }
        }
        if (tag.indentLevel) {
            this.addIndent(tag.indentLevel);
        }
        this.output.push(`<${tag.name}`);
    }
    /**
     * 添加纯文本内容
     * @param text 文本内容
     */
    addText(text) {
        this.closeAttributesIfNeed();
        this.output.push(text);
    }
    /**
     * 向当前标签添加属性
     * @param name 属性名称
     * @param value 属性值
     */
    addAttribute(name, value) {
        if (this.activeTag) {
            this.output.push(` ${name}="${value}"`);
        }
        else {
            throw new Error('当前没有活动标签可添加属性！');
        }
    }
    /**
     * 结束当前标签
     */
    endTag() {
        if (this.openTags.length) {
            if (this.activeTag) {
                if (this.activeTag.simple) {
                    this.output.push(' />');
                    return;
                }
                else {
                    this.output.push('>');
                }
            }
            this.activeTag = undefined;
            let tag = this.openTags.pop();
            if (tag.contentBlock) {
                this.output.push('\n');
                this.addIndent(tag.indentLevel);
            }
            this.output.push(`</${tag.name}>`);
        }
        else {
            throw new Error('当前没有需要关闭的标签！');
        }
    }
    /**
     * 结束全部未关闭标签
     */
    end() {
        while (this.openTags.length) {
            this.endTag();
        }
    }
    toString() {
        if (this.openTags.length) {
            this.end();
        }
        return this.output.join('');
    }
}
exports.TagBuilder = TagBuilder;
//# sourceMappingURL=tag-builder.js.map