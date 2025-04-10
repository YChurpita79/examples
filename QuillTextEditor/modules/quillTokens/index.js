import { Quill } from "react-quill-new";
import Tokens from "./formats/tokens";
import Module from "./module";

Quill.register({
  "formats/tokens": Tokens,
});

export default Module;
