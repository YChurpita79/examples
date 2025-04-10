import { Quill } from "react-quill-new";
const Link = Quill.import("formats/link");

export default class Tokens extends Link {
  static create(value) {
    const node = super.create(value);
    const { properties, id, render, url } = value;
    node.setAttribute("id", id);
    node.setAttribute("href", url);
    return render(node, properties);
  }
}

Tokens.blotName = "tokens";
Tokens.tagName = "a";
