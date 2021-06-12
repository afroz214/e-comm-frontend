import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCategory, getCategories, removeCategory } from '../../../actions/category'

const CreateCategory = () => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState('')

    const user = useSelector(state => state.user)

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = async () => {
        const { data } = await getCategories()
        setCategories(data)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await createCategory({name}, user.token)
            toast.success(`${data.name} is created`)
            setName('')
            loadCategory()
        } catch (err) {
            console.log(err.response)
            toast.error(err.response.data.msg)
        }
    }

    const handleRemove = async (slug) => {
        if (window.confirm('Are you sure?')) {
           await removeCategory(slug, user.token)
           toast.success(`${slug} Deleted`)
           loadCategory()
        }
    }    

    const searchResult = (keyword) => (data) => {
        return data.name.toLowerCase().includes(keyword)
    }


    return (
        <div className="container">
            <h1>Create Category</h1>
            <form onSubmit={submitHandler} className="mb-5">
                <h4>Name</h4>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" autoFocus required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <br />
                <button type="submit" className="btn btn-outline-success">Save</button>
            </form>
            <div className="form-group">
            <input type="search" className="form-control mb-5" placeholder="Search" value={keyword} onChange={e => setKeyword(e.target.value.toLowerCase())} />
            </div>
            {categories.filter(searchResult(keyword)).map(c => (
                <div className="alert alert-secondary">
                    {c.name}
                    <span onClick={() => handleRemove(c.slug)} className="btn btn-sm btn-outline-danger float-right">Delete</span>
                    <Link to={`/admin/category/${c.slug}`}><span className="btn btn-sm btn-outline-primary float-right">Edit</span></Link>
                </div>
            ))}
        </div>
    )
}

export default CreateCategory
