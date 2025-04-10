import utils from "./utils";
import Quill from "quill";
import ImageData from "./ImageData";

class QuillImageDropAndPaste {
  ImageData;
  quill;
  option;

  constructor(quill, option) {
    this.quill = quill;
    this.option = option;
  }
}

class ImageDropAndPaste extends QuillImageDropAndPaste {
  ImageData = ImageData;
  quill = Quill;
  option;

  constructor(quill = Quill, option) {
    super(quill, option);
    if (typeof option.autoConvert !== "boolean") option.autoConvert = true;
    if (option.enableNativeUploader !== true) {
      // @ts-ignore
      utils.isObject(quill.uploader) &&
        // @ts-ignore
        utils.isObject(quill.uploader?.options) &&
        // @ts-ignore
        (quill.uploader.options.handler = () => {});
    }
    this.quill = quill;
    this.option = option;
    this.handleDrop = this.handleDrop.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.insert = this.insert.bind(this);
    this.quill.root.addEventListener("drop", this.handleDrop, false);
    this.quill.root.addEventListener("paste", this.handlePaste, false);
  }

  /* handle image drop event
   */
  handleDrop(e) {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
      e.preventDefault();
      if (document.caretRangeFromPoint) {
        const selection = document.getSelection();
        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
        if (selection && range) {
          selection.setBaseAndExtent(
            range.startContainer,
            range.startOffset,
            range.startContainer,
            range.startOffset,
          );
        }
      }
      this.readFiles(
        e.dataTransfer.files,
        (dataUrl, type = "image/png", name) => {
          if (typeof this.option.handler === "function") {
            this.option.handler.call(this, dataUrl, type, new ImageData(dataUrl, type, name));
          } else {
            this.insert.call(this, utils.resolveDataUrl(dataUrl, type), type);
          }
        },
        e,
      );
    }
  }

  /* handle image paste event
   */
  handlePaste(e) {
    if (e.clipboardData && e.clipboardData.items && e.clipboardData.items.length) {
      if (utils.isRichText(e.clipboardData.items)) return;
      this.readFiles(
        e.clipboardData.items,
        (dataUrl, type = "image/png") => {
          if (typeof this.option.handler === "function") {
            this.option.handler.call(this, dataUrl, type, new ImageData(dataUrl, type));
          } else {
            this.insert(utils.resolveDataUrl(dataUrl, type), "image");
          }
        },
        e,
      );
    }
  }

  /* read the files
   */
  readFiles(files, callback = (dataUrl, type, name) => {}, e) {
    Array.prototype.forEach.call(files, (file) => {
      if (utils.isType(file, "DataTransferItem")) {
        this.handleDataTransfer(file, callback, e);
      } else if (file instanceof File) {
        this.handleDroppedFile(file, callback, e);
      }
    });
  }

  /* handle the pasted data
   */
  handleDataTransfer(file, callback = (dataUrl, type, name) => {}, e) {
    const that = this;
    const { type } = file;
    if (type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i)) {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          callback(e.target.result, type);
        }
      };
      const blob = file.getAsFile ? file.getAsFile() : file;
      if (blob instanceof Blob) reader.readAsDataURL(blob);
    } else if (type.match(/^text\/plain$/i)) {
      file.getAsString((s) => {
        // Don't preventDefault here, because there might be clipboard matchers need to be triggered
        // see https://github.com/chenjuneking/quill-image-drop-and-paste/issues/37
        if (utils.urlIsImageDataUrl(s)) {
          // If the url is a dataUrl, just fire the callback
          const matched = s.match(/^data:(image\/\w+);base64,/);
          const t = matched ? matched[1] : "image/png";
          const i = this.getIndex();
          callback(s, t);
          this.quill.deleteText(i, s.length, "user");
          this.quill.setSelection(i);
        } else {
          if (this.option.autoConvert) {
            utils
              .urlIsImage(s)
              .then(() => {
                // If the url isn't a dataUrl, delete the pasted text and insert the image
                setTimeout(() => {
                  const i = this.getIndex();
                  this.quill.deleteText(i - s.length, s.length, "user");
                  that.insert(s, "image", i - s.length);
                });
              })
              .catch(() => {
                // Otherwise, do nothing
              });
          }
        }
      });
    }
  }

  /* handle the dropped data
   */
  handleDroppedFile(file, callback = (dataUrl, type, name) => {}, e) {
    const { type, name = "" } = file;
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        callback(e.target.result, type, name);
      }
    };
    reader.readAsDataURL(file);
  }

  /* insert into the editor
   */
  insert(content, type, index) {
    index = index === undefined ? this.getIndex() : index;
    let _index;
    if (type.startsWith("image")) {
      _index = index + 1;
      this.quill.insertEmbed(index, "image", content, "user");
    } else if (type.startsWith("text")) {
      _index = index + content.length;
      this.quill.insertText(index, content, "user");
    }
    setTimeout(() => {
      this.quill.setSelection(_index);
    });
  }

  getIndex() {
    let { index } = this.quill.getSelection(true) || {};
    if (index === undefined || index < 0) index = this.quill.getLength();
    return index;
  }
}
window.QuillImageDropAndPaste = ImageDropAndPaste;
if ("Quill" in window) {
  window.Quill.register("modules/imageDropAndPaste", ImageDropAndPaste);
}

export default ImageDropAndPaste;
