export class QuillHtmlLogger {
  debug = false;
  setDebug(debug) {
    this.debug = debug;
  }
  prefixString() {
    return `</> quill-html-edit-button: `;
  }
  get log() {
    if (!this.debug) {
      return (...args) => {};
    }
    const boundLogFn = console.log.bind(console, this.prefixString());
    return boundLogFn;
  }
}
