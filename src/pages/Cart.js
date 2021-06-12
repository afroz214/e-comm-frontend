import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Laptop from './admin/product/laptop.png'
import ReactModal from 'react-modal-image'
import { userCart } from '../actions/auth'
import { Link } from 'react-router-dom'

const Cart = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user)

    const getTotal = () => {
        const totalValue = cart.reduce((acc, item) => acc + (item.price * item.count), 0)
        return totalValue
    }

    const dispatch = useDispatch()

    const removeFromCart = (productId) => {
        const findProduct = cart.findIndex(p => p._id == productId)
        const leftItems = cart.filter(p => p._id !== productId.toString())
        cart.splice(findProduct, 1)
        localStorage.setItem('cart', JSON.stringify(leftItems))
        dispatch({
            type: 'ADD_TO_CART',
            payload: leftItems
        })
    }

    const saveCartToDb = async () => {
        const { data } = await userCart(cart, user.token)
        if (data.ok) history.push('/checkout')
    } 

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {cart.length > 0 ? 
                    <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(p => (
                            <tr key={p._id}>
                                <td style={{width: "100px", height: "auto"}}>
                                    <ReactModal small={Laptop} large={Laptop} />
                                </td>
                                <td> {p.title} </td>
                                <td> {p.price} </td>
                                <td> {p.brand} </td>
                                <td> {p.color} </td>
                                <td> <select value={p.count} onChange={(e) => {
                                    let cart = []
                                    if (typeof window !== undefined) {
                                        if (localStorage.getItem('cart')) {
                                            cart = JSON.parse(localStorage.getItem('cart'))
                                        }
                                    cart.map((item, index) => {
                                        if (item._id == p._id) {
                                            cart[index].count = Number(e.target.value)
                                        }
                                    })
                                    localStorage.setItem('cart', JSON.stringify(cart))
                                    dispatch({
                                        type: 'ADD_TO_CART',
                                        payload: cart
                                    })}
                                }} className="form-control" >
                                           {[...Array(p.quantity).keys()].map(x => (
                                               <option key={x+1} value={x+1}> {x+1} </option>
                                           ))}
                                       </select> </td>
                                <td> {p.shipping === 'Yes' ? "Yes" : "No"} </td>
                                <td onClick={() => removeFromCart(p._id)} className="btn btn-sm btn-danger">Remove</td>
                            </tr>
                        ))}
                    </tbody>
                   </table>
                    : <></>}
                </div>
                <div className="col-md-4">
                    <h3>Order Summary</h3>
                    <hr />
                    <h4>Products</h4>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p> {c.title} * {c.count} = ${c.price * c.count} </p>
                        </div>
                    ))}
                    <hr />
                    <h5>Total: ${getTotal()}</h5>
                    <hr />
                    {user ? <button onClick={saveCartToDb} className="btn btn-outline-success">Proceed To Checkout</button> : <Link to="/login" className="btn btn-outline-primary">Login to Checkout</Link>}
                </div>
            </div>
        </div>
    )
}

export default Cart
