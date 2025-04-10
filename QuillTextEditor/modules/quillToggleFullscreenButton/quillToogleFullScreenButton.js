import { Quill } from "react-quill-new";
import { icon, closeIcon } from "./icon.json";

const setAttr = (el, key, value) => {
  return el.setAttribute(key, value);
};

export default class QuillToggleFullscreenButton {
  static DEFAULTS = {
    buttonHTML: icon,
    closeButtonHtml: closeIcon,
    buttonTitle: "",
  };

  #quill = Quill;
  options;
  #button = document.createElement("button");
  #toolbarEl;

  constructor(quill, options) {
    this.#quill = quill;
    this.options = this.#setDefaults(options);

    // Add toggle fullscreen button to all quill toolbar instances
    const toolbarModule = quill.getModule("toolbar");

    if (!toolbarModule) {
      throw new Error(
        'quill.toggleFullscreenButton requires the "toolbar" module to be included too',
      );
    }

    this.#toolbarEl = toolbarModule.container;

    const buttonContainer = document.createElement("span");
    buttonContainer.classList.add("ql-formats");

    this.#button.type = "button";
    setAttr(this.#button, "class", "ql-fullscreen ql-snow ql-toolbar button quillToolBarButton");
    setAttr(this.#button, "aria-label", "fullscreen");
    this.#button.onclick = this.#toggleFullscreen.bind(this);

    if (this.options.buttonHTML) {
      this.#button.innerHTML = this.options.buttonHTML;
    }

    if (this.options.buttonTitle) {
      this.#button.title = this.options.buttonTitle;
    }

    buttonContainer.append(this.#button);
    this.#toolbarEl.append(buttonContainer);
  }

  #handleChangeIcon(status) {
    this.#button.innerHTML = status ? this.options.closeButtonHtml : this.options.buttonHTML;
  }

  #setDefaults(options) {
    options = Object.assign({}, options);
    options.buttonHTML ||= QuillToggleFullscreenButton.DEFAULTS.buttonHTML;
    options.buttonTitle ||= QuillToggleFullscreenButton.DEFAULTS.buttonTitle;
    options.closeButtonHtml ||= QuillToggleFullscreenButton.DEFAULTS.closeButtonHtml;

    return options;
  }

  #toggleFullscreen(e) {
    e.preventDefault();

    const editorContainer = this.#quill.root?.closest(".ql-container");

    if (!editorContainer) {
      throw new Error("Quill editor container not exist");
    }
    const messageContainer = document.getElementById("messageList-container");
    let editorWrapEl = editorContainer.parentElement;

    // if IN fullscreen mode
    if (editorWrapEl && editorWrapEl.classList.contains("ql-editor-wrap")) {
      if (editorContainer instanceof HTMLElement) {
        editorContainer.classList.remove("is-fullscreen");
        editorContainer.style.height = "";
      }

      this.#handleChangeIcon(false);

      // moves editor elements outside the wrapper and remove it
      editorWrapEl.after(...Array.from(editorWrapEl.childNodes));
      editorWrapEl.remove();
      messageContainer.style.zIndex = "180";

      if (e.currentTarget instanceof Element) {
        e.currentTarget.classList.remove("ql-active");
      }

      // restoring page scroll bars, when in normal mode
      document.documentElement.style.removeProperty("overflow");

      return;
    }

    // if NOT IN fullscreen mode
    this.#handleChangeIcon(true);
    editorWrapEl = document.createElement("div");
    editorWrapEl.classList.add("ql-editor-wrap");
    editorWrapEl.style.position = "fixed";
    editorWrapEl.style.inset = "0";
    editorWrapEl.style.width = "100%";
    editorWrapEl.style.height = "100%";
    editorWrapEl.style.backgroundColor = "white";
    editorWrapEl.style.zIndex = "9999";
    messageContainer.style.zIndex = "400";

    if (editorContainer instanceof HTMLElement) {
      const toolbarHeight = this.#toolbarEl.offsetHeight;
      editorContainer.style.height = `calc(100% - ${toolbarHeight}px)`;
      editorContainer.classList.add("is-fullscreen");
    }

    // moves editor elements inside the wrapper
    editorContainer.after(editorWrapEl);
    editorWrapEl.append(this.#toolbarEl);
    editorWrapEl.append(editorContainer);

    if (e.currentTarget instanceof Element) {
      e.currentTarget.classList.add("ql-active");
    }

    // hiding page scroll bars, when in fullscreen mode
    document.documentElement.style.overflow = "hidden";
  }
}

window["QuillToggleFullscreenButton"] = QuillToggleFullscreenButton;
