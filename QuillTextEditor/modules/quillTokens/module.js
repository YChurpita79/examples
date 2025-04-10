import { Quill } from "react-quill-new";
import { icon } from "./icon";
const Module = Quill.import("core/module");

const create = (elName) => {
  return document.createElement(elName);
};

const setAttr = (el, key, value) => {
  return el.setAttribute(key, value);
};

export default class TokensModule extends Module {
  constructor(quill, options) {
    super();
    this.quill = quill;
    this.options = options;
    this.range = null;

    if (this.options.isTokensEnabled) {
      if (typeof this.options.handler !== "function") {
        console.warn("[Missing config] upload function that returns a promise is required");
      }

      if (typeof this.options.isTokensEnabled !== "boolean") {
        console.warn("[Missing config] render function that returns a doom node is required");
      }

      const toolbarModule = quill.getModule("toolbar");
      if (!toolbarModule) {
        throw new Error('quill.htmlEditButton requires the "toolbar" module to be included too');
      }

      const toolbarEl = toolbarModule.container;
      const button = create("button");
      setAttr(button, "class", "ql-snow ql-toolbar button quillToolBarButton");
      setAttr(button, "aria-label", "dynamic keywords");
      button.innerHTML = options.buttonHTML || icon;
      button.title = options.buttonTitle || "Tokens";
      button.type = "button";
      button.onclick = this.options.handler.bind(this);
      toolbarEl?.appendChild(button);
    }
  }
}
