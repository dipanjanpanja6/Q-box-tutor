import { TEACHERLOGIN, TEACHERAUTH } from '../type';
import { url } from '../../config/config';
import { toast } from 'react-toastify';

export const login = (data) => (dispatch) => {
  fetch(`${url}/api/teacher/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json().then((d) => {
        console.log(d);
        if (d.success === true) {
          dispatch({
            type: TEACHERAUTH,
            payload: true,
          });
        }
        dispatch({
          type: TEACHERLOGIN,
          payload: d,
        });
      });
    })
    .catch((r) => {
      console.log(r);
      toast.error('Something went wrong ! Try again');
    });
};
export const checkTeacher = () => (dispatch) => {
  fetch(`${url}/api/teacher/checkUser`, {
    method: 'POST',
    credentials: 'include',
  }).then((res) => {
    res
      .json()
      .then((d) => {
        console.log(d);
        if (d.success === true) {
          dispatch({
            type: TEACHERAUTH,
            payload: true,
          });
        } else if (d.error === true) {
          console.log(d.message);
          d.message === 'app/network-error' &&
            toast.error('server offline ! please contact team');
          dispatch({
            type: TEACHERAUTH,
            payload: false,
          });
        }
      })
      .catch((r) => {
        console.log(r);
        // console.log('Something went wrong ! Try again')
      });
  });
};
export const logout = () => (dispatch) => {
  fetch(`${url}/api/teacher/logout`, {
    method: 'POST',
    credentials: 'include',
  }).then((res) => {
    res
      .json()
      .then((d) => {
        // console.log(d);
        if (d.success === true) {
          dispatch({
            type: TEACHERAUTH,
            payload: false,
          });
          window.location = '/';
        }
      })
      .catch((r) => console.log(r));
  });
};
