import React, { useState, useEffect, Fragment, useRef } from 'react'
import { connect } from 'react-redux'
 import { Modal, Button } from 'react-bootstrap';

import { EditEmployeeAPI } from './Redux/Employees/employeeActions'
import Spinner from './spinner/spinner'
import Moment from 'react-moment';
import moment from 'moment'
import { history } from '../components/Helpers/history'

 
function EditEmployee(props) {

  const [show, setshow ] = useState(true)
  const [initialState, setSubmitState] = useState({
    id: props.employee.id,
    firstName: props.employee?.firstName,
    lastName: props.employee?.lastName,
    location: props.employee?.location,
    dob: props.employee?.dob?.substr(0, 10),
    doj: props.employee?.doj?.substr(0, 10),
    salary: props.employee?.salary,
    manager: props.employee?.manager,
    submitted: false,
    closeAll: false
  })

  // const [{ id , name , location ,salary , submitted} , setSubmitState] =  useState(props.employee)

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    const { name, value } = e.target;
    setSubmitState({ ...initialState, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newState = { ...initialState, submitted: true }
    // setSubmitState(newState)
    initialState.submitted = true;
    props.EditEmployeeAPI(initialState)

  }

  const handleClose = (e) => {
    console.log("val")
    setshow(false)
    props.onCloseEditModel("shahsnak")
  }

  return (
    <>
      <div className="card col">
        <div className="card-body">
          <form name="form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">

                <div className="">
                  <div className="form-group ">
                    <h3>  {initialState.id}</h3>
                  </div>
                </div>
                <div className="">
                  <div className="form-group row">
                    <label className="col-sm-5 col-md-5 col-form-label">First name :</label>
                    <input type="text" className="form-control" onChange={handleChange} name="firstName" value={initialState.firstName}></input>
                  </div>
                  {/* {nameError && <label className="alert alert-danger">{nameError}</label>} */}
                </div>

                <div className="">
                  <div className="form-group row">
                    <label className="col-sm-5 col-md-5 col-form-label">Last name : </label>
                    <input type="text" className="form-control" onChange={handleChange} name="lastName" value={initialState.lastName}></input>
                    {/* {lastNameerror && <label className="alert alert-danger">{nameError}</label>} */}
                  </div>
                </div>


                <div className="">
                  <div className="form-group row">
                    <label className="col-sm-5 col-md-5 col-form-label">Location :</label>
                    <input type="text" className="form-control" onChange={handleChange} name="location" value={initialState.location}></input>
                  </div>
                </div>
              </div>


              <div className="col">
                <div className="">
                  <div className="form-group row">
                    <label className="col-sm-5 col-md-5 col-form-label">Salary : </label>
                    <input type="text" onChange={handleChange} name="salary" className="form-control" value={initialState.salary}></input>
                   </div>
                </div>

                <div className="">
                  <div className="form-group row">
                    <label className="col-sm-5 col-md-5 col-form-label">DOB :</label>
                    <input type="date" className="form-control" onChange={handleChange} name="dob" defaultValue={initialState.dob}
                    //  value={initialState.dob}
                    >
                     </input>
                   </div>
                </div>

                <div className="">
                  <div className="form-group row">
                    <label className="col-sm-5 col-md-5 col-form-label">DOJ :</label>
                    <input type="date" className="form-control" onChange={handleChange} name="doj" defaultValue={initialState.doj}
                    //  value={initialState.doj}
                     >
                     </input>
                   </div>
                </div>

                <div className="">
                  <div className="form-group row">
                    <label className="col-sm-5 col-md-5 col-form-label">Manager :</label>
                    <input type="checkbox" onChange={handleChange} name="manager" value={initialState.manager}></input>
                    {/* {salaryError && <label className="alert alert-danger">{salaryError}</label>} */}
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div className="form-row">
              <div className="form-group col-10">
                <input type="submit" value="Save"></input>
                <button onClick={handleClose} > Close</button>
              </div>
            </div>
          </form>

        </div>
      

      </div>
    </>
  )
}

const mapStateToProps = (state = null) => {
  return {
    emp: state.emps
  }
}



const mapDispatchToProps = (dispatch) => {

  return {
    EditEmployeeAPI: (state) => dispatch(EditEmployeeAPI(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee)


  {/* {props.emp.editLoading && <Spinner />  } */}

        {/* initialState.submitted */}
        {/* {  !props.emp.editLoading &&  props.emp.editSuccess    &&
          <Modal
            show={show}
            size="lg"
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header >
              <Modal.Title> Edit Success </Modal.Title>
            </Modal.Header>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </Modal>
          // <AlertEditSuccess message="Edit Successfull" empprops={props} onCloseAlertModal={handleClose} />
        } */}