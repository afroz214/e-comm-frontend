// import React, { useState } from 'react'

// const Test = () => {

//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [errors, setErrors] = useState({})

//     const validation = ({ name, email, password }) => {
//         let errors = {}
//         if (!name) {
//             errors.name = 'Name is Required'
//         }
//         if (!email) {
//             errors.email = 'Email is required'
//         } else if(!email.includes('@')) {
//             errors.email = 'Enter a valid email'
//         }
//         if (!password) {
//             errors.password = 'Password is required'
//         } else if (password.length < 6) {
//             errors.password = 'Password must be greater than 6 character'
//         }
//         return errors
//     }

//     const onSubmit = (e) => {
//         e.preventDefault()
//         setErrors(validation({ name, email, password }))
//     }

//     return (
//         <div className="container mt-5">
//             <form onSubmit={onSubmit}>
//                 <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
//                 { errors.name && <p className="text-danger"> {errors.name} </p> }
//                 <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
//                 { errors.email && <p className="text-danger"> {errors.email} </p> }
//                 <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
//                 { errors.password && <p className="text-danger"> {errors.password} </p> }
//                 <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Test
