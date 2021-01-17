import {combineReducers} from 'redux';
import { loginAPIRequest } from './Login/loginAction';
import loginReducer from './Login/loginReducer';
import employeeReducer from './Employees/employeeReducer'

import signUpReducer from './SignUp/signUpReducer'
import alertReducer from './Alert/alertReducer';
import loadingReducer from './Loader/loadingReducer';


const rootReducer = combineReducers({
    
    signUp : signUpReducer ,
    login : loginReducer,
    emps : employeeReducer,
    alert : alertReducer,
    loading : loadingReducer
  
})

export default rootReducer;