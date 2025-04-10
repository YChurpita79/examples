import {Quill} from "react-quill-new";

const Link = Quill.import("formats/link");

export default class Attachment extends Link {
    static create(value) {
        const node = super.create(value);
        const {properties, id, render, url} = value;
        node.setAttribute("id", id);
        node.setAttribute("href", url);
        return render(node, properties);
    }
}

Attachment.blotName = "attachment";
Attachment.tagName = "a";
