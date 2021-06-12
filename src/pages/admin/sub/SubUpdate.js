import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCategories } from '../../../actions/category'
import { getSub, updateSub } from '../../../actions/sub'

const SubUpdate = ({ match, history }) => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')

    const user = useSelector(state => state.user)

    useEffect(() => {
        loadCategory()
        loadSub()
    }, [])

    const loadCategory = async () => {
        const { data } = await getCategories()
        setCategories(data)
    }
    const loadSub = async () => {
        const { data } = await getSub(match.params.slug)
        setName(data.name)
        setCategory(data.parent)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await updateSub(match.params.slug, {name, parent: category}, user.token)
            toast.success(`${data.name} is created`)
            setName('')
            history.push('/admin/sub')
        } catch (err) {
            console.log(err.response)
            toast.error(err.response.data.msg)
        }
    }


    return (
        <div className="container">
            <h1>Create Sub Category</h1>
            <div className="form-group">
                <select className="form-control" onChange={e => setCategory(e.target.value)}>
                    <option>Please Select</option>
                    {categories.map(c => (
                        <option key={c._id} value={c._id} selected={c._id === category}> {c.name} </option>
                    ))}
                </select>
            </div>
            <form onSubmit={submitHandler} className="mb-5">
                <h4>Name</h4>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <br />
                <button type="submit" className="btn btn-outline-success" disabled={!category || !name}>Save</button>
            </form>
        </div>
    )
}

export default SubUpdate
