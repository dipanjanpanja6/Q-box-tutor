import { PANDDINGCOURSE } from '../type';
import { url } from '../../config/config';
import { toast } from 'react-toastify';

export const GetPanddingCourse = (sub) => (dispatch) => {
  fetch(`${url}/api/course/teacher/${sub}/rejectedquestion`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => {
      res.json().then((d) => {
        console.log(d);
        if (d.success === true) {
          dispatch({
            type: PANDDINGCOURSE,
            payload: d.data,
          });
        } else if (d.error === true) {
          console.log(d.message);
          toast.error(d.message)
          dispatch({
            type: PANDDINGCOURSE,
            payload: [],
          });
        }
      });
    })
    .catch((r) => {
      console.log(r);
      dispatch({
        type: PANDDINGCOURSE,
        payload: [],
      });
      toast.error('Something went wrong ! Try again');
    });
};

export const DeleteCourse = (sub,e) => (dispatch) => {
  fetch(`${url}/api/course/teacher/${sub}/rejectedquestion/${e}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => {
      res.json().then((d) => {
        if (d.success === true) {
          dispatch(GetPanddingCourse(sub))
          toast.success(d.message) 
        } else if (d.error === true) {
          console.log(d.message);
          toast.error(d.message)
        }
      });
    })
    .catch((r) => {
      console.log(r);
      toast.error('Something went wrong ! Try again');
    });
};
