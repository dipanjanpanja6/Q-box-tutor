import { url } from '../../config/config';
import { toast } from 'react-toastify';
import { IMAGEURL } from '../type';

export const GetRejectCourse = (sub) => (dispatch) => {
  fetch(`${url}/api/course/teacher/${sub}/rejectedquestion`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => {
      res.json().then((d) => {
        if (d.success === true) {
          dispatch({
            type: `REJECT${sub}`,
            payload: d.data,
          });
        } else if (d.error === true) {
          dispatch({
            type: `REJECT${sub}`,
            payload: [],
          });
        }
      });
    })
    .catch((r) => {
      console.log(r, 'getRejectCourse');
      dispatch({
        type: `REJECT${sub}`,
        payload: [],
      });
      toast.error('Something went wrong ! Try again');
    });
};

export const DeleteCourse = (sub, e) => (dispatch) => {
  fetch(`${url}/api/course/teacher/${sub}/rejectedquestion/${e}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => {
      res.json().then((d) => {
        if (d.success === true) {
          dispatch(GetRejectCourse(sub))
          toast.success(d.message)
        } else if (d.error === true) {
          // console.log(d.message);
          toast.error(d.message)
        }
      });
    })
    .catch((r) => {
      console.log(r, 'deltecourse');
      toast.error('Something went wrong ! Try again');
    });
};

export const allimage = (response) => (dispatch) => {
  console.log("allimage")
  dispatch({
    type: IMAGEURL,
    payload: response.data.link
  })
}