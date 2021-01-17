import  {CLOSE_ALERT, OPEN_ALERT, TOGGLE_ALERT} from './alertTypes' ;
 
export const CloseAlert = (  ) => {    
    return {
        type: CLOSE_ALERT,
     }
}

export const ToggleAlert = (alert = false) => {
    return {
        type: TOGGLE_ALERT ,
        payload : !alert
     }
}


export const OpenAlert = (message ) => {
    return {
        type: OPEN_ALERT ,
        payload : message
     }
}
 