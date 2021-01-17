import { SignUp_FAILURE, SignUp_REQUEST, SignUp_SUCCESS } from "./signUpTypes";


const initialState = {
    success: false ,
    loading : false,
    error : ''
}


const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SignUp_REQUEST:
            return {
                ...state, loading: true
            }


        case SignUp_SUCCESS:
            return {
                 loading: false,
                 success : true
            }


        case SignUp_FAILURE:
            return {
                loading: false,
                 success : true,
                 error : action.payload
            }


        default: return state

    }
}

export default signUpReducer;