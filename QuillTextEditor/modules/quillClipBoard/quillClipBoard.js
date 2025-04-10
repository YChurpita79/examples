import {Quill} from "react-quill-new";

const Clipboard = Quill.import("modules/clipboard");

class QuillClipboard extends Clipboard {
    convert(html = null) {
        const delta = Quill.clipboard.convert(html);
        return Quill.setContents(delta, "silent");
    }
}

export default QuillClipboard;
