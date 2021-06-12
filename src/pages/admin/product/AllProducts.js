// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { getAllProductsByCount, removeProductByAdmin } from '../../../actions/product'
// import AdminNav from '../../../components/nav/AdminNav'
// import laptop from './laptop.png'

// const AllProducts = () => {
//     const [products, setProducts] = useState([])
//     const [loading, setLoading] = useState(false)

//     const user = useSelector(state => state.user)

//     useEffect(() => {
//         loadProducts()
//     }, [])

//     const loadProducts = async () => {
//         try {
//             console.log(user)
//             setLoading(true)
//             const { data } = await getAllProductsByCount(10)
//             console.log(data)
//             setProducts(data)
//             setLoading(false)
//         } catch (err) {
//             setLoading(false)
//             toast.error(err.response.data.msg)
//         }
//     }

//     const removeProduct = async (slug) => {
//         if (window.confirm('Deleted?')) {
//             const { data } = await removeProductByAdmin(slug, user.token)
//             toast.success(`${data.title} has been deleted successfully`)
//             loadProducts()
//         } 
//     }

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-2">
//                     <AdminNav />
//                 </div>
//                 <div className="col-md-10">
//                     <div className="row">
//                         {products.map(p => (
//                             <div className="col-md-4 text-center">
//                                 <div className="card card-body">
//                                     <img src={laptop} alt="image" />
//                                     <h5> {p.title} </h5>
//                                     <p> {p.description.substring(0, 30)}... </p>
//                                 <Link to={`/admin/product/${p.slug}`} className="btn btn-primary mb-2">Edit</Link>
//                                 <button onClick={() => removeProduct(p.slug)} className="btn btn-danger">Delete</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AllProducts

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllProducts } from '../../../actions/product'
import AdminNav from '../../../components/nav/AdminNav'
import laptop from './laptop.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import Laptop from './laptop.png'

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(2)
    const [loading, setLoading] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [endMessage, setEndMessage] = useState('')

    const user = useSelector(state => state.user)

    useEffect(() => {
        loadProducts()
    }, [count])

    const loadProducts = async () => {
        setLoading(true)
        console.log('2')
        const { data } = await axios.get(`/api/products?count=${count}`)
        setProducts(data)
        setLoading(false)
        console.log('3')
        const res = await axios.get('/api/all')
        setAllProduct(res.data)
        
    }

    const fetchMoreProducts = async () => {
        // setLoading(true)
        const extraCount = count + 2
        if (extraCount > allProduct.length) {
            setLoading(false)
            setEndMessage('Yeah Thats all we have')
            return
        }
        console.log('fetchProduct runs')
        setCount(extraCount)
        console.log(extraCount)
        // setLoading(false)
        loadProducts()
        console.log('1')
        // const { data } = await axios.get(`/api/products?count=${extraCount}`)
        // setProducts(data)
        // setLoading(false)
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-8">
                    <div className="row justify-content-center text-center">
                        <InfiniteScroll
                        dataLength={products.length}
                         next={fetchMoreProducts}
                         hasMore={true}
                        >
                            {products && products.length && products.map(p => (
                                <div key={p._id} className="col-12">
                                    <img src={Laptop} className="img-fluid" />
                                    <h1> {p.title} </h1>
                                    <h3> {p.description} </h3>
                                    <h4> ${p.price} </h4>
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
                <div className="col-12 text-center">
                {loading && <h1 className="text-danger">Loading...</h1>}
                {endMessage && <h3 className="text-success text-center"> {endMessage} </h3>}
                </div>
            </div>
        </div>
    )
}

export default AllProducts

