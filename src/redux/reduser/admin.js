import { TEACHERLOGIN, TEACHERAUTH, REJECTQBook, REJECTQBank, REJECTMonthlyTest, REJECTWeeklyTest, IMAGEURL } from '../type';

const initialState = {
  teacherLogin: {},
  auth: null,
  teacherAuth: null,
  rejectQBook: null,
  rejectQBank: null,
  rejectWeekly: null,
  rejectMonthly: null,
  imageUrl: {}
};
console.log(initialState.imageUrl, 'admin')

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
    case REJECTQBook: {
      return {
        ...state,
        rejectQBook: actions.payload,
      };
    }
    case REJECTQBank: {
      return {
        ...state,
        rejectQBank: actions.payload,
      };
    }
    case REJECTMonthlyTest: {
      return {
        ...state,
        rejectMonthly: actions.payload,
      };
    }
    case REJECTWeeklyTest: {
      return {
        ...state,
        rejectWeekly: actions.payload,
      };
    }
    case IMAGEURL: {
      return {
        ...state,
        imageUrl: actions.payload
      }
    }
    default:
      return state;
  }
}
