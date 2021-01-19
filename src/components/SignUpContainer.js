import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { signUpAPIRequest } from './Redux/SignUp/signUpActions';
import { Redirect } from 'react-router-dom'

function SignUpContainer(props) {

    const initialState = {
        username: '',
        password: '',
        avatar: '',
        bio: '',
        submitted: false
    };
    const [submitState, setSubmitState] = useState(initialState)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubmitState({ ...submitState, [name]: value });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        var newState = { ...submitState, submitted: true }
        setSubmitState(newState);
        props.signUpAPIRequest(newState)
    }

    return (
        <Fragment>
                 <form onSubmit={handleSubmit}>
                    <div className="alert alert-info h3">Sign up for an account
                        {/* <NavLink to={'/LoginContainer'}> <Button   variant="success" size="sm"  >Login</Button> </NavLink> */}
                    </div>
                    <div className={'form-group' + (submitState.submitted && !submitState.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control"
                            name="username" value={submitState.username}
                            onChange={handleChange} />
                        {submitState.submitted && !submitState.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitState.submitted && !submitState.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={submitState.password} onChange={handleChange} />
                        {submitState.submitted && !submitState.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitState.submitted && !submitState.avatar ? ' has-error' : '')}>
                        <label htmlFor="Avatar">Avatar</label>
                        <input type="text" className="form-control" name="avatar" value={submitState.avatar} onChange={handleChange} />
                        {submitState.submitted && !submitState.avatar &&
                            <div className="help-block">Avatar is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitState.submitted && !submitState.bio ? ' has-error' : '')}>
                        <label htmlFor="bio">Bio</label>
                        <input type="text" className="form-control" name="bio" value={submitState.bio} onChange={handleChange} />
                        {submitState.submitted && !submitState.bio &&
                            <div className="help-block">Bio is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {(submitState.submitted) &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            
          

   


        </Fragment>

    )
}


const mapStateToProps = (state) => ( { signUp: state.signUp })

const mapDispatchToProps = (dispatch) => ({   signUpAPIRequest: (submitState) => dispatch(signUpAPIRequest(submitState))  })



export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
