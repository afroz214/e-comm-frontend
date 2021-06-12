import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// import { getCategories, getCategorySubs } from '../../../actions/category'
import { createProduct, getProduct, updateProduct } from '../../../actions/product'
import AdminNav from '../../../components/nav/AdminNav'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { getCategories, getCategorySubs } from '../../../actions/category'

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: "",
    shipping: "",
    quantity: "",
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
  }

const ProductUpdate = ({ match, history }) => {

    const [values, setValues] = useState(initialState)
    const [categories, setCategories] = useState([])
    const [subOptions, setSubOptions] = useState([])


    const { title, description, price, category, shipping, quantity, image, colors, color, brand, brands, subs } = values

    const user = useSelector(state => state.user)

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = async () => {
        const { data } = await getProduct(match.params.slug)
        setValues({...values, ...data})
    }
    const loadCategories = async () => {
        const { data } = await getCategories()
        setCategories(data)
    }
    

    const handleCategoryChange = async (e) => {
        e.preventDefault()
           setValues({...values, subs: '', category: e.target.value})
           const { data } = await getCategorySubs(e.target.value)
           setSubOptions(data)
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    // const fileUploadAndResize = async (e) => {
    //     const file = e.target.files[0]
    //     previewFile(file)
    //         const config = {
    //             headers: {
    //                 token: user ? user.token : ""
    //             }
    //         }
    //         const { data } = await axios.post('/api/uploadimage', { image: file }, config)
    //         console.log(data)

    //     // if (files) {
    //     //     Resizer.imageFileResizer(files, 720, 720, "JPEG", 100, 0, async (url) => {
    //     //         console.log(url)
    //     //         setShowString(url)
    //     //         try {
    //     //             const config = {
    //     //                 headers : {
    //     //                     token: user ? user.token : ""
    //     //                 }
    //     //             }
    //     //            const res = await axios.post('/api/uploadimage', { image: url }, config)
    //     //            console.log('Front')
    //     //            console.log(res)
    //     //            setValues({...values, image: res.data})
    //     //         } catch (error) {
    //     //             console.log(error)
    //     //         }
    //     //     }, "base64")
    //     // }
    // }

    // const previewFile = (file) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result)
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await updateProduct(match.params.slug, values, user.token)
        toast.success(`${data.title} has been updated successfully`)
        history.push('/admin/products')
        // try {
        //     const { data } = await createProduct(values, user.token)
        //     console.log(data)
        //     toast.success(`${data.title} has been created`)
        // } catch (err) {
        //     toast.error(err.response.data.msg)
        // }
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
                            <select name="shipping" onChange={handleChange} className="form-control" value={shipping === "Yes" ? "Yes" : "No"}>
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
                            <select value={color} name="color" onChange={handleChange} className="form-control">
                                <option>Please Select</option>
                                {colors.map(c => (
                                    <option key={c} value={c}> {c} </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Brand</label>
                            <select value={brand} name="brand" onChange={handleChange} className="form-control">
                                <option>Please Select</option>
                                {brands.map(b => (
                                    <option key={b} value={b}> {b} </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" onChange={handleCategoryChange} className="form-control">
                                <option value={category._id}> {category ? category.name : ''} </option>
                                {categories.map(c => (
                                    <option key={c._id} value={c._id}> {c.name} </option>
                                ))}
                            </select>
                        </div>
                        { (
                            <div className="form-group">
                            <label>Sub Category</label>
                            <select name="subs" className="form-control" onChange={handleChange}>
                                {subOptions.map(s => (
                                   <>
                                   <option key={s._id} value={s._id}> {s.name} </option>
                                   </>
                                ))}
                            </select>
                        </div>
                        )} 
                        <button type="submit" className="btn btn-block btn-outline-success" disabled={!title || !description || !price || !quantity}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
