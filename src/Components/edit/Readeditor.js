import React from 'react';
import { Editor } from "react-draft-wysiwyg";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const EditorJS = (props) => {
  return (
    <Editor

      readOnly
      toolbarHidden
      initialContentState={props.data}
    />
  )
}
export default EditorJS
