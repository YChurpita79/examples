export function OutputHTMLParser(inputHtmlFromQuillPopup) {
    return Compose(
        [
            ConvertMultipleSpacesToSingle,
            FixTagSpaceOpenTag,
            FixTagSpaceCloseTag,
            PreserveNewlinesBr,
            PreserveNewlinesPTags,
        ],
        inputHtmlFromQuillPopup,
    );
}

export function ConvertMultipleSpacesToSingle(input) {
    return input.replace(/\s+/g, " ").trim();
}

export function PreserveNewlinesBr(input) {
    return input.replace(/<br([\s]*[\/]?>)/g, "<p> </p>");
}

export function PreserveNewlinesPTags(input) {
    return input.replace(/<p><\/p>/g, "<p> </p>");
}

export function FixTagSpaceOpenTag(input) {
    // Open tag remove space on inside
    return input.replace(/(<(?!\/)[\w=\."'\s]*>) /g, "$1");
}

export function FixTagSpaceCloseTag(input) {
    // Close tag remove space on inside
    return input.replace(/ (<\/[\w]+>)/g, "$1");
}

export function Compose(functions, input) {
    return functions.reduce((acc, cur) => cur(acc), input);
}
