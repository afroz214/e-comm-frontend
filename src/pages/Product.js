import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProduct, getRelated, leaveRating } from '../actions/product'
import Laptop from './admin/product/laptop.png'
import { Tabs } from 'antd'
import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import RatingModal from '../components/RatingModal'
import SingleProduct from '../components/SingleProduct'
import StarRating from 'react-star-ratings'
import { getCategories } from '../actions/category'
import { getSubs } from '../actions/sub'
import _ from 'lodash'

const Product = ({ match, history }) => {
    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0)
    const [related, setRelated] = useState([])
    const [categories, setCategories] = useState([])
    const [subs, setSubs] = useState([])

    const user = useSelector(state => state.user)

    const loadSingleProduct = async () => {
        const { data } = await getProduct(match.params.slug)
        setProduct(data)
        const res = await getRelated(data._id)
        setRelated(res.data)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        loadSingleProduct()
        loadCategories()
        loadSubs()
        // console.log(product && product.ratings && productRating())
    }, [match])

    useEffect(() => {
        if (product.ratings && user) {
            let existingRating = product.ratings.find(r => r.postedBy.toString() === user._id.toString())
            if (!existingRating) {
                setStar(0)
            } else {
                existingRating && setStar(existingRating.star)
            }
        }
    })

    const loadCategories = async () => {
        const { data } = await getCategories()
        setCategories(data)
    }

    const loadSubs = async () => {
        const { data } = await getSubs()
        setSubs(data)
    }

    const productRating = () => {
         if (product && product.ratings && product.ratings.length) {
            const result = product.ratings.reduce((acc, item) => acc + item.star, 0) / product.ratings.length
            return result
        }
    }

    // const handleChangeRating = (newRating, name) => {
    //     console.log(newRating, name)
    //     setStar(newRating)
    //     // await leaveRating(name, newRating, user.token)
    //     // toast.success('thanks for your review')
    // }
    const onStarClick = async (newRating, name) => {
        loadSingleProduct()
        console.log(newRating, name)
         setStar(newRating)
        await leaveRating(name, newRating, user.token)
         loadSingleProduct()
    }

    const handleAddToCart = () => {
        let cart = []
        if (typeof window !== undefined) {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                ...product,
                count: 1
            })
            let unique = _.uniqWith(cart, _.isEqual)
            localStorage.setItem('cart', JSON.stringify(unique))
            dispatch({
                type: 'ADD_TO_CART',
                payload: unique
            })
            history.push('/cart')
        }
    }

    return (
        <div className="container">
            <div className="row">
               <SingleProduct product={product} onStarClick={onStarClick} star={star} productRating={productRating} handleAddToCart={handleAddToCart} />
            </div>
            <div className="row my-5">
                <div className="col text-center">
                    <h3>Related Products</h3>
                </div>
            </div>
            <div className="row">
                {related.length ?
                related.map(r => (
                    <div className="col-md-4 text-center">
                        {r && r.ratings && r.ratings.length > 0 ? <StarRating rating={r.ratings.reduce((acc, item) => acc + item.star, 0)} starRatedColor="red" starDimension="20px" /> : <h6>No Rating Yet</h6>}
                        <img src={Laptop} className="img-fluid" />
                        <p className="lead"> {r.title} </p>
                        <p className="lead"> {r.description.substring(0, 5)}... </p>
                        <Link to={`/product/${r.slug}`} className="float-left btn btn-sm btn-danger">View Product</Link>
                        <a onClick={handleAddToCart} className="float-right btn btn-sm btn-danger">Add To Cart</a>
                    </div>
                ))

                 : <h5>No Related Products</h5>}
            </div>
            <div className="row my-4 text-center">
                <div className="col-12 my-4 text-center">
                    <h1>Categories</h1>
                </div>
                {categories.length ? (
                    categories.map(c => (
                        <div className="col" key={c._id}>
                            <Link to={`/category/${c.slug}`} className="btn btn-info"> {c.name} </Link>
                        </div>
                    ))
                ) : <h4>No Categories</h4>}
            </div>
            <div className="py-5">
            <div className="row my-4 text-center">
                <div className="col-12 my-4 text-center">
                    <h1>Sub Categories</h1>
                </div>
                {subs.length ? (
                    subs.map(s => (
                        <div className="col" key={s._id}>
                            <Link to={`/sub/${s.slug}`} className="btn btn-info"> {s.name} </Link>
                        </div>
                    ))
                ) : <h4>No subs</h4>}
            </div>
            </div>
        </div>
    )
}

export default Product
