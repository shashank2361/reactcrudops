import { findAllByTestId } from "@testing-library/react"
import { GETALL_FAILURE, GETALL_REQUEST, GETALL_SUCCESS } from "../Login/loginTypes"
import { EDIT_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, GETALL_LOCATION, SAVE_FAILURE, SAVE_REQUEST, SAVE_SUCCESS } from "./employeeTypes"


const intialState = {
    employees: [],
    locations: [],
//    loading: false,
    success: false,
    submitted: false,
   // editLoading: false,
    editSuccess: false,
    saveLoading: false,
    saveSuccess: false,
    employee: {},
    error: '',


}


const employeeReducer = (state = intialState, action) => {

    switch (action.type) {
        case GETALL_REQUEST:
            return {
                ...state, 
                // loading: true, 
                success: false,
            }

        case GETALL_SUCCESS:
            return {
                ...state,  
                // loading: false,
                success: true,
                employees: action.payload
            }

        case GETALL_FAILURE:
            return {
                //loading: false,
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
                 
                // editLoading: false,
                editSuccess: false,
                error : action.payload,
                employees: [],
               

            }

        case EDIT_REQUEST:
            return {
                ...state, 
                //editLoading: true, 
                editSuccess: false
            }

        case EDIT_SUCCESS:
            return {
                ...state, 
                //editLoading: false,
                editSuccess: true,
                employee: action.payload
            }

        case SAVE_REQUEST:
            return {
                ...state, 
                //saveLoading: true, 
                saveSuccess: false
            }

        case SAVE_SUCCESS:
            return {
                ...state, 
                //saveLoading: false,
                saveSuccess: true,
                error: ''
            }


        case SAVE_FAILURE:
            return {
                // saveLoading: false,
                saveSuccess: false,
                employees: {}

            }


        default: return state

    }
}


export default employeeReducer