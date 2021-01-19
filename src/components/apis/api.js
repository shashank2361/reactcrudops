
import axios from 'axios'
// import {Toast} from 'react-bootstrap'
// import {history} from   '../../components/Helpers/history'
// import { refreshApiCall } from '../Helpers';
import jwt_decode from "jwt-decode";
import moment from 'moment'
import { toast } from 'react-toastify';


axios.defaults.baseURL = 'https://localhost:44389/';

axios.interceptors.request.use((config) => {
    const userObj = JSON.parse(window?.localStorage?.getItem('userObj'));

    if (userObj && userObj?.token)
        config.headers.Authorization = `Bearer ${userObj?.token}`
    return config;
}, error => {
    return Promise.reject(error);
}
)

axios.interceptors.response.use(response => {

    console.log(response)
    // toast.success( response.statusText)
    return response;
    
},
    error => {       
        return new Promise((resolve, reject) => {
            const originalReq = error.config;
            // console.log(originalReq);
            // console.log(error);
            const { status, data, config } = error?.response;
            console.log('severe error ', status, data, config, config.method)
            const userObj = JSON.parse(window?.localStorage?.getItem('userObj'));
            if (error && error?.response?.status === 401 && error?.config && !error?.config?.__isRetryRequest) {
                originalReq._retry = true;
                console.log("inside fetch", JSON.stringify({
                    jwtToken: userObj?.token,
                    refreshToken: userObj.refreshToken
                }))
                let res = fetch('https://localhost:44389/users/refresh', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    // credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Device': 'device'
                        // 'Token': userObj?.token
                    },
                    redirect: 'follow',
                    referrer: 'origin',
                    body: JSON.stringify({
                        jwtToken: userObj?.token,
                        refreshToken: userObj.refreshToken
                    }),
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    localStorage.setItem('userObj', JSON.stringify(res));
                    // this.setSession({token: res.token, refreshToken: res.refreshToken});
                    originalReq.headers['Token'] = res.token;
                    // originalReq.headers['Device'] = "device";
                    console.log(originalReq)
                    return axios(originalReq);
                })
                //  .catch(error => console.log( "error ", error));

                resolve(res);
            }
       
                if (status ===  400  && config.method === 'put') {
                    console.log("inside put failed" , data?.title)
                    toast.error("api failed" + data.title ) 
                }

                if ((error?.message === 'Network Error' || error?.message === "Error: Network Error") && !error?.response) {
                    toast.error('Network error - make sure API is running!')
                }
             
                if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
                    //history.push('/notFound')
                }

                if (status === 500) {
                    console.log('severe error ', status)
                    toast.error('Severe Error - check the terminal for more info?')
                }
             
             throw error.response;
           // return Promise.reject(error);
        });
  
    })


const responseBody = (response) => response;
const erorr = ( err) => {
    console.log(err)
    return err;
};

const sleep = (ms) => (response) => (resolve =>
    setTimeout(() => resolve(response), ms));


const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody) ,
    del : (url) =>axios.delete(url).then(responseBody)
}

// post: (url, body) => axios.post(url, body).then(sleep(5000)).then(responseBody),


const CrudOperations = {
    getlistemployees: () => requests.get('/Employee'),
    saveEmployee: (employee) => requests.post('/Save', employee),
    editEpmloyee: (employee) => requests.put('/Employee', employee),
    getLocations: () => requests.get('/GetLocations'),
    deleteEmployee : (id) => requests.del(`/Delete/${id}`),
}

const User = {
    current: () => requests.get('/user'),
    login: (user) => requests.post('/users/authenticate',
        {
            UserName: user.username,
            Password: user.password
        }),
    refreshToken: (userObj) => requests.post('users/refresh', {
        jwtToken: userObj.token, refreshToken: userObj.refreshToken
    }),
    register: (user) => requests.post('/user/register', user),
}

export default { CrudOperations, User };



    //  var jwt_Token_decoded = jwt_decode(userObj?.token);
    //  console.log("Jwt exp",  new Date(jwt_Token_decoded.exp * 1000)?.toUTCString())
    //  console.log(new Date(Date.now()).toUTCString())