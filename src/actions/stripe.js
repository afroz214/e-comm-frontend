import axios from 'axios'

export const createPaymentIntent = async (token) => {
    const config = {
        headers: {
            token
        }
    }
    console.log('token', token)
    return await axios.post('/api/create-payment-stripe', {}, config)
}