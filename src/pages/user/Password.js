import React, { useState } from 'react'
import { toast } from 'react-toastify'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'

const Password = () => {
    const [password, setPassword] = useState('')
 
    const passwordUpdate = async (e) => {
        e.preventDefault()
        try {
            await auth.currentUser.updatePassword(password)
            toast.success('Password has Been Updated Successfully')
            setPassword('')
        } catch (error) {
            toast.error('Enter Valid Password')
        }
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col-md-10">
            <h4>Password Update</h4>
            <form onSubmit={passwordUpdate}>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter Your Password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success" disabled={password.length < 6}>Submit</button>
            </form>
            </div>
        </div>
    </div>
    )
}

export default Password
