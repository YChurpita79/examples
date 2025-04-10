import {Quill} from "react-quill-new";

const BlockEmbed = Quill.import("blots/block/embed");

class AudioBlot extends BlockEmbed {
    static create(url) {
        let node = super.create();
        node.setAttribute("src", url);
        node.setAttribute("controls", "");
        return node;
    }

    static value(node) {
        return node.getAttribute("src");
    }
}

AudioBlot.blotName = "audio";
AudioBlot.tagName = "audio";

export default AudioBlot;
