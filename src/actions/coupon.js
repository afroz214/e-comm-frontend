import axios from 'axios'
import { toast } from 'react-toastify'

export const createCoupon = async (datas, token) => {
    try {
        const config = {
            headers: {
                token
            }
        }
        return await axios.post('/api/coupon', datas, config)
    } catch (err) {
        toast.error(err.response.data.msg)
    }
}

export const getCoupons = async (token) => {
    try {
        const config = {
            headers: {
                token
            }
        }
        return await axios.get('/api/coupon', config)
    } catch (err) {
        toast.error(err.response.data.msg)
    }
}

export const removeCoupon = async (couponId, token) => {
    try {
        const config = {
            headers: {
                token
            }
        }
        return await axios.delete(`/api/coupon/${couponId}`, config)
    } catch (err) {
        toast.error(err.response.data.msg)
    }
}

export const applyCoupon = async (token, coupon) => {
    try {
        const config = {
            headers: {
                token
            }
        }
        return await axios.post('/api/auth/user/coupon', coupon, config)
    } catch (err) {
        console.log(err.response.data.msg)
    }
}