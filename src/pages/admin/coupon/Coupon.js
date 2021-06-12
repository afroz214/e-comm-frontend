import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import ReactDatePicker from 'react-datepicker'
import { createCoupon, getCoupons, removeCoupon } from '../../../actions/coupon'
import { useSelector } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify'

const Coupon = () => {

    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState('')
    const [coupons, setCoupons] = useState([])

    const user = useSelector(state => state.user)

    // console.log(name, expiry, discount)

    const loadCoupons = async () => {
        const { data } = await getCoupons(user.token)
        setCoupons(data)
    }

    useEffect(() => {
        loadCoupons()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await createCoupon({ name, expiry, discount }, user.token)
        loadCoupons()
        setName('')
        setDiscount('')
        setExpiry('')
        toast.success(`${data.name} coupon has been created`)
    }

    const handleRemove = async (couponId) => {
        if (window.confirm('Delete?')) {
            const { data } = await removeCoupon(couponId, user.token)
            loadCoupons()
            toast.success(`Coupons "${data.name}" Deleted`)
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
            <div className="col-md-10">
                <h1>Coupon</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" className="form-control" placeholder="Name" value={name.toUpperCase()} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Discount</label>
                        <input type="text" className="form-control" placeholder="Discount" value={discount} onChange={e => setDiscount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Expiry</label>
                        <br />
                        <ReactDatePicker className="form-control" selected={expiry} onChange={(date) => setExpiry(date)} required />
                        <br />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
                <hr />
                <h3> {coupons.length} Coupons </h3>
                <table className="table table-bordered mb-5">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Expiry</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                   <tbody>
                       {coupons.map(c => (
                           <tr key={c._id}>
                               <td> {c.name} </td>
                               <td> {new Date(c.expiry).toLocaleDateString()} </td>
                               <td> {c.discount}% </td>
                               <td onClick={() => handleRemove(c._id)} className="btn btn-outline-danger btn-sm"> Delete </td>
                           </tr>
                       ))}
                   </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}

export default Coupon
