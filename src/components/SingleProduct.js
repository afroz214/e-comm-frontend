import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProduct, leaveRating } from '../actions/product'
import Laptop from '../pages/admin/product/laptop.png'
import { Tabs } from 'antd'
import StarRating from 'react-star-ratings'
import { Modal } from 'antd'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import RatingModal from './RatingModal'

const SingleProduct = ({ product, onStarClick, star, productRating, handleAddToCart }) => {

    const { TabPane } = Tabs

    const { category, subs } = product

    return (
        <div className="">
            <div className="row">
                <div className="col-md-6">
                    <img src={Laptop} className="img-fluid" />
                    <Tabs type="card">
                        <TabPane tab="Description" key="1" className="lead"><strong> {product.description}</strong> </TabPane>
                        <TabPane tab="More" key="2" className="lead"><strong> Call us at xxxx xxx xxx for more information about this product </strong></TabPane>
                    </Tabs>
                </div>
                <div className="col-md-6">
                    {/* <div className="">
                        <StarRating
                        name={product._id}
                        numberOfStars={5}
                        starRatedColor="red"
                        rating={2}
                        changeRating={(newRating, name) => console.log(newRating, name)}
                         />
                    </div> */}
                    <h1> {product.title} </h1>
                    {product && product.ratings && product.ratings.length ? <div className="text-center mb-4"> <span> <StarRating starDimension="20px" starSpacing="2px" starRatedColor="red" rating={productRating()} /> </span><strong> ( {productRating()} )</strong> </div> : <h4>No Rating Yet</h4>}
                    <ul className="list-group" key={product._id}>
                        <li className="list-group-item">
                            <span>Price</span>
                            <span className="float-right"> ${product.price} </span>
                        </li>
                        <li className="list-group-item">
                            <span>Category</span>
                            <Link to={`/category/${category && category.slug}`} className="float-right"> {product.category && product.category.name} </Link>
                        </li>
                        <li className="list-group-item">
                            <span>Sub Category</span>
                            <span className="float-right"> {product.subs && product.subs.name} </span>
                        </li>
                        <li className="list-group-item">
                            <span>Shipping</span>
                            <span className="float-right"> {product.shipping} </span>
                        </li>
                        <li className="list-group-item">
                            <span>Color</span>
                            <span className="float-right"> {product.color} </span>
                        </li>
                        <li className="list-group-item">
                            <span>Brand</span>
                            <span className="float-right"> {product.brand} </span>
                        </li>
                        <li className="list-group-item">
                            <span>Available Stock</span>
                            <span className="float-right"> {product.quantity} </span>
                        </li>
                        <li className="list-group-item">
                            <span>Sold</span>
                            <span className="float-right"> {product.sold} </span>
                        </li>
                    </ul>
                    <button onClick={handleAddToCart} className="btn btn-danger">Add To Cart</button>
                    <button className="btn btn-warning add-wishlist">Add To Wishlist</button>
                    <RatingModal>
                    <StarRating
                        name={product._id}
                        numberOfStars={5}
                        starRatedColor="red"
                        rating={star}
                        isSelectable={true}
                        changeRating={onStarClick}
                         /> 
                    </RatingModal>
                    {/* <Modal
                    className="text-center"
                    title="Leave Your Rating"
                    centered
                    visible={visibility}
                    onOk={() => setVisibility(false)}
                    onCancel={() => setVisibility(false)}
                    >
                       
                    </Modal> */}
                    
                    
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
