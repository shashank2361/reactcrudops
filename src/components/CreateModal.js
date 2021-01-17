import React, { useState , Fragment} from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from 'react-redux'

import * as Yup from 'yup';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
 import { useForm, Controller } from "react-hook-form";
import moment from 'moment'
import { SaveEmployeeAPI } from './Redux/Employees/employeeActions';
//import { ErrorMessage } from '@hookform/error-message';


function CreateModal(props) {
    // your form submit function which will invoke after successful validation

    const [initialState, setSubmitState] = useState({
        id: '',
        firstName: '', lastName : '',
        location: '',
        salary: '',
        dob: '',
        age: '',
        submitted: false,
        closeAll: false
    })
 
    const onSubmit = (data, e) => {
        e.preventDefault();
        // const form = e.currentTarget;
        // console.log(form.checkValidity())

        props.SaveEmployeeAPI(data)
     };

    
    function formatDate(date) {
         return new Date(date).toLocaleDateString()
    };


    const maxDate = '2050-12-31';

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string().required('Last name is required'),
        dob: Yup.string().required('Date of Birth is required'),
        // .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        doj: Yup.date() .default(maxDate)
            .nullable().transform((curr, orig) => orig === '' ? null : curr).
            max(
                new Date(maxDate), `Date of Joining must be a before date  ${formatDate(maxDate)}`
            ).required('Date of Joining is required')
        ,
        salary: Yup.mixed().test(
            'is-decimal', 'Invalid Salary', function (value) {
                const { path, createError } = this;
                if ((value + "").match(/^\d*\.{1}\d*$/)) {
                    return true
                }
                if (parseInt(value)) { return true }
                if (value === 0 || value < 0) {
                    return createError({ path, message: "Salary cannot be empty" });
                }
                return createError({ path, message: "Enter valid salary" });
            }).required('Salary is required'),
        location: Yup.string()
            .required('Location is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Ts & Cs is required')
    });


    const { register, handleSubmit, reset, errors, control, watch } = useForm({
        resolver: yupResolver(validationSchema)
    });

    validationSchema.isValid().then(valid => console.log(valid))


    const salaryOnChange = (e) => {
      //  const re = /^[0-9\b]+$/;
        setSubmitState({ ...initialState, [e.target.name]: e.target.value });
    }

    // console.log(watch("location"));
     // watch input value by passing the name of it

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(e.target.id === "Doj"){
            var xxx = moment(e.target.value).format("DD/MM/YYYY")
            console.log(xxx)
            // e.target.value = xxx;
            setSubmitState({ ...initialState, [name]: xxx });    
        }
        else    setSubmitState({ ...initialState, [name]: value });
    }

    const handleCreateClose = () => {
         props.onCloseModal(false)
    }

    // console.log(errors)
    return (
        <>
        <Modal
            show={props.show}
            onHide={handleCreateClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create new employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form   onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group as={Row} controlId="firstName">
                        <Form.Label column sm={2}>Firstname</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text"
                                bsPrefix={` form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                placeholder="firstName" name="firstName"
                                // onChange={handleChange}
                                ref={register}
                            />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="lastName">
                        <Form.Label column sm={2}>Lastname</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text"
                                bsPrefix={` form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                placeholder="lastName" name="lastName"
                                // onChange={handleChange}
                                ref={register} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="location">
                        <Form.Label column sm={2}>Location</Form.Label>
                        <Col sm={10}>
                            <Form.Control bsPrefix={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                type="text"
                                placeholder="location"
                                name="location"
                                ref={register }
                            />
                            {/* <div className="invalid-feedback"> {errors.location?.type === "required" && "Your input is required"}</div> */}
                            <div className="invalid-feedback">{errors.location?.message}</div>
                            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>                      */}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="dob">
                        <Form.Label column sm={2}>Date of Birth</Form.Label>
                        <Col sm={10}>
                            <Controller control={control}
                                name="dob"
                                ref={register}
                                render={(props) => (
                                    <DatePicker
                                        className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                        placeholderText="Select date"
                                        onChange={(e) => props.onChange(e)}
                                        selected={props.value}
                                        dateFormat='dd/MM/yyyy'
                                    />
                                )}
                            />
                            <div className="help-block">{errors.dob?.message}  </div>              
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="Salary">
                        <Form.Label column sm={2}>Salary</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" bsPrefix={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                                placeholder="Salary"
                                // onChange={handleChange}
                                ref={register}
                                name="salary" />
                                {/* <div className="invalid-feedback"> {errors.salary?.type === "required" && "Your input is required"}</div>  */}
                            <div className="invalid-feedback">{errors.salary?.message}</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="Doj">
                        <Form.Label column sm={2}>Date of Joining</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" bsPrefix ={`form-control ${errors.doj ? 'is-invalid' : ''}`}
                                placeholder="Date of Joining"
                                ref={register}
                                name="doj" onChange={handleChange}
                              />                             
                        <div className="invalid-feedback">{errors.doj?.message}</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="acceptTerms">
                        <Form.Label column sm={2}>Accept Terms</Form.Label>

                        <Col sm={10}>
                            <Form.Control type="checkbox" bsPrefix={`checkbox ${errors.acceptTerms ? 'is-invalid' : ''}`}
                                ref={register}
                                name="acceptTerms" 
                                // onChange={handleChange}
                                value={initialState.acceptTerms} />

                            <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
 
                        </Col>
                    </Form.Group>

                    <Button type="submit" variant="primary">Save</Button>

                    <Button variant="secondary" onClick={handleCreateClose}>
                        Close
                </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    


    </>
    )

}

 

const mapStateToProps = (state) => {
    console.log("state.emps", state.emps)
    return {
        emps: state.emps,
        isAlert: state.alert

     }
}

const mapDispatchToProps = (dispatch) => {

    return {
         SaveEmployeeAPI: (employee) => dispatch(SaveEmployeeAPI(employee))
 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal)

 
//                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

// dob1: Yup.string()
// .required('Date of Birth 1is required')
// .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format DD-MM-YYYY'),
// email: Yup.string()
// .required('Email is required')
// .email('Email is invalid'),

{/* <div className="help-block"> 
{errors.dob?.type === "required" && "DOB input is required"}</div>

<ErrorMessage
    errors={errors}
    name="dob"
    //  message={'The DOB value is required'}
     render={({ message }) => <div class={`${errors.dob ? 'help-block' : ''}`}>{message}</div>}
    as={'p'}
/> */}

{/* <Form.Check type="checkbox" label="accept terms"
                           ref={register} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} 
                    /> */}
                            {/* <input name="acceptTerms" type="checkbox" ref={register} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} /> */}
                            {/* <label for="acceptTerms" className="form-check-label">Accept Terms & Conditions</label> */}
                            