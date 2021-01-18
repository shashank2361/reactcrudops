import React, {Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment';
// import moment from 'moment'
import { GetAllEmployees } from './Redux/Employees/employeeActions';
import { LogoutSuccess } from './Redux/Login/loginAction';
import EditModal from './EditModal'
import EditEmployee from './EditEmployee';
import CreateModal from './CreateModal';
import { Button, Row, Container, Col, ButtonGroup ,Modal } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import Loader from 'react-loader-spinner';

import { NavLink } from 'react-router-dom';
import ConfirmModal from './AlertModals/ConfirmModal';
// import { ValidationError } from 'yup';
//useHistory
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function Home(props) {
    const initilState = {
        employees: [],
        showModal: false,
        editId: 0
    }

   
    const [employeeState, setEmployees] = useState(initilState)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setshowEditModal] = useState(false)
    const [editId, seteditId] = useState(0)

    useEffect(() => {
            props.GetAllEmployees();
     }, [ showEditModal , showCreateModal  ])

    const refreshPage = (val) =>{
     //   window.location.reload(false);
         props.history.push('/home');
    }

    const handleLogout = (e) => {
        e.preventDefault();
        props.LogoutSuccess();
        props.history.push('/');
    }
    
    const deleteClick = (e, id) => {
        e.preventDefault();
                ConfirmModal(handleClickDelete);
        // if(window.confirm("Are you sure"))
        // {
 
  
    }
    function  handleClickDelete(){
        alert("deleted")
    }

    const editClick = (e, id) => {
        e.preventDefault();
        setshowEditModal(true)
        seteditId(id)
 
    }

    const openCloseModal = (val) => {
        setshowEditModal(false)
         const newSt = { ...employeeState, showModal: !employeeState.showModal }
        setEmployees(newSt);
    }
 
    const handleClose = () => {
        console.log("to home")
        setShowCreateModal(false)
    }

    
    console.log("employees", props?.emps?.employees)
     return (
        <Fragment>
                <Col>
                    <div className="  "> <h3 className="alert alert-primary ">Home Page
                        <ButtonGroup className="mb-4  float-right">
                            <NavLink to={'/EmployeeCreate'}> <Button variant="success" size="lg" block>Create new employee </Button> </NavLink>
                            <button className=" btn btn-warning" onClick={handleLogout}>Logout</button>
                        </ButtonGroup>
                    </h3>
                    </div>
                    <Button onClick={() => setShowCreateModal(true)} variant="primary" size="lg" block>Create</Button>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Location</th>
                                <th scope="col">Dob</th>
                                <th scope="col">Doj</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Country</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>                               
                        { props.emps && props?.emps?.employees && props?.emps?.employees.map(item => (<tr key={item.id}>
                                <th>{item.firstName}</th>
                                <th>{item.lastName}</th>
                                <th>{item.location}</th>
                                <th>{ item.dob &&   <Moment format="DD/MM/YYYY">{item.dob }</Moment>  }</th>
                                <th>  { item.doj  &&  <Moment format="DD/MM/YYYY">{item.doj }</Moment>  }            </th>
                                <th>{item.salary}</th>
                                <th>{item.country}</th>
                                <th><button onClick={(e) => editClick(e, item.id)} className="btn btn-sm btn-success">Edit</button> </th>
                                <th><button onClick={(e) => deleteClick(e, item.id)} className="btn btn-sm btn-danger">Delete</button> </th>
                                </tr>))
                        }
                        </tbody>
                        { props.emps && props.emps?.employees.length > 1 && showEditModal &&  
                            <EditModal open={showEditModal} close={ () =>  setshowEditModal(false)} >
                                <EditEmployee 
                                    onCloseEditModel={ () =>  setshowEditModal(false) } 
                                    employee={props.emps?.employees.find(emp => emp.id === editId)}
                                    id={editId}
                                     >
                                </EditEmployee>
                            </EditModal>
                        }
                    </table>
                   {  <CreateModal show={showCreateModal} onCloseModal={ () => setShowCreateModal(false)} /> }
                   {/* showCreateModal &&  */}
                
                </Col>
        </Fragment>
    )
}


const mapStateToProps = (state) => {
     return {
        emps: state.emps,
        isAlert: state.alert,
        
    }
}


const mapDispatchToProps = (dispatch) => {


    return {
        LogoutSuccess: () => dispatch(LogoutSuccess()),
        GetAllEmployees: () => dispatch(GetAllEmployees())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


   //    var newState = ({ ...employeeState, employees: props.emps.employees })
                //    console.log("close", newState   )

                    //setEmployees(newState)
                    //  if (props.alert.closeAlert) {
                    //          var newState = ({ ...employeeState, employees: props.emps.employees, showModal: false  })
                    //          console.log("close", newState)
                    //          setEmployees(newState)
                    //  }


                     // if (props.alert.closeAlert) {
                    //     var newState = ({ ...employeeState, employees: props.emps.employees, showModal: false  })
                    //     console.log("close", newState)
                    //     setEmployees(newState)
                    // }
                    // else {
                    //     var newSt = ({ ...employeeState, employees: props.emps.employees })
                    //      setEmployees(newSt)
                    // }


         

                                   {/* { !props?.emps?.error && props.emps.saveSuccess  && showCreateModal &&
                     <Modal size="sm" show={props.emps.saveSuccess}
                        onHide={() => setShowCreateModal(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header bsPrefix=" ">
                            <h1>Save Success </h1>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                } */}


                // {  showCreateModal &&
                    //     <Modal size="sm" show={true}
                    //      //   onHide={handleClose}
                    //         backdrop="static"
                    //         keyboard={false}
                    //     >
                    //         <Modal.Body bsPrefix="spinnerTop">
                    //             <Loader type="Puff" color="#00BFFF" height={100}
                    //                 width={100} />
                    //         </Modal.Body>
                    //     </Modal>
                    // }
    