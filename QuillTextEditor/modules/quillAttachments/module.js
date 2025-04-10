import {Quill} from "react-quill-new";
import constant from "./constants";
import {icon} from "./icon";

const Module = Quill.import("core/module");

const generateId = () => {
    const name = constant.ID_PREFIX;
    const id = new Date().getTime();
    return `${name}_${id}`;
};

const create = (elName) => {
    return document.createElement(elName);
};

const setAttr = (el, key, value) => {
    return el.setAttribute(key, value);
};

export default class AttachmentModule extends Module {
    constructor(quill, options) {
        super();
        this.quill = quill;
        this.options = options;

        if (typeof this.options.upload !== "function") {
            console.warn("[Missing config] upload function that returns a promise is required");
        }

        if (typeof this.options.render !== "function") {
            console.warn("[Missing config] render function that returns a doom node is required");
        }

        const toolbarModule = quill.getModule("toolbar");
        if (!toolbarModule) {
            throw new Error('quill.htmlEditButton requires the "toolbar" module to be included too');
        }
        const toolbarEl = toolbarModule.container;
        const button = create("button");
        setAttr(button, "class", "ql-snow ql-toolbar button quillToolBarButton");
        setAttr(button, "aria-label", "upload file");

        button.innerHTML = options.buttonHTML || icon;
        button.title = options.buttonTitle || "Attachment";
        button.type = "button";
        button.onclick = this.selectLocalImage.bind(this);
        toolbarEl?.appendChild(button);
    }

    selectLocalImage() {
        this.fileHolder = document.createElement("input");
        this.fileHolder.setAttribute("type", "file");
        this.fileHolder.setAttribute("accept", "*/*");
        this.fileHolder.onchange = this.fileChanged.bind(this);
        this.fileHolder.click();
    }

    fileChanged() {
        const [holderFile] = this.fileHolder.files;
        const attachmentId = generateId();
        const fileReader = new FileReader();

        fileReader.addEventListener(
            "load",
            () => {
                let base64content = fileReader.result;
                this.insertAttachment({dataUrl: base64content, file: holderFile, id: attachmentId});
            },
            false,
        );

        if (holderFile) {
            fileReader.readAsDataURL(holderFile);
        }

        this.options
            .upload(holderFile)
            .then((url) => {
                this.updateAttachment(attachmentId, url);
            })
            .catch((error) => {
                console.warn(error.message);
            });
    }

    insertAttachment({dataUrl, file, id, url}) {
        this.quill.insertEmbed(
            this.quill.getSelection(),
            "attachment",
            {
                id,
                url,
                properties: {dataUrl, file},
                render: this.options.render,
            },
            "user",
        );
    }

    updateAttachment(id, url) {
        const element = document.getElementById(id);
        if (element) {
            element.setAttribute("href", url);
            element.removeAttribute("id");
            if (typeof this.options.onFileUploaded === "function") {
                this.options.onFileUploaded(element, {url});
            }
        }
    }
}
