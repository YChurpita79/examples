import {Quill} from "react-quill-new";

const VideoEmbed = Quill.import("formats/video");

class VideoResponsive extends VideoEmbed {
    static aspectRatio = "16 / 9 auto";

    static create(url) {
        const node = super.create();
        const wrapper = document.createElement("p");
        node.setAttribute("src", url);
        node.setAttribute("width", "100%");
        node.style.display = "inline-block";
        node.style.aspectRatio = this.aspectRatio;
        // Set non-format related attributes with static values
        node.setAttribute("frameborder", "0");
        node.setAttribute("allowfullscreen", true);
        wrapper.append(node);
        return wrapper;
    }

    static value(node) {
        return node.getAttribute("src");
    }

    html() {
        return this.domNode.outerHTML;
    }
}

export default VideoResponsive;
