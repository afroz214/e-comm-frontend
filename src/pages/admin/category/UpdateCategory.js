import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCategory, updateCategory } from '../../../actions/category'

const UpdateCategory = ({ match, history }) => {
    const [name, setName] = useState('')

    const user = useSelector(state => state.user)

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = async () => {
        const { data } = await getCategory(match.params.slug)
        setName(data.name)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await updateCategory(match.params.slug, { name }, user.token)
            console.log(data)
            toast.success(`${data.name} is updated`)
            history.push('/admin/product')
        } catch (err) {
            console.log(err.response)
            toast.error(err.response.data.msg)
        }
    }


    return (
        <div className="container">
            <h1>Update Category</h1>
            <form onSubmit={submitHandler} className="mb-5">
                <h4>Name</h4>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" autoFocus required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <br />
                <button type="submit" className="btn btn-outline-success">Update</button>
            </form>
        </div>
    )
}

export default UpdateCategory
