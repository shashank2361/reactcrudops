// Not used anymore Just for refrence

import jwt_decode from "jwt-decode";

export const checkAuth = () => {



    const userobj = JSON.parse(localStorage.getItem('userObj'));
    
   const token =  userObj.tiken
   const refreshToken =   userObj.refreshToken

   if (userobj && userobj.token) {
    try {
        var jwt_Token_decoded = jwt_decode(userobj.token);
        var  refreshToken_decoded = jwt_decode(userobj.refreshToken);
        console.log(jwt_Token_decoded)
        console.log(jwt_Token_decoded.exp * 1000);
        console.log(new Date(jwt_Token_decoded.exp * 1000).toUTCString())
        console.log(new Date(refreshToken_decoded.exp * 1000).toUTCString())
        console.log(new Date(Date.now()).toUTCString())

        console.log(Date.now());

        if (jwt_Token_decoded.exp * 1000 < Date.now()) {
           console.log("token expired")
            // localStorage.removeItem('userObj');
            return {};
        }
    } catch (error) {
        // invalid token format
        console.log(error)
        return {};  
    }


   if (!token || !refreshToken) {
     return false;
   }
 
   try {
     // { exp: 12903819203 }
     const { exp } = decode(refreshToken);
 
     if (exp < new Date().getTime() / 1000) {
       return false;
     }
 
   } catch (e) {
     return false;
   }
 
   return true;
 }
