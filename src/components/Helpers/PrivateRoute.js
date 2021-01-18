import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('userObj')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)


export const  SecuredRoute = (props) => {
  console.log(props , localStorage.getItem('userObj'))
     return(
       <Route path={props.path} render={ data =>  localStorage.getItem('userObj') ?
       (
        <props.component {...data}></props.component>):
        (<Redirect to={{pathname:'/'}}></Redirect>)}>

        </Route>
    )
  }


  export const  SecuredLoginRoute = (props) => {
    console.log(props)
     return(
       <Route exact path={props.path} render={ data =>  localStorage.getItem('userObj') ?
         (<Redirect to={{pathname:'/Home'}}></Redirect> ):(<props.component {...data}></props.component> )}>
       </Route>
    )
  }