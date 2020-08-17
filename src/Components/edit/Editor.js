import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { connect } from 'react-redux';
// import { allimage } from '../../redux/actions/course';



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
                console.log(response.data.link, 'response')
                // allimage(response)
                //collect img url from here ////
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
}
// const maptoprop = {
//     allimage
// }
// connect(maptoprop)(uploadImageCallBack)

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
                // inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                // link: { inDropdown: true },
                // history: { inDropdown: true },
                image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false }, defaultSize: { height: 150, width: 'auto' } },
            }}
        />

    )
}
export default EditorJS


