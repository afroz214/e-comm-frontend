import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getCategories } from '../../../actions/category'
import { createSub, removeSub, getSubs } from '../../../actions/sub'

const SubCreate = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])
    const [keyword, setKeyword] = useState('')
    const [category, setCategory] = useState('')

    const user = useSelector(state => state.user)

    useEffect(() => {
        loadCategory()
        loadSubs()
    }, [])

    const loadCategory = async () => {
        const { data } = await getCategories()
        setCategories(data)
    }
    const loadSubs = async () => {
        const { data } = await getSubs()
        setSubs(data)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await createSub({name, parent: category}, user.token)
            toast.success(`${data.name} is created`)
            setName('')
            loadSubs()
        } catch (err) {
            console.log(err.response)
            toast.error(err.response.data.msg)
        }
    }

    const handleRemove = async (slug) => {
        if (window.confirm('Are you sure?')) {
           await removeSub(slug, user.token)
           toast.success(`${slug} Deleted`)
           loadSubs()
        }
    }

    const searchResult = (keyword) => (data) => data.name.toLowerCase().includes(keyword)


    return (
        <div className="container">
            <h1>Create Sub Category</h1>
            <div className="form-group">
                <select className="form-control" onChange={e => setCategory(e.target.value)}>
                    <option>Please Select</option>
                    {categories.map(c => (
                        <option key={c._id} value={c._id}> {c.name} </option>
                    ))}
                </select>
            </div>
            <form onSubmit={submitHandler} className="mb-5">
                <h4>Name</h4>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" autoFocus required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <br />
                <button type="submit" className="btn btn-outline-success" disabled={!category || !name}>Save</button>
            </form>
            <div className="form-group">
            <input type="search" className="form-control mb-5" placeholder="Search" value={keyword} onChange={e => setKeyword(e.target.value.toLowerCase())} />
            </div>
            {subs.filter(searchResult(keyword)).map(s => (
                <div className="alert alert-secondary">
                    {s.name}
                    <span onClick={() => handleRemove(s.slug)} className="btn btn-sm btn-outline-danger float-right">Delete</span>
                    <Link to={`/admin/sub/${s.slug}`}><span className="btn btn-sm btn-outline-primary float-right">Edit</span></Link>
                </div>
            ))}
        </div>
    )
}

export default SubCreate
