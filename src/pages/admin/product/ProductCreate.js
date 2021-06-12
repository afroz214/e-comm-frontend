import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCategories, getCategorySubs } from '../../../actions/category'
import { createProduct } from '../../../actions/product'
import AdminNav from '../../../components/nav/AdminNav'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: "",
    shipping: "",
    quantity: "",
    image: "",
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
  }

const ProductCreate = () => {

    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [showSubCategory, setShowSubCategory] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fileInput, setFileInput] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [preveiwSource, setPreviewSource] = useState('')

    const { title, description, price, categories, category, shipping, quantity, image, colors, color, brand, brands, subs } = values

    const user = useSelector(state => state.user)

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        const { data } = await getCategories()
        setValues({...values, categories: data})
    }

    const handleCategoryChange = async (e) => {
        try {
            console.log(e.target.value)
            setValues({...values, subs: '', category: e.target.value})
           const { data } = await getCategorySubs(e.target.value)
           setSubOptions(data)
           setShowSubCategory(true)
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const fileUploadAndResize = async (e) => {
        const file = e.target.files[0]
        previewFile(file)
            const config = {
                headers: {
                    token: user ? user.token : ""
                }
            }
            const { data } = await axios.post('/api/uploadimage', { image: file }, config)
            console.log(data)

        // if (files) {
        //     Resizer.imageFileResizer(files, 720, 720, "JPEG", 100, 0, async (url) => {
        //         console.log(url)
        //         setShowString(url)
        //         try {
        //             const config = {
        //                 headers : {
        //                     token: user ? user.token : ""
        //                 }
        //             }
        //            const res = await axios.post('/api/uploadimage', { image: url }, config)
        //            console.log('Front')
        //            console.log(res)
        //            setValues({...values, image: res.data})
        //         } catch (error) {
        //             console.log(error)
        //         }
        //     }, "base64")
        // }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await createProduct(values, user.token)
            console.log(data)
            toast.success(`${data.title} has been created`)
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    return (
        <div className="container-fluid pb-5 mb-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {JSON.stringify(values)}
                    <h2>Product Create</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input name="title" type="text" className="form-control" value={title} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input name="description" type="text" className="form-control" value={description} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input name="price" type="number" className="form-control" value={price} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Shipping</label>
                            <select name="shipping" onChange={handleChange} className="form-control">
                                <option>Please Select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input name="quantity" type="number" className="form-control" value={quantity} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <select name="color" onChange={handleChange} className="form-control">
                                <option>Please Select</option>
                                {colors.map(c => (
                                    <option key={c} value={c}> {c} </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Brand</label>
                            <select name="brand" onChange={handleChange} className="form-control">
                                <option>Please Select</option>
                                {brands.map(b => (
                                    <option key={b} value={b}> {b} </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" onChange={handleCategoryChange} className="form-control">
                                <option>Please Select</option>
                                {categories.map(c => (
                                    <option key={c._id} value={c._id}> {c.name} </option>
                                ))}
                            </select>
                        </div>
                        {showSubCategory && (
                            <div className="form-group">
                            <label>Sub Category</label>
                            <select name="subs" className="form-control" onChange={handleChange}>
                                <option>Please Select</option>
                                {subOptions.map(s => (
                                   <option key={s._id} value={s._id}> {s.name} </option>
                                ))}
                            </select>
                        </div>
                        )} 
                        {/* <div className="form-group">
                            <label className="btn btn-primary">Choose file
                                <input type="file" className="form-control" hidden onChange={fileUploadAndResize} />
                            </label>
                        </div> */}
                        <button type="submit" className="btn btn-block btn-outline-success" disabled={!title || !description || !price || !quantity}>Save</button>
                    </form>
                    {preveiwSource && (
                        <img src={preveiwSource} alt="image" style={{ height: '300px' }} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCreate
