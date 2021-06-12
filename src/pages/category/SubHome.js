import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategory } from '../../actions/category'
import Laptop from '../admin/product/laptop.png'
import StarRating from 'react-star-ratings'
import { getSub } from '../../actions/sub'

const SubHome = ({ match }) => {

    const [sub, setSub] = useState({})
    const [products, setProducts] = useState([])

    useEffect(() => {
        loadSubAndProducts()
    }, [])

    const loadSubAndProducts = async () => {
        const { data } = await getSub(match.params.slug)
        setSub(data.sub)
        setProducts(data.products)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col p-0 jumbotron text-center">
                    <h1 className="pt-3">{products.length} Products in "{sub && sub.name}" category</h1>
                </div>
            </div>
            <div className="row">
                {products.length && products.map(p => (
                    <div className="col-md-4 text-center">
                        {p && p.ratings && p.ratings.length ? <StarRating starRatedColor="red" starDimension="20px" rating={p.ratings.reduce((acc, item) => acc + item.star, 0) / p.ratings.length} /> : "No Rating Yet"}
                        <img src={Laptop} className="img-fluid" />
                        <p className="lead"> {p.title} </p>
                        <Link to={`/product/${p.slug}`} className="btn btn-sm btn-outline-danger float-left">View Product</Link>
                        <Link className="btn btn-sm btn-outline-primary float-right">Add To Cart</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubHome
