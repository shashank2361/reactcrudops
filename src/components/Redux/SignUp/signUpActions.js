 import React from 'react'
 import { SignUp_SUCCESS ,SignUp_REQUEST ,SignUp_FAILURE} from './signUpTypes'
 import axios from 'axios'
 import {history} from '../../Helpers/history'

//  export const signUpRequest = ( success = false ) => {

//     return {
//         type : SignUp_REQUEST,
//         payload : success
//     }
//  }

export const SignUpSuccess = success => {
    return {
        type: SignUp_SUCCESS,
        payload: success
    }
}

export const SignUpFailure = (error) => {
    return {
        type: SignUp_FAILURE,
        payload: error
    }
}

export const SignUpRequest = ( ) => {
    return {
        type: SignUp_REQUEST 
       
    }
}

 export const signUpAPIRequest = (user) => {

     return (dispatch) => {
            dispatch(SignUpRequest())
         axios
            .post('https://localhost:44389/api/SignUp' ,{
                UserName :user.username,
                Password : user.password,
                Avatar : user.avatar,
                Bio :user.bio
            })
            .then(response => {
                // response.data is the users
                
                const success = response.data
                dispatch(SignUpSuccess(success))
                history.push('/Home')
            })
            .catch(error => {
                // error.message is the error message
                dispatch(SignUpFailure(error.message))
            })

    }


}
