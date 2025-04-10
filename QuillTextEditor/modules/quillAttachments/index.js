import { Quill } from "react-quill-new";
import Attachment from "./formats/attachments";
import Module from "./module";

Quill.register({
  "formats/attachment": Attachment,
});

export default Module;
