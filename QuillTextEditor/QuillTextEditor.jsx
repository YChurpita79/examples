import React, {useState, useEffect, useMemo, useRef} from "react";
import ReactQuill from "react-quill-new";
import cn from "classnames";

import "react-quill-new/dist/quill.snow.css";
import styles from "./QuillTextEditor.module.less";

import ToolBar from "./utils/toolBar";
import InputError from "view/components/DataDisplay/InputError/InputError";
import ToolBarMenu from "./components/ToolBarMenu/ToolBarMenu";

const QuillTextEditor = ({
                             setEditorRef = () => {
                             },
                             onChange = () => {
                             },
                             wrapperClassName,
                             heightMin,
                             heightMax,
                             error = null,
                             toolBarSettings = {modules: {tokens: {}}},
                         }) => {
    const [quillValue, setQuillValue] = useState();
    const editorRef = useRef(null);
    const timestamp = Date.now();
    const toolBarId = useMemo(() => `toolbar-${timestamp}`, []);
    const spinnerId = useMemo(() => `quill-upload-spinner-${timestamp}`, []);
    const modules = useMemo(
        () => ToolBar({spinnerId, toolBarId, editorRef, toolBarSettings}),
        [editorRef, toolBarId],
    );
    const errorMessage = error?.message;

    useEffect(() => {
        if (editorRef?.current) {
            const {editor} = editorRef?.current;
            setEditorRef(editor);
            onChange(editor);
        }
    }, [editorRef]);

    useEffect(() => {
        if (editorRef?.current) {
            const {editor} = editorRef?.current;
            onChange(editor);
        }
    }, [quillValue]);

    return (
        <div
            id="quill-text-editor"
            className={cn(styles.groupWrapper, {[styles.withError]: errorMessage}, wrapperClassName)}
        >
            <ToolBarMenu toolBarId={toolBarId}/>
            <ReactQuill
                style={{maxHeight: heightMax, minHeight: heightMin}}
                ref={editorRef}
                className={styles.reactQuill}
                modules={modules}
                theme="snow"
                value={quillValue}
                onChange={setQuillValue}
            />
            <div className={styles.spinnerWrapper} id={spinnerId}>
                <div className={styles.spinner}/>
            </div>
            <InputError
                className={styles.inputErrorIcon}
                isOpen={errorMessage}
                errorMessage={errorMessage}
            />
        </div>
    );
};

export default QuillTextEditor;
