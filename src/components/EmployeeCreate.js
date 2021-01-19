
import { confirmAlert } from 'react-confirm-alert'; // Import


import React, { useState, useEffect } from 'react'
import { ErrorMessage } from '@hookform/error-message';
import { connect } from 'react-redux'
import { GetAllLocation, SaveEmployeeAPI } from './Redux/Employees/employeeActions';
import { Container, Row, Button, ButtonGroup, Form, Col, Alert, DropdownButton, Dropdown } from 'react-bootstrap';
import { Controller, useForm } from "react-hook-form";

import DatePicker from 'react-datepicker'
import ReactDatePicker from 'react-datepicker'

import Loader from 'react-loader-spinner'

import LoadingOverlay from 'react-loading-overlay'

// import  DatePicker  from 'react-bootstrap-date-picker'
import { NavLink } from 'react-router-dom';
import { LogoutSuccess } from "./Redux/Login/loginAction";
import "react-datepicker/dist/react-datepicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function EmployeeCreate(props) {

    React.useEffect(() => {
        console.log(props)
        props.GetAllLocation();
    }, [props.emps.error, props.emps.saveLoading]);

    let dt = new Date('02 15 2020');
    const maxDate = dt.setDate(dt.getDate() + 2);



    const { register, handleSubmit, watch, errors, control, reset } = useForm({
        defaultvalue: {
            id: '',
            firstname: '', lastName: '',
            location: '',
            salary: 0,
            ReactDatePicker: '',
            dob: '',
            doj: '',
            testdoj: '',
            email : '',
            manager: '',
            testddl: ''

        }
    });

    // your form submit function which will invoke after successful validation

    const handleLogout = (e) => {
        e.preventDefault();
        props.LogoutSuccess();
        props.history.push('/');
    }

    // console.log(watch("location"))
    // console.log(watch("doj"))
    // console.log(watch("ReactDatePicker"))
    // console.log(watch("salary"))

    const resetForm = (e) => {
        console.log("eeeeee", e)

    }
    const AlertMessage = () => {


        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>You want to delete this file?</p>
                        {/* <button onClick={onClose}>No</button> */}
                        <button
                            onClick={(e) => {
                                resetForm(e);
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                  </button>
                    </div>
                );
            }
        });


    };






    const [selectedDate, setSelectedDate] = useState(null)
    const [initialState, setSubmitState] = useState({
        id: '',
        firstname: '', lastName: '',
        location: '',
        salary: 0,
        dob: '',
        ReactDatePicker: '',
        doj: '',
        age: '',
        manager: '',
        testdoj: '',
        testddl: '',
        submitted: false,
        closeAll: false
    })




    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        const { name, value } = e.target;
        setSubmitState({ ...initialState, [name]: value });
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(JSON.stringify(data))
        props.SaveEmployeeAPI(data);
        e.target.reset()
    };

    console.log("props", props.emps)
    console.log("errors :", errors)

    // if  (props.emps.saveLoading){

    //     return(
    //         <Loader
    //            type="Puff"
    //            color="#00BFFF"
    //            height={100}
    //            width={100}
    //         //    timeout={3000} //3 secs

    //         />
    //        );
    // }

    return (
        <Container>

            <Row>




                <Col xs lg="12" >

                    <div className="  "> <h3 className="alert alert-primary ">Create Employee
            <ButtonGroup className="mb-4  float-right">

                            <NavLink to={'/FormValidate'}> <Button variant="success" size="lg" block>Form Validate</Button> </NavLink>
                            <button className=" btn btn-warning" onClick={handleLogout}>Logout</button>
                        </ButtonGroup>

                    </h3>
                    </div>



                    {(props.emps.saveSuccess && !props.emps.saveLoading) ? AlertMessage() : null}
                    <LoadingOverlay
                        active={props.emps.saveLoading}
                        spinner={<Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100} />
                        }
                    >



                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <br />

                            <Form.Group as={Row} controlId="firstname">
                                <Form.Label column sm={4}>Name</Form.Label>
                                <Col sm={8}>
                                    <Form.Control
                                        bsPrefix={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                        type="text"
                                        placeholder="firstame"
                                        name="firstName"
                                        ref={register({ required: true, message: "invalid firstname" })}
                                    />
                                    {errors.firstName?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >The first name is required</Alert>}
                                </Col>
                            </Form.Group>

                            <div className="form-group row">
                                <label className="col-sm-4">LastName</label>
                                <div className="col-sm-8">
                                    <input name="lastName" type="text"
                                        ref={register({
                                            required: true,
                                            message: "invalid lastName"
                                        })}
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                                    {errors.lastName?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >This lastName is required</Alert>}
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-sm-4">email</label>
                                <div className="col-sm-8">
                                    <input name="email" type="text"
                                        ref={register({
                                            required: true,
                                            pattern : /\S+@\S+\.S+/,
                                            message: "invalid email"
                                        })}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                    {errors.email?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >This lastName is required</Alert>}
                                </div>
                            </div>



                            {/* <Form.Group as={Row} controlId="location">
                        <Form.Label column sm={4}>Location</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                bsPrefix={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                type="text"
                                placeholder="location"
                                name="location"
                                ref={register({
                                    required: true
                                })}
                            />
                            {errors.location?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >This field is required</Alert>}
                        </Col>
                    </Form.Group> */}
                            {/* <div className="invalid-feedback">{errors.location?.message}</div> */}

                            
                            <Form.Group as={Row} controlId="Salary">
                                <Form.Label column sm={4}>Salary</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="number"
                                        placeholder="Salary"
                                        name="salary"
                                        ref={register({
                                            required: true,
                                            message: "Invalid Salary"
                                        })}
                                    />
                                    {errors.salary?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >This salary is required</Alert>}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="Dob">
                                <Form.Label column sm={4}>Date of birth</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="date"
                                        placeholder="Date of Birth"
                                        name="dob"
                                        ref={register({
                                            required: true,
                                            message: "invalid dob"
                                        })}
                                    />
                                    {errors.dob?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >This date of birth is required</Alert>}
                                </Col>
                            </Form.Group>

                            <br />

                            <Form.Group as={Row} controlId="ReactDatePicker">
                                <Form.Label column sm={4}>Date of Joining</Form.Label>
                                <Col sm={8}>
                                    <Controller
                                        control={control} class="form-control"
                                        name="ReactDatePicker"
                                        rules={{ required: true }}
                                        render={({ onChange, onBlur, value }) => (
                                            <ReactDatePicker
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                selected={value} className="form-control"
                                            />
                                        )}
                                    />
                                    {errors.ReactDatePicker?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >The date of joining is required</Alert>}
                                    <ErrorMessage
                                        errors={errors}
                                        name="ReactDatePicker"
                                        message={'The date of joining is required'}
                                        as={'p'}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicdropdown">
                                <Form.Label column sm={4}>Location DropDown</Form.Label>
                                <Col>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>City :</label>
                                            <select className="form-control" name="location" onChange={handleChange}
                                                ref={register({
                                                    required: true,
                                                    message: "select a value from dropdown"
                                                })}>

                                                <option value=''>Select location</option>
                                                <option value='Sales'>Sales</option>

                                                {
                                                    props.emps?.locations?.map(item => (<option value={item}>{item}</option>))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {errors.location?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >This drop down  field is required</Alert>}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicCheckbox">
                                <Form.Label column sm={4}>Agreed terms for Manager</Form.Label>
                                {/* <Form.Check type="checkbox" label="Check me out" /> */}
                                <Col sm={8}>
                                    <input type="checkbox"
                                        name="manager"
                                        className="float-left"
                                        ref={register({
                                            required: true
                                        })}
                                    />
                                    <br />
                                    {errors.manager?.type === "required" && <Alert variant="danger" column sm={{ offset: 0 }} >This agreed terms for manager required</Alert>}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formddl">
                                <Form.Label column sm={4}>Test DropDown</Form.Label>
                                <DropdownButton
                                    alignRight
                                    title="Dropdown right"
                                    name="testddl"
                                    id="dropdown-menu-align-right"
                                    ref={register({
                                        required: true
                                    })}>

                                    <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                                    <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                                    <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>


                            <Form.Group as={Row} controlId="Date of Joining">
                                <Form.Label column sm={4}>DOJ (validation not working)</Form.Label>
                                <Col sm={8}>
                                    <DatePicker
                                        className={"form-control"}
                                        name="testdoj"
                                        maxDate={maxDate}
                                        rules={{ required: true }}
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)}
                                        dateFormat='dd/MM/yyyy'
                                    //  ref={register({
                                    //     required: true
                                    // })}

                                    />
                                    {errors.testdoj?.type === "required" &&
                                        <Alert variant="danger" column sm={{ offset: 0 }} >This field is required</Alert>
                                    }
                                    <ErrorMessage
                                        errors={errors}
                                        name="testdoj"
                                        message={'This testdoj is required'}
                                        as={'p'}
                                    />
                                </Col>
                            </Form.Group>




                            <Button type="submit" variant="primary">Save</Button>
                        </Form>
                    </LoadingOverlay>

                    <div>


                        {props.emps?.error ? <h1>{props.emps?.error}</h1> : null}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


const mapStateToProps = (state) => {
    console.log(state.emps)
    return {
        emps: state.emps
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        GetAllLocation: () => dispatch(GetAllLocation()),
        SaveEmployeeAPI: (employee) => dispatch(SaveEmployeeAPI(employee)),
        LogoutSuccess: () => dispatch(LogoutSuccess())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate)


