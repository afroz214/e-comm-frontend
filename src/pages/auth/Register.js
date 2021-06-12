import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const Register = () => {

    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email has been sent to ${email} plaese click the link`)
        window.localStorage.setItem('emailForRegister', email)
        setEmail('')
    }

    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Enter your email" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
