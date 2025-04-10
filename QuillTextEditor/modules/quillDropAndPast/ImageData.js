import utils from "./utils";

class QuillImageData {
  dataUrl;
  type;
  name;
  constructor(dataUrl, type, name) {
    this.dataUrl = dataUrl;
    this.type = type;
    this.name = name || "";
  }
}

class ImageData extends QuillImageData {
  dataUrl;
  type;
  name;
  constructor(dataUrl, type, name) {
    super(dataUrl, type, name);
    this.dataUrl = dataUrl;
    this.type = type;
    this.name = name || `${utils.generateFilename()}.${this.getSuffix()}`;
  }

  /* minify the image
   */
  minify(option) {
    return new Promise((resolve, reject) => {
      const maxWidth = option.maxWidth || 800;
      const maxHeight = option.maxHeight || 800;
      const quality = option.quality || 0.8;
      if (!this.dataUrl) {
        return reject({
          message:
            "[error] QuillImageDropAndPaste: Fail to minify the image, dataUrl should not be empty.",
        });
      }
      const image = new Image();
      image.onload = () => {
        const { width } = image;
        const { height } = image;
        if (width > height) {
          if (width > maxWidth) {
            image.height = (height * maxWidth) / width;
            image.width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            image.width = (width * maxHeight) / height;
            image.height = maxHeight;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(image, 0, 0, image.width, image.height);
          const canvasType = this.type || "image/png";
          const canvasDataUrl = canvas.toDataURL(canvasType, quality);
          resolve(new ImageData(canvasDataUrl, canvasType, this.name));
        } else {
          reject({
            message:
              "[error] QuillImageDropAndPaste: Fail to minify the image, create canvas context failure.",
          });
        }
      };
      image.src = utils.resolveDataUrl(this.dataUrl, this.type);
    });
  }

  /* convert blob to file
   */
  toFile(filename) {
    filename = filename || this.name;
    if (!window.File) {
      console.error("[error] QuillImageDropAndPaste: Your browser didnot support File API.");
      return null;
    }
    return new File([this.toBlob()], filename, { type: this.type });
  }

  /* convert dataURL to blob
   */
  toBlob() {
    const base64 = utils.resolveDataUrl(this.dataUrl, this.type).replace(/^[^,]+,/, "");
    const buff = utils.binaryStringToArrayBuffer(atob(base64));
    return this.createBlob([buff], { type: this.type });
  }

  /* create blob
   */
  createBlob(parts, properties) {
    if (!properties) properties = {};
    if (typeof properties === "string") properties = { type: properties };
    try {
      return new Blob(parts, properties);
    } catch (e) {
      if (e.name !== "TypeError") throw e;
      const Builder =
        "BlobBuilder" in window
          ? window.BlobBuilder
          : "MSBlobBuilder" in window
          ? window.MSBlobBuilder
          : "MozBlobBuilder" in window
          ? window.MozBlobBuilder
          : window.WebKitBlobBuilder;
      const builder = new Builder();
      for (let i = 0; i < parts.length; i++) builder.append(parts[i]);
      return builder.getBlob(properties.type);
    }
  }

  getSuffix() {
    const matched = this.type.match(/^image\/(\w+)$/);
    const suffix = matched ? matched[1] : "png";
    return suffix;
  }
}

export default ImageData;
