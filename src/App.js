import SignUpContainer from './components/SignUpContainer';

import { connect  } from 'react-redux'
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Switch, NavLink, Route, Router ,Redirect } from 'react-router-dom';
import LoginContainer from './components/LoginContainer';
// import { Router } from 'react-router';
import NotFound from './components/NotFound';
import Home from './components/Home';
import { history } from './components/Helpers/history'
import { PrivateRoute, SecuredLoginRoute, SecuredRoute } from './components/Helpers/PrivateRoute';
import EmployeeCreate from './components/EmployeeCreate';
import FormValidate from './components/FormValidate';
import AlertModal from './components/AlertModals/AlertModal'
import { Button, Modal, Row, Container, Col, ButtonGroup } from 'react-bootstrap';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import  AuthPage from './components/Pages/AuthPage';
import Spinner from './components/spinner/spinner';
 


function App(props) {
  return (
    <Fragment>
      <Container>
        <Row>
           <ToastContainer position='top-right' autoClose={2000}    hideProgressBar transition={Slide} />
              <Spinner/>   
              <AlertModal/>
            <div className="App">
              {
                 !props.login.loggedIn ?
                 (
                  <Switch>
                     <Route exact path="/auth" component={AuthPage} />
                     <Redirect to="/auth" />
                  </Switch>
                 ) : 
                 (
                  <Switch>
                     <Route path="/home" component={Home} />
                     <Route exact path="/EmployeeCreate" component={EmployeeCreate}></Route>
                     <Route exact path="/FormValidate" component={FormValidate}></Route>
                     <Redirect to="/home" />
                  </Switch>
                 )
              }
            </div>
        </Row>
      </Container>
    </Fragment>
  );
}
const mapStateToProps = (state) =>  {
  return {
    isLoading : state.loading,
    emps : state.emps,
    login : state.login,
    isAlert: state.alert
  }
} 
export default connect(mapStateToProps)(App);

 



// <Switch>
// <Route exact path="/" component={SignUpContainer}></Route>
// {/* <Route   path="/SignUpContainer" component={SignUpContainer}></Route> */}
// <SecuredLoginRoute path="/LoginContainer" component={LoginContainer}></SecuredLoginRoute>
// {/* <Route exact path = "/home" component={Home} /> */}
// <SecuredRoute path="/home" component={Home} />
// <Route exact path="/EmployeeCreate" component={EmployeeCreate}></Route>
// <Route exact path="/FormValidate" component={FormValidate}></Route>
// {/*         
// <Router history={history}>
//      <div>
//    <PrivateRoute exact path="/Home" component={Home} />
//  </div>
// </Router> */}
// <Route component={NotFound}></Route>
// </Switch>