import LoginContainer from '../LoginContainer'
import SignUpContainer from '../SignUpContainer'

import React from 'react'

function AuthPage() {
    return (
        <div className="row justify-content-between">
        <div className="col-md-5">
            <LoginContainer />
        </div>

        <div style={{ border: '1px solid #ababab' }}></div>

        <div className="col-md-6">
            <SignUpContainer />
        </div>
    </div>
    )
}

export default AuthPage
