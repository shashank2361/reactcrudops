import React from 'react'
import jwt_decode from "jwt-decode";
import agent from '../apis/api';

export function AuthHeader() {

    const userobj = JSON.parse(localStorage?.getItem('userObj'));
    var jwt_Token_decoded = jwt_decode(userobj?.token);
    console.log("Jwt exp",  new Date(jwt_Token_decoded.exp * 1000)?.toUTCString())
    console.log(new Date(Date.now()).toUTCString())

     if (userobj && userobj.token) {
        try {
            if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                console.log("token expired")
                // localStorage.removeItem('userObj');
                var newToken =   refreshApiCall(userobj)
                console.log(newToken)
                return { 'Authorization': 'Bearer ' + newToken.token };
            }
        } catch (error) {
            // invalid token format
            console.log(error)
            return {};  
        }
        
        return { 'Authorization': 'Bearer ' + userobj.token };
    } else {
        return {};
    }
}
 
export function refreshApiCall(userobj){
    agent.User.refreshToken(userobj).then(response => {
        const userObj = response.data
        console.log(JSON.stringify(userobj) , response)
         localStorage.setItem('userObj', JSON.stringify(userObj));

         return userobj;
    }). catch(error => {
        
        console.log(error)
        return {};  

    })
 
}            
    
