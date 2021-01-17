import {CLOSE_ALERT , TOGGLE_ALERT ,OPEN_ALERT} from './alertTypes'

const initialState = {
    open : false,
    message : ''
}
const alertReducer =   (state = initialState, action) => {
     
    switch (action.type) {

        case CLOSE_ALERT :
            return { open:false}
            
        case TOGGLE_ALERT :
            return !state
                
        case OPEN_ALERT :
            return {...state , open:true  ,message : action.payload }
                   
        default:
            return state
    }

}

export default alertReducer