import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorJS = (props) => {

    const onEditorStateChange = (newData) => {
        props.onChange(newData);
        // console.log(newData)
    }
    // console.log(props.data);
    return (
        <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            placeholder={props.placeholder}
            onContentStateChange={onEditorStateChange}
            toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
        />

    )
}
export default EditorJS

function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
}

