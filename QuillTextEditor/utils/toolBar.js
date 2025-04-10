/* eslint-disable max-len */
import {Quill} from "react-quill-new";
import QuillToggleFullscreenButton from "../modules/quillToggleFullscreenButton";
import QuillImageDropAndPaste from "../modules/quillDropAndPast";
import AttachmentsModule from "../modules/quillAttachments";
import TokensModule from "../modules/quillTokens";
import * as Emoji from "quill2-emoji";
import "quill2-emoji/dist/style.css";
import BlotFormatter2, {ImageSpec, IframeVideoSpec} from "@enzedonline/quill-blot-formatter2";
import {StyleAttributor, ClassAttributor} from "parchment";
import htmlEditButton from "../modules/quillEditHtmlButton/quillHtmlEditButton";
import VideoResponsive from "../blots/videoBlot";
import {
    imageUploadHandler,
    imageVideoDropAndPasteHandler,
    videoUploadHandler,
    fileUploadHandler,
} from "./utils";
import {QUILL_FONT_SIZE, QUILL_LENE_HEIGHT_LIST} from "../constants/constants";

const ColorClass = Quill.import("attributors/class/color");
const SizeStyle = Quill.import("attributors/style/size");
const Parchment = Quill.import("parchment");

SizeStyle.whitelist = QUILL_FONT_SIZE;

const Align = new StyleAttributor("align", "text-align", {
    whitelist: ["right", "center", "justify"], // Having no value implies left align
});

const config = {
    scope: Parchment.Scope.BLOCK,
    whitelist: QUILL_LENE_HEIGHT_LIST,
};

const lineHtStyle = new StyleAttributor("lineheight", "line-height", config);
const lineHtClass = new ClassAttributor("ql-line-height", "line-height", config);

Quill.register(VideoResponsive, true);
Quill.register(Align, true);
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);
Quill.register("modules/attachments", AttachmentsModule);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register("modules/emoji", Emoji);
Quill.register("modules/toggleFullscreen", QuillToggleFullscreenButton);
Quill.register("modules/blotFormatter2", BlotFormatter2);
Quill.register("modules/htmlEditButton", htmlEditButton);
Quill.register("modules/tokens", TokensModule);
Quill.register(lineHtClass, true);
Quill.register(lineHtStyle, true);

const ToolBar = ({
                     spinnerId,
                     toolBarId,
                     editorRef,
                     toolBarSettings = {modules: {tokens: {}}},
                 }) => {
    const {
        modules: {
            tokens: {isTokensEnabled, externalHandler},
        },
    } = toolBarSettings;

    const getCurrentFormat = (scope) => {
        return scope.quill.getFormat(scope.quill.selection.savedRange);
    };

    const getCurrentLineHeight = (scope) => {
        const currentValue = getCurrentFormat(scope)["line-height"] || "1.0";
        return parseFloat(currentValue);
    };

    const increaseLineHeight = (scope) => {
        const newLineHeight = (getCurrentLineHeight(scope) * 10 + 1) / 10;
        scope.quill.format("line-height", newLineHeight + "", "user");
    };

    return {
        "emoji-toolbar": true,
        htmlEditButton: {
            debug: true, // logging, default:false
            msg: "Edit the content in HTML format", //Custom message to display in the editor, default: Edit HTML here, when you click "OK" the quill editor's contents will be replaced
            okText: "Ok", // Text to display in the OK button, default: Ok,
            cancelText: "Cancel", // Text to display in the cancel button, default: Cancel
            buttonTitle: "Show HTML source", // Text to display as the tooltip for the toolbar button, default: Show HTML source
            syntax: false, // Show the HTML with syntax highlighting. Requires highlightjs on window.hljs (similar to Quill itself), default: false
            prependSelector: "div#myelement", // a string used to select where you want to insert the overlayContainer, default: null (appends to body),
            editorModules: {},
        },

        toolbar: {
            container: `#${toolBarId}`,
            handlers: {
                increaseLineHeight() {
                    increaseLineHeight(this);
                },

                image: (event) => imageUploadHandler({spinnerId, event, editorRef}),
                video: (event) => videoUploadHandler({spinnerId, event, editorRef}),
            },
        },

        //handler of DropAndPaste module
        imageDropAndPaste: {
            handler: (dataUrl, type, imageData) => {
                imageVideoDropAndPasteHandler({
                    spinnerId,
                    dataUrl,
                    type,
                    imageData,
                    editorRef,
                });
            },
        },
        clipboard: {
            matchVisual: false,
        },
        attachments: {
            render: (node, {file}) => {
                node.textContent = file.name;
                return node;
            },
            onFileUploaded: (node, {url}) => {
            },
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    resolve(fileUploadHandler({spinnerId, file, editorRef}));
                });
            },
        },
        tokens: {
            isTokensEnabled,
            handler: externalHandler,
        },
        blotFormatter2: {
            specs: [IframeVideoSpec, ImageSpec],
            overlay: {
                style: {
                    border: "1px solid red",
                },
            },
            resize: {
                allowResizing: true,
                allowResizeModeChange: true,
            },
            align: {
                allowAligning: false,
                alignments: ["left", "center", "right"],
            },

            delete: {
                allowKeyboardDelete: true,
            },
            image: {
                allowAltTitleEdit: false,
                allowCompressor: true,
            },
            video: {
                selector: "iframe.ql-video",
                registerCustomVideoBlot: false,
                registerBackspaceFix: true,
                defaultAspectRatio: "16/9 auto",
                proxyStyle: {},
            },
        },
        toggleFullscreen: {
            buttonTitle: "Toggle fullscreen",
        },
    };
};

export default ToolBar;
