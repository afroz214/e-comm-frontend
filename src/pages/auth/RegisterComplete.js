import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const RegisterComplete = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const createOrUpdateUser = async (token) => {
        const config = {
            headers: {
                token
            }
        }
        const res = await axios.post('/api/auth/create-or-update-user', {}, config)
        return res
    }

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegister'))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        // 
        if (password.length < 6) {
           return toast.error('Password must be 6')
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            if (result.user.emailVerified) {
                window.localStorage.removeItem('emailForRegister')
                let user = auth.currentUser
                await user.updatePassword(password)
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
                history.push('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h1>Register Complete</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" disabled value={email} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" autoFocus value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Register Complete</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
