import React, { useState } from 'react';
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {convertToRaw, EditorState} from "draft-js";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditorJS = (props) => {
    const [model, setModel] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newData) =>{
       props.onChange(newData);
        setModel(newData)
    }

    return(
        <Editor
            editorState={model}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            placeholder={props.placeholder}
            onEditorStateChange={onEditorStateChange}
        />
    )
}
export default EditorJS
