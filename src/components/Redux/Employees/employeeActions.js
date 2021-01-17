import axios from 'axios'
import { GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS } from '../Login/loginTypes'
import {  OPEN_ALERT, TOGGLE_ALERT ,CLOSE_ALERT} from '../Alert/alertTypes'
 
import { EDIT_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, GETALL_LOCATION, SAVE_REQUEST, SAVE_SUCCESS ,SAVE_FAILURE} from './employeeTypes'
import moment from 'moment'

import agent from '../../apis/api'
import { TOGGLE_LOADER } from '../Loader/loadingTypes'
import { toast } from 'react-toastify'



export const GetAllRequest = () => {

    return {
        type: GETALL_REQUEST 
     }
}

export const GetAllSuccess = (employees) => {
    return {
        type: GETALL_SUCCESS,
        payload : employees
     }
}

export const GetAllLocationSuccess = (listobject) => {
    return {
        type: GETALL_LOCATION,
        payload : listobject
     }
}

export const GetAllFailure = (error) => {
    return {
        type: GETALL_FAILURE ,
        payload : error
     }
}


export const SaveSuccess = (response) => {
    return {
        type: SAVE_SUCCESS,
        payload : response
      }
}

export const SaveFailed = (error) => {
    return {
        type: SAVE_FAILURE,
        payload : error
      }
}

// export const EditRequest = () => { 
//     return {
//         type: EDIT_REQUEST 
//       }
// } 

export const EditSuccess = (employee) => {
    return {
        type: EDIT_SUCCESS,
        payload : employee
      }
} 

export const EditFailure = (error) => {
    return {
        type: EDIT_FAILURE,
        payload : error
      }
} 

export const GetAllEmployees =   ()  =>{
   
    return(  dispatch => {
            dispatch(GetAllRequest())

           agent.CrudOperations.getlistemployees()
                .then(response => {
            const employees = response.data
            var newEmployees=  employees.map(object => ({ object , 
                                                        id: object.id , 
                                                        salary : object.salary ,
                                                        dob : object.dateOfBirth ,
                                                        doj : object.dateOfJoining,
                                                        firstName: object.firstName ,
                                                        lastName : object.lastName,
                                                        gender : object.gender,
                                                        location : object.location
                                                }))    
              dispatch(GetAllSuccess(newEmployees))        
        })
        .catch(error => {
            // error.message is the error message   
            console.log(error.message)     
            dispatch(GetAllFailure(error.message))
         
            })
        })
}


export const GetAllLocation = ( ) =>{ 
    return( (dispatch) => {
        dispatch({ type: CLOSE_ALERT });
        agent.CrudOperations.getLocations().then(response => {
            // response.data is the users        
            const locations = response.data
              dispatch(GetAllLocationSuccess(locations))        
                    })
        .catch(error => {
            // error.message is the error message        
            dispatch(GetAllFailure(error.message))
            })
        })
    }

export const EditEmployeeAPI = (emp) => {

    return ((dispatch) => {
      //  dispatch(EditRequest())

        dispatch({ type: TOGGLE_LOADER });
        dispatch({ type: CLOSE_ALERT });
        agent.CrudOperations.editEpmloyee({
            Id: emp.id, 
            FirstName: emp.firstName , 
            LastName : emp.lastName ,
            Location: emp.location, 
            Salary: parseInt( emp.salary),
            Dob : emp.dob,
            Doj :  emp.doj
        }).then(r => {
            console.log("error")            
            dispatch({ type: TOGGLE_LOADER });
            dispatch(EditSuccess(r.data))            
            dispatch({ type: OPEN_ALERT , payload : "The edit is successfull"});

            toast.success("The edit is successfull")
            
        })
        .catch(e => {
            dispatch({ type: TOGGLE_LOADER });
            console.log("edit emp",e )
            dispatch(EditFailure("Edit Employee Error"))

        })


    })
}

export const SaveEmployeeAPI = (emp) => {
 
    return ((dispatch) => {
        dispatch({ type: TOGGLE_LOADER });

//        dispatch(SaveRequest())
        agent.CrudOperations.saveEmployee( {
            firstName: emp.firstName,
            lastName : emp.lastName,
            dob : moment( emp.dob).format("YYYY-MM-DD"),
            doj : moment( emp.doj).format("YYYY-MM-DD"),
            location: emp.location,
            manager : emp.manager,
            salary: parseInt( emp.salary),
         })
        .then(r => {
            dispatch({ type: TOGGLE_LOADER });

            dispatch(SaveSuccess(r.data))
        })
        .catch(e => {

            dispatch({ type: TOGGLE_LOADER });
            console.log(e.message)
            dispatch(SaveFailed(e.message))
        })


    })
}

    // axios
    // .get('https://localhost:44389/Employee' , { headers: authHeader()   })    
    // .then(response => {
    //     // response.data is the users        
    //     const employees = response.data
    //     console.log(employees)
    //     var newEmployees=  employees.map(object => ({ object , 
    //                                                 id: object.id , 
    //                                                 salary : object.salary ,
    //                                                 dob : object.dateOfBirth ,
    //                                                 doj : object.dateOfJoining,
    //                                                 firstName: object.firstName ,
    //                                                 lastName : object.lastName,
    //                                                 gender : object.gender,
    //                                                 location : object.location
    //                                         }))    
    //     console.log(newEmployees);                                            
    //      dispatch(GetAllSuccess(newEmployees))        
    // })
    // .catch(error => {
    //     // error.message is the error message   
    //     console.log(error)     
    //     dispatch(GetAllFailure(error.message))
    //     })
    // })


    
        // "2018-03-29"
        // axios
        //     .post(
        //         "https://localhost:44389/Save", {
        //         id: 1, 
        //         firstName: emp.firstName,
        //         lastName : emp.lastName,
        //         dob : emp.dob,
        //         doj : "2018-03-29",
        //         location: emp.location,
        //         manager : emp.manager,
        //         salary: parseInt( emp.salary),
        //      }, { headers: authHeader() })
        //     .then(r => {
        //         dispatch(SaveSuccess(r.data))
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         dispatch(SaveFailed(e.message))
        //     })

                // axios
        //     .put(
        //         "https://localhost:44389/Employee", {
        //         Id: emp.id, 
        //         FirstName: emp.firstName , 
        //         LastName : emp.lastName ,
        //         Location: emp.location, 
        //         Salary: parseInt( emp.salary),
        //         Dob : emp.dob,
        //         Doj :  emp.doj,

        //     }, { headers: AuthHeader() })
        //     .then(r => {

        //         dispatch(EditSuccess(r.data))
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         dispatch(EditFailure(e.message))
        //     })


        
        // axios
        // .get('https://localhost:44389/GetLocations' , { headers:  Authheader()   })        
        // .then(response => {
        //     // response.data is the users        
        //     const locations = response.data
        //       dispatch(GetAllLocationSuccess(locations))        
        //             })
        // .catch(error => {
        //     // error.message is the error message        
        //     dispatch(GetAllFailure(error.message))
        //     })


        // export const SaveRequest = () => {
//     return {
//         type: SAVE_REQUEST 
//       }
// }
