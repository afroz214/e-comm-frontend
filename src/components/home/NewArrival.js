import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../actions/product'
import Laptop from '../../pages/admin/product/laptop.png'
import { Pagination } from 'antd'
import StarRating from 'react-star-ratings'
// import ReactPaginate from 'react-paginate'

const NewArrival = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [productCount, setProductCount] = useState(0)

    useEffect(() => {
        loadAllProducts()
        // getProductCount()
    }, [page])

    const loadAllProducts = async () => {
        setLoading(true)
        const { data } = await getProducts('createdAt', 'desc', page)
        console.log(data)
        setProducts(data.products)
        setProductCount(data.totalLength)
        setLoading(false)
    }

    // const getProductCount = async () => {
    //     const {data} = await axios.get('/api/products/pagination/total')
    //     setProductCount(data)
    // }

    return (
        <div className="container">
            <div className="row mt-5">
                {loading ? <h4>Loading...</h4> : products && products.length && products.map(p => (
                    <div className="col-md-4 text-center">
                        <StarRating starRatedColor="red" starDimension="20px" rating={p.ratings.length && p.ratings.reduce((acc, item) => acc + item.star, 0) / p.ratings.length} />
                        <div className="card card-body">
                            <img src={Laptop} />
                            <h5> {p.title} </h5>
                            <p> {p.description}... </p>
                            <Link to={`/product/${p.slug}`} className="btn btn-primary my-2">View</Link>
                            <button className="btn btn-danger">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col-md-6 mx-auto text-center p-5">
                    <Pagination
                     current={page}
                     total={(productCount / 3) * 10}
                     onChange={value => setPage(value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewArrival
