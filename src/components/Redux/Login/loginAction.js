 import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS ,LOGOUT_SUCCESS} from './loginTypes'
 import {TOGGLE_LOADER} from '../Loader/loadingTypes'
 import { toast } from 'react-toastify';

   import {history} from '../../Helpers/history'
    import agent from '../../apis/api'

const baseUrl = "http://localhost:44389/";
   
// export const LoginRequest = () => {
//     return {
//         type: LOGIN_REQUEST 
//      }
// }

export const LoginSuccess = userObj => {
    return {
        type: LOGIN_SUCCESS,
        payload: userObj
    }
}


export const LoginFailure = error => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export const LogoutSuccess = () => {
    localStorage.removeItem('userObj');    
      return {    type: LOGOUT_SUCCESS  
                  }
}


export const RefreshToken = (userObj) => {

    console.log("refresh token",userObj )
     return (dispatch) => {
            agent.User.refreshToken(userObj).then(response => {
            const userObj = response.data
            console.log(JSON.stringify(userObj) , response)
         })
        .catch(error => {
            console.log(error)
            dispatch( LogoutSuccess())
        })
    }
}


export const loginAPIRequest = (user  ) => {
    console.log(user)
    return (dispatch) => {
            // dispatch(LoginRequest())
            dispatch({ type: TOGGLE_LOADER });
           agent.User.login(user).then(response => {
            const userObj = response.data
            console.log(JSON.stringify(userObj) , response)

            localStorage.setItem('userObj', JSON.stringify(userObj));
            dispatch({ type: TOGGLE_LOADER });
           dispatch(LoginSuccess(userObj))
              history.push('/Home')
         }).then(    () => toast.success("Logged In Successfully!")    ) 
        .catch(error => {
             console.log(error)
            dispatch({ type: TOGGLE_LOADER });
            dispatch(LoginFailure("Login Failed"))
            toast.error("Login Failed")
        })



        //  axios
        //     .post('https://localhost:44389/users/authenticate' ,{
        //         UserName :user.username,
        //         Password : user.password
        //     })
        //     .then(response => {
        //         const userObj = response.data
        //         localStorage.setItem('userObj', JSON.stringify(userObj));
        //         dispatch(LoginSuccess(userObj))
        //          history.push('/Home')
        //      })
        //     .catch(error => {
        //         // error.message is the error message
        //         console.log(error)
        //         dispatch(LoginFailure(error.message))
        //     })
    }
}

// //   history.props('/Home');