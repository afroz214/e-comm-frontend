import axios from 'axios'

export const getCurrentUser = async (token) => {
    try {
        const config = {
            headers: {
                token
            }
        }
        return await axios.get('/api/auth/current-user', config)
    } catch (error) {
        console.log('Current User Error')
    }
}

export const userCart = async (cart, token) => {
    try {
        const config = {
            headers: {
                token
            }
        }
        return await axios.post('/api/auth/cart', { cart }, config)
    } catch (err) {
        console.log(err.response.data.msg)
    }
}

export const getUserCart = async (token) => {
    try {
        const config = {
            headers: {
                token
            }
        }
        return await axios.get('/api/auth/cart', config)
    } catch (err) {
        console.log(err.response.data.msg)
    }
}

export const deleteUserCart = async (token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.delete('/api/auth/cart', config)
}

export const saveAddress = async (address, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.put('/api/auth/save-address', { address }, config)
}