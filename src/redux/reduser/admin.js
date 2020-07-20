import {TEACHERLOGIN, TEACHERAUTH} from '../type'

const initialState = { 
    teacherLogin:{},
    auth:null,
    teacherAuth:null, 


}

export default function (state = initialState, actions) {
    switch (actions.type) {

      
        
        case TEACHERAUTH:
            return {
                ...state,
                teacherAuth: actions.payload
            }
        case TEACHERLOGIN:
            return {
                ...state,
                teacherLogin: actions.payload
            } 


        default:
            return state

    }
}