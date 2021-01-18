import React ,{Fragment}from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePicker, { touched } from 'react-datepicker'
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import {  NavLink } from 'react-router-dom'

import { GetAllLocation, SaveEmployeeAPI } from './Redux/Employees/employeeActions';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import AlertModal from './AlertModals/AlertModal';

function FormValidate(props , ...others) {


    React.useEffect(() => {
        console.log(props)
        props.GetAllLocation();
    }, []);


    function formatDate(date) {
        return new Date(date).toLocaleDateString()
    }


    function parseDate(e) {
        var value = e.target.value;
        console.log("val", value, e.target.id, moment(value, "YYYY MM DD").year());
        if (value.length > 10 || moment(value, "YYYY MM DD").year().length > 4) {
            document.getElementById(e.target.id).value = null
        }
        if (moment(value, 'YYYY MM DD').isValid()) {
            console.log("true", value)
            return true;
        }
        else {
            console.log("null", value)
            document.getElementById(e.target.id).value = null
        }
    }
    // const history = useHistory();

    const handleClose = () => {
        console.log("to home")
        props.history.push('/home')

    }
    const maxDate = '2050-12-31';
    // form validation rules 
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        dob1: Yup.string()
            .required('Date of Birth 1is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format DD-MM-YYYY'),
        dob: Yup.string().

            required('Date of Birth is required'),
        // .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),

        doj: Yup.date()
            .default(maxDate).nullable().transform((curr, orig) => orig === '' ? null : curr).
            max(
                new Date(maxDate), `Date of Joining must be a before date   ${formatDate(maxDate)}`
            ).required('Date of Joining is required')
        ,

        salary: Yup.mixed().test(
            'is-decimal', 'Invalid Salary', function (value) {
                const { path, createError } = this;
                if ((value + "").match(/^\d*\.{1}\d*$/)) {
                    return true
                }
                if (parseInt(value)) { return true }
                if (value == 0 || value < 0) {
                    return createError({ path, message: "Salary cannot be empty" });
                }
                return createError({ path, message: "Enter valid salary" });
            }).
            required('Salary is required'),

        location: Yup.string()
            .required('Location is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        // password: Yup.string()
        //     .min(6, 'Password must be at least 6 characters')
        //     .required('Password is required'),
        // confirmPassword: Yup.string()
        //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
        //     .required('Confirm Password is required'),

        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Ts & Cs is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, errors, control } = useForm({
        resolver: yupResolver(validationSchema)
    });


    validationSchema.isValid().then(valid => console.log(valid))

    function onSubmit(emp, e) {
        // display form data on success

        e.preventDefault();
        console.log(JSON.stringify(emp));
        props.SaveEmployeeAPI({ ...emp, manager: emp.acceptTerms, dob: moment(emp.dob).format("YYYY-MM-DD") })

        //       e.target.reset();

    }
    console.log("errors :", errors.dob)
    return (
        <div className="card m-3">

 
            {/* { props.emps.saveSuccess && */}

            <>
                     <AlertSuccessModal  >

                    <NavLink to={'/Home'}> <Button variant="success" size="sm" >To Home Validate</Button> </NavLink>

                </AlertSuccessModal> 

                {/* <Modal size="sm" show={props.emps.saveSuccess}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body bsPrefix="spinnerTop">
                        <h1>Save Success </h1>
                    </Modal.Body>
                    <Modal.Footer>
                        <NavLink to={'/Home'}> <Button variant="success" size="lg" block>To Home Validate</Button> </NavLink>

                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal> */}
                </>
            {/*   } */}

            <h5 className="card-header">React Form Validation Example with React Hook Form</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Title</label>
                            <select name="title" ref={register} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                                <option value=""></option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                            </select>
                            <div className="invalid-feedback">{errors.title?.message}</div>
                        </div>
                        <div className="form-group col-5">
                            <label>First Name</label>
                            <input name="firstName" type="text" ref={register} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="form-group col-5">
                            <label>Last Name</label>
                            <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Date of Birth1</label>
                            <input name="dob1" type="date" id="dob1" ref={register} onChange={e => parseDate(e)} className={`form-control ${errors.dob1 ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.dob1?.message}</div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col">
                                <label>Date of Birth</label>
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
                                <span className="label label-warning ">{errors.dob?.message}</span>
                            </div>
                        </div>

                        <div className="form-group col">
                            <label>Date of joining</label>
                            <input name="doj" type="date" ref={register} className={`form-control ${errors.doj ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.doj?.message}</div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label>Salary</label>
                            <input name="salary" type="number" ref={register} step=".01"
                                className={`form-control ${errors.salary ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.salary?.message}</div>
                        </div>

                        <div className="form-group col">
                            <label>Location</label>
                            <select name="location" ref={register} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                                {
                                    props.emps?.locations?.map(item => (<option key={item} value={item}>{item}</option>))
                                }
                            </select>
                            <div className="invalid-feedback">{errors.location?.message}</div>
                        </div>


                    </div>



                    <div className="form-row">

                        <div className="form-group col">
                            <label>Email</label>
                            <input name="email" type="text" ref={register} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Password</label>
                            <input name="password" type="password" ref={register} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Confirm Password</label>
                            <input name="confirmPassword" type="password" ref={register} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                        </div>
                    </div>
                    <div className="form-group form-check">
                        <input name="acceptTerms" type="checkbox" ref={register} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                        <label for="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                        <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                    </div>


                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-1">Register</button>
                        <button className="btn btn-secondary" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormValidate)



// { props.emps.saveLoading &&
//     <Modal size="sm" show={props.emps.saveLoading}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//     >
//         <Modal.Body bsPrefix="spinnerTop">
//             <Loader type="Puff" color="#00BFFF" height={100}
//                 width={100} />
//         </Modal.Body>
//     </Modal>
// }
