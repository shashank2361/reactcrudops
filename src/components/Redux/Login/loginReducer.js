import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./loginTypes"

 
const defaultState = {
    loggedIn : false,
    success: false ,
    loading : false,
    error : '',
    userObj:{
    }
}

const userobj = JSON.parse(localStorage.getItem('userObj'));

 console.log(userobj);
const initialState = userobj ? {
    loggedIn : true,
    success: true ,
    loading : false,
    error : '',
    userObj:  userobj 
}  : defaultState;

const loginReducer = (state = initialState, action) => {
    console.log(action)
     switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state, loading: true
            }

        case LOGIN_SUCCESS:
            return {
               ...state,   loading: false,
                            success : true,
                           loggedIn : true,
                           userObj : action.payload
            }

        case LOGIN_FAILURE:
            return {
                loading: false,
                 success : false,
                 loggedIn : false,
                 error : action.payload,
                 userObj:{
                }
            }
            
        case LOGOUT_SUCCESS:
            return {
                loggedIn : false,
                logout : true,
                userObj:{
                }
            }
        default: return state
    }
}

export default loginReducer;