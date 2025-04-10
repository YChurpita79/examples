/*eslint-disable no-undef*/
import axios from "axios";
import {
  CLOUDINARY_FILES_FOLDER_SUB_URL,
  CLOUDINARY_IMAGES_FOLDER_SUB_URL,
  CLOUDINARY_UPLOAD_PRESET_KEY,
  CLOUDINARY_VIDEOS_FOLDER_SUB_URL,
  CLOUDINARY_UPLOAD_ENDPOINT,
} from "constants/cloudinaryConstants";
import { CLOUDINARY_CLAUD_NAME, CLOUDINARY_UPLOAD_PRESET_VALUE } from "services/config.service";
import { ID_PREFIX } from "../constants/constants";

const generateId = () => {
  const id = new Date().getTime();
  return `${ID_PREFIX}_${id}`;
};

const handleSpinner = (isLoading, spinnerId) => {
  const element = document.getElementById(spinnerId);
  element.style.display = isLoading ? "block" : "none";
};

export const getFileUploadUrlToCloudinary = (type) => {
  const cloudinaryUrl = `${CLOUDINARY_UPLOAD_ENDPOINT}${CLOUDINARY_CLAUD_NAME}`;
  switch (type) {
    case "raw":
      return `${cloudinaryUrl}${CLOUDINARY_FILES_FOLDER_SUB_URL}`;
    case "image":
      return `${cloudinaryUrl}${CLOUDINARY_IMAGES_FOLDER_SUB_URL}`;
    case "video":
      return `${cloudinaryUrl}${CLOUDINARY_VIDEOS_FOLDER_SUB_URL}`;
  }
};

const uploadToCloudinary = async (file, type, spinnerId) => {
  try {
    handleSpinner(true, spinnerId);
    const formData = new FormData();
    const uploadType = type === "file" ? "raw" : type;
    const fileUrl = getFileUploadUrlToCloudinary(uploadType);
    formData.append("file", file);
    formData.append(`${CLOUDINARY_UPLOAD_PRESET_KEY}`, `${CLOUDINARY_UPLOAD_PRESET_VALUE}`);
    const result = await axios.post(fileUrl, formData);
    handleSpinner(false, spinnerId);
    return result.data.secure_url;
  } catch (e) {
    console.error(e.message);
  }
};

const putUrlInToEditor = ({ type, url, editorRef }) => {
  const quill = editorRef.current;
  if (quill) {
    const range = quill.getEditorSelection();
    const index = range === null ? 0 : range.index;
    range && quill.getEditor().insertEmbed(index, type, url);
  }
};

const imageVideoDropAndPasteHandler = async ({
  spinnerId,
  dataUrl,
  type,
  imageData,
  editorRef,
}) => {
  const file = imageData.toFile();
  if (type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i)) {
    const url = await uploadToCloudinary(file, "image", spinnerId);
    putUrlInToEditor({ type: "image", url, editorRef });
    return;
  }
  if (type.match(/^video\/(webm|ogg|quicktime|mp4|mov)/i)) {
    const url = await uploadToCloudinary(file, "video", spinnerId);
    putUrlInToEditor({ type: "video", url, editorRef });
    return;
  }

  const url = await fileUploadHandler({ file });
  const quill = editorRef.current;
  const id = generateId();

  if (quill) {
    const range = quill.getEditorSelection();
    range &&
      quill.getEditor().insertEmbed(
        range.index,
        "attachment",
        {
          id,
          url,
          properties: { dataUrl, file },
          render: (node) => {
            node.textContent = file.name;
            return node;
          },
        },
        "user",
      );
  }
};

const imageUploadHandler = async ({ spinnerId, event, editorRef }) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*,.png,.jpg");
  input.click();
  input.onchange = async () => {
    if (input !== null && input.files !== null) {
      const url = await uploadToCloudinary(input.files[0], "image", spinnerId);
      putUrlInToEditor({ type: "image", url, editorRef });
    }
  };
};

const videoUploadHandler = async ({ spinnerId, event, editorRef }) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "video/*,.webm,.ogg,.quicktime,.mp4,.mov");
  input.click();
  input.onchange = async () => {
    if (input !== null && input.files !== null) {
      const url = await uploadToCloudinary(input.files[0], "video", spinnerId);
      putUrlInToEditor({ type: "video", url, editorRef });
    }
  };
};

const fileUploadHandler = async ({ file, spinnerId }) => {
  return await uploadToCloudinary(file, "file", spinnerId);
};

export { videoUploadHandler, imageVideoDropAndPasteHandler, imageUploadHandler, fileUploadHandler };
