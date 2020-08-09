import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditorJS = (props) => {

    const onEditorStateChange = (newData) => {
        props.onChange(newData);
        console.log(newData)
    }

    return (
        <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            placeholder={props.placeholder}
            onContentStateChange={onEditorStateChange}
        />
    )
}
export default EditorJS
