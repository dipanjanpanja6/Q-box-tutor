import React, { useEffect } from 'react';
import { url } from '../config/config';

function Qapprove(props) {
  var file = [];
  console.log('yy');
  fetch(`${url}/api/course/${props}/getapprovequestion`, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => {
    res.json().then((d) => {
      if (d.error) {
        return file.push(d.message);
      }
      const { data } = d;
      for (var i = 0; i < data.length; i++) {
        var question = JSON.parse(data[i].question).blocks[0].text;
        file.push(question);
      }
      console.log(file, 'file approve');
    });
  });

  return file;
}

export default Qapprove;
