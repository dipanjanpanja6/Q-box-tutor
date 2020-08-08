import { PANDDINGCOURSE } from '../type';
import { url } from '../../config/config';
import { toast } from 'react-toastify';

export const GetPanddingCourse = () => (dispatch) => {
  fetch(`${url}/api/course/teacher/QBook/rejectedquestion`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => {
      res.json().then((d) => {
        // console.log(d);
        if (d.success === true) {
          dispatch({
            type: PANDDINGCOURSE,
            payload: d.data,
          });
        } else if (d.error === true) {
          // console.log(d.message);
          dispatch({
            type: PANDDINGCOURSE,
            payload: false,
          });
        }
      });
    })
    .catch((r) => {
      console.log(r);
      toast.error('Something went wrong ! Try again');
    });
};

export const DeletePanddingCourse = (e) => (dispatch) => {
  fetch(`${url}/api/course/teacher/QBook/rejectedquestion/${e}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => {
      res.json().then((d) => {
        if (d.success === true) {
          dispatch({
            type: PANDDINGCOURSE,
            payload: true,
          });
          toast.error(d.message);
        } else if (d.error === true) {
          dispatch({
            type: PANDDINGCOURSE,
            payload: false,
          });
        }
      });
    })
    .catch((r) => {
      console.log(r);
      toast.error('Something went wrong ! Try again');
    });
};
