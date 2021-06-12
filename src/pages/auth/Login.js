import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, googleAuthProvider } from '../../firebase'
import axios from 'axios'

const Login = ({ history }) => {
    const [email, setEmail] = useState('afrozatoz2000@gmail.com')
    const [password, setPassword] = useState('scarykomal')

    const dispatch = useDispatch()

    const createOrUpdateUser = async (token) => {
        const config = {
            headers: {
                token
            }
        }
        return await axios.post('/api/auth/create-or-update-user', {}, config)
    }

    const googleLogin = async () => {
        try {
        const { user } = await auth.signInWithPopup(googleAuthProvider)
        const { token } = await user.getIdTokenResult()
        const { data } = await createOrUpdateUser(token)
            dispatch({
                type: 'USER_LOGGED_IN',
                payload: {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    token,
                    role: data.role
                }
            })
            roleBasedRedirect(data)
        // history.push('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const roleBasedRedirect = (data) => {
        if (data.role === 'admin') {
            history.push('/admin/dashboard')
        } else {
            history.push('/user/history')
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password)
            const { token } = await user.getIdTokenResult()
            const { data } = await createOrUpdateUser(token)
            console.log(data)
            dispatch({
                type: 'USER_LOGGED_IN',
                payload: {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    token,
                    role: data.role
                }
            })

            roleBasedRedirect(data)
            // history.push('/')   
            
        } catch (error) {
            console.log('error')
            toast.error(error.message)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h1>Login</h1>
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    <button type="submit" className="btn btn-block btn-success mb-3" disabled={!email || password.length < 6}>Login(Email/Password)</button>
                    </form>
                    <button onClick={googleLogin} className="btn btn-block btn-danger mb-3">Login With Google</button>
                    <Link to="/forgot/password" className="text-danger float-right"><strong>Forgot Password</strong></Link>
                </div>
            </div>
        </div>
    )
}

export default Login
