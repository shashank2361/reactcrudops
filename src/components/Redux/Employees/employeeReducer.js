import { findAllByTestId } from "@testing-library/react"
 import { GETALL_REQUEST ,  GETALL_SUCCESS , GETALL_FAILURE, EDIT_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, GETALL_LOCATION, SAVE_FAILURE, SAVE_REQUEST, SAVE_SUCCESS } from "./employeeTypes"
//  

const intialState = {
    employees: [],
    locations: [],
    success: false,
    submitted: false,
   // editSuccess: false,
    saveSuccess: false,
    employee: {},
    error: null,
}

const employeeReducer = (state = intialState, action) => {

    switch (action.type) {
       
        case GETALL_SUCCESS:
            return {
                ...state,  
                success: true,
                employees: action.payload
            }

        case GETALL_FAILURE:
            return {
                success: false,
                employees: [],
                error: action.payload
            }

        case GETALL_LOCATION:
            return {
                ...state, locations: action.payload, saveSuccess: false
            }

        case EDIT_FAILURE:
            return {
                 error : action.payload,
                employees: [],
            }

        case EDIT_REQUEST:
            return {
                ...state
             }

        case EDIT_SUCCESS:
            return {
                ...state, 
                // editSuccess: true,
                employee: action.payload
            }

        case SAVE_REQUEST:
            return {
                ...state, 
                saveSuccess: false
            }
        case SAVE_SUCCESS:
            return {
                ...state, 
                saveSuccess: true,
                error: ''
            }
       
        default: return state

    }
}


export default employeeReducer

 // case GETALL_REQUEST:
        //     return {
        //         ...state, 

        //         success: false,
        //     }

        // case SAVE_FAILURE:
        //     return {
        //          saveSuccess: false,
        //         employees: {}

        //     }