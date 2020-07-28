import React, { useState } from 'react';
import {Editor} from "react-draft-wysiwyg"; 


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditorJS = (props) => {
    const [model, setModel] = useState();

    const onEditorStateChange = (newData) =>{
       props.onChange(newData);
        // setModel(newData)
        console.log(newData)
    }

    return(
        <Editor
            // editorState={model}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            placeholder={props.placeholder}
            // onEditorStateChange={onEditorStateChange}
            onContentStateChange={onEditorStateChange}
        />
    )
}
export default EditorJS
