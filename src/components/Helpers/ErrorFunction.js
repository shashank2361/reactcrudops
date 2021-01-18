

import React from 'react'
import { useDispatch } from 'react-redux'

function ErrorFunction(error) {
    const dispatch = useDispatch()
    // Error
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the 
        // browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        toast.error("Request " + error.request.statusText) 

    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
     console.log(error.config);
     dispatch({ type: TOGGLE_LOADER });
     dispatch({ type: OPEN_ALERT , payload : "The update is un successfull"});
     toast.error( "Update Failed") 
     dispatch(EditFailure("Edit Employee Error"))
    
}

export default ErrorFunction
