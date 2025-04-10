import { QuillHtmlLogger } from "./logger";
import "./styles.css";
import { Quill } from "react-quill-new";

import { OutputHTMLParser } from "./parser";
import { FormatHTMLStringIndentation } from "./formatter";
import { icon } from "./icon";

function $create(elName) {
  return document.createElement(elName);
}

function $setAttr(el, key, value) {
  return el.setAttribute(key, value);
}

const Logger = new QuillHtmlLogger();

class htmlEditButton {
  constructor(quill = Quill, optionsInput) {
    const options = optionsInput;
    const debug = !!(options && options.debug);
    Logger.setDebug(debug);
    Logger.log("logging enabled");
    // Add button to all quill toolbar instances
    const toolbarModule = quill.getModule("toolbar");
    if (!toolbarModule) {
      throw new Error('quill.htmlEditButton requires the "toolbar" module to be included too');
    }
    // this.registerDivModule();
    let toolbarEl = toolbarModule.container;
    const button = $create("button");
    button.innerHTML = options.buttonHTML || icon;
    button.title = options.buttonTitle || "Show HTML source";
    button.type = "button";

    $setAttr(button, "class", "ql-fullscreen ql-snow ql-toolbar button quillToolBarButton");
    $setAttr(button, "aria-label", "code editor");

    const onSave = (html) => {
      quill.clipboard.dangerouslyPasteHTML(html);
    };
    button.onclick = function (e) {
      e.preventDefault();
      launchPopupEditor(quill, options, onSave);
    };
    toolbarEl?.appendChild(button);
  }
}

function launchPopupEditor(quill = Quill, options, saveCallback) {
  const htmlFromEditor = quill.container.querySelector(".ql-editor").innerHTML;
  const popupContainer = $create("div");
  const overlayContainer = $create("div");
  const msg =
    options.msg ||
    'Edit HTML here, when you click "OK" the quill editor\'s contents will be replaced';
  const cancelText = options.cancelText || "Cancel";
  const okText = options.okText || "Ok";
  const closeOnClickOverlay = options.closeOnClickOverlay !== false;

  $setAttr(overlayContainer, "class", "ql-html-overlayContainer");
  $setAttr(popupContainer, "class", "ql-html-popupContainer");
  const popupTitle = $create("span");
  $setAttr(popupTitle, "class", "ql-html-popupTitle");
  popupTitle.innerText = msg;
  const textContainer = $create("div");
  textContainer.appendChild(popupTitle);
  $setAttr(textContainer, "class", "ql-html-textContainer");
  const codeBlock = $create("pre");
  $setAttr(codeBlock, "data-language", "xml");
  codeBlock.innerText = FormatHTMLStringIndentation(htmlFromEditor, Logger);
  const htmlEditor = $create("div");
  $setAttr(htmlEditor, "class", "ql-html-textArea");
  const buttonCancel = $create("button");
  buttonCancel.innerHTML = cancelText;
  $setAttr(buttonCancel, "class", "ql-html-buttonCancel");
  const buttonOk = $create("button");
  buttonOk.innerHTML = okText;
  $setAttr(buttonOk, "class", "ql-html-buttonOk");
  const buttonGroup = $create("div");
  $setAttr(buttonGroup, "class", "ql-html-buttonGroup");
  const prependSelector = document.querySelector(options.prependSelector);

  buttonGroup.appendChild(buttonCancel);
  buttonGroup.appendChild(buttonOk);
  htmlEditor.appendChild(codeBlock);
  textContainer.appendChild(htmlEditor);
  textContainer.appendChild(buttonGroup);
  popupContainer.appendChild(textContainer);
  overlayContainer.appendChild(popupContainer);

  if (prependSelector) {
    prependSelector.prepend(overlayContainer);
  } else {
    document.body.appendChild(overlayContainer);
  }

  const modules = options && options.editorModules;
  const hasModules = !!modules && !!Object.keys(modules).length;
  const modulesSafe = hasModules ? modules : {};

  const editor = new Quill(htmlEditor, {
    modules: {
      syntax: options.syntax,
      ...modulesSafe,
    },
  });

  buttonCancel.onclick = function () {
    if (prependSelector) {
      prependSelector.removeChild(overlayContainer);
    } else {
      document.body.removeChild(overlayContainer);
    }
  };

  if (closeOnClickOverlay) {
    overlayContainer.onclick = buttonCancel.onclick;
  }

  popupContainer.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };
  buttonOk.onclick = function () {
    const { container } = editor;
    const qlElement = container.querySelector(".ql-editor");
    const htmlInputFromPopup = qlElement.innerText;
    const htmlOutputFormatted = OutputHTMLParser(htmlInputFromPopup);
    Logger.log("OutputHTMLParser", { htmlInputFromPopup, htmlOutputFormatted });
    saveCallback(htmlOutputFormatted);
    if (prependSelector) {
      prependSelector.removeChild(overlayContainer);
    } else {
      document.body.removeChild(overlayContainer);
    }
  };
}

window["htmlEditButton"] = htmlEditButton;
export default htmlEditButton;
export { htmlEditButton };
