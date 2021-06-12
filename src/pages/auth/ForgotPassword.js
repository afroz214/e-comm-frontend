import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }
        try {
            await auth.sendPasswordResetEmail(email, config)
            setEmail('')
            toast.success(`Check your ${email} to reset the password`)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h3>Forgot Password</h3>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                        </div>
                        <button type="submit" className="btn btn-block btn-danger" disabled={!email}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
