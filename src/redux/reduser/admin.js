import { TEACHERLOGIN, TEACHERAUTH, PANDDINGCOURSE } from '../type';

const initialState = {
  teacherLogin: {},
  auth: null,
  teacherAuth: null,
  panddingcourse: null,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case TEACHERAUTH:
      return {
        ...state,
        teacherAuth: actions.payload,
      };
    case TEACHERLOGIN:
      return {
        ...state,
        teacherLogin: actions.payload,
      };
    case PANDDINGCOURSE: {
      return {
        ...state,
        panddingcourse: actions.payload,
      };
    }
    default:
      return state;
  }
}
