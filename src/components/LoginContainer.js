import React, {  Fragment } from 'react'
import { connect } from 'react-redux'
import { loginAPIRequest } from './Redux/Login/loginAction';
import { useForm } from 'react-hook-form';

function LoginContainer({dispatchLoginAPIRequest}) {
    const { register, handleSubmit, errors, formState } = useForm({
        mode: "onChange"
    });

    //const { dirtyFields, isSubmitted, submitCount, touched, isDirty, isSubmitting, isSubmitSuccessful,
    //   isValid, } = formState;
    const {   isSubmitted } = formState;
    const onSubmit = (data, e) => {        
        e.preventDefault();
        dispatchLoginAPIRequest({
            username: data.username,
            password: data.password
        } )
    };
    return (
        <Fragment>
            <div className="alert alert-info h2">Login</div>
            <div className="">
                <div className="alert alert-info">
                    Sample :Username: test    Password: test
                        </div>
                <form name="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className={'form-group' + (isSubmitted && !errors.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            name="username"
                            ref={register({ required: true, maxLength: 5 })}
                        />
                        {errors.username && <p className="help-block">Username is required</p>}
                    </div>
                    <div className={'form-group' + (isSubmitted && !errors.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password"
                            ref={register({ required: true })}
                        />
                        {errors.password && <p className="help-block">Password is required</p>}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Login</button>
                        {isSubmitted   &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) =>  ({ login: state.login })
const mapDispatchToProps = (dispatch) => ({   dispatchLoginAPIRequest: (state) => dispatch(loginAPIRequest(state)) })
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)




   {/* {props.login.loggedIn}
            {props.login.loading && <h2>Loading.div.</h2>} */}

            {/* {props?.location?.state?.bio && <h4> You can login with your credentials {props.location.state.bio}</h4>} */}


{/* {props.login.loading ? <h2>Loading.div............</h2>  : null}   */ }
{/* { !props   && !props.login  && props.login.success    &&   props.history.push('/Home')         }   */ }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //    const newState = { ...{ username, password, loading, submitted }, submitted: true }
    //    setSubmitState({ newState });
    //      props.loginAPIRequest({
    //         username: username,
    //         password: password
    //     }) 
    // }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setSubmitState({ ...{ username, password }, [name]: value });
    // }

    // var body = JSON.stringify({
    //     dirtyFields: dirtyFields,
    //     isSubmitted: isSubmitted,
    //     submitCount: submitCount,
    //     touched: touched,
    //     isDirty: isDirty, isSubmitting: isSubmitting,
    //     isSubmitSuccessful: isSubmitSuccessful, isValid, isValid
    // }
    // );

                                    {/* {!isValid && isSubmitted && dirtyFields.username && touched.username && <p>Username Dirty</p>} */}

                                {/* {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                } */}
                                {/* <pre>{JSON.stringify(formState, null, 2)}</pre>  */}
                        {/* { props.login.error && <div className="alert alert-danger">Invalid credentials {props.login.error}</div>}   */}
