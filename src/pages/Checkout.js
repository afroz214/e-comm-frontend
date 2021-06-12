import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteUserCart, getUserCart, saveAddress } from '../actions/auth'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { applyCoupon } from '../actions/coupon'

const Checkout = ({ history }) => {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [saveAddressToDb, setSaveAddressToDb] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscountError] = useState('')

    const user = useSelector(state => state.user)
    const { token } = user
    const dispatch = useDispatch()

    const loadCartFromBackend = async () => {
        const {data} = await getUserCart(token)
        setProducts(data.products)
        setTotal(data.cartTotal)
    }

    useEffect(() => {
        loadCartFromBackend()
    }, [])

    const emptyCart = async () => {
            localStorage.removeItem('cart')
            dispatch({
                type: 'ADD_TO_CART',
                payload: []
            })
            const { data } = await deleteUserCart(token)
            if (data.ok) {
                setProducts([])
                setTotal(0)
                setCoupon('')
                setTotalAfterDiscount(0)
                toast.success('Cart has been empty "Continue Shopping"')
            }
    }

    const handleAddress = async () => {
        const { data } = await saveAddress(address, token)
        if (data.ok) {
            setSaveAddressToDb(true)
            toast.success(`${address} address has been saved`)
        }
    }

    const applyDiscountCoupon = async () => {
        try {
            const { data } = await applyCoupon(token, { coupon })
            let offPrice = data.cartTotal - data.totalAfterDiscount
            dispatch({
                type: 'COUPON_APPLIED',
                payload: { cartTotalPrice: data.cartTotal, discountPrice: data.totalAfterDiscount, offPrice, discount: data.discount, bools: true }
            })
            setTotalAfterDiscount(data.totalAfterDiscount)
        } catch (error) {
            setDiscountError('Invalid Coupon')
            setTotalAfterDiscount(0)
            dispatch({
                type: 'COUPON_APPLIED',
                payload: {}
            })
        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <h1>Delivery Address</h1>
                    {/* <ReactQuill theme="snow" value={address} onChange={setAddress} /> */}
                    <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Your Delivery Address" ></textarea>
                    <button onClick={handleAddress} className="btn btn-success mt-2">Save</button>
                    <div className="form-group mt-2">
                        <input className="form-control" type="text" value={coupon} onChange={e => {
                            setCoupon(e.target.value)
                            setDiscountError('')
                        }} />
                        <button disabled={products.length === 0} onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Apply</button>
                        { discountError && <div className="alert alert-danger"> {discountError} </div> }
                    </div>
                </div>
                <div className="col-md-6">
                    <h1>Order Summary</h1>
                    <hr />
                    <p>Products: {products.length} </p>
                    <hr />
                    {products.map(p => (
                        <p> {p.product.title} ({p.color}) x {p.count} = {p.count * p.product.price} </p>
                    ))}
                    <hr />
                    <p className="lead"><strong>CartTotal: ${total}</strong> </p>
                    { totalAfterDiscount > 0 && <p className="alert alert-success my-2">Discoun Applied Total: ${totalAfterDiscount} </p> }
                    <div className="row">
                        <div className="col-6">
                            <button onClick={() => history.push('/payment')} disabled={!saveAddressToDb || products.length === 0  || !address} className="btn btn-success">Place Order</button>
                        </div>
                        <div className="col-6">
                            <button onClick={emptyCart} className="btn btn-danger">Empty Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
