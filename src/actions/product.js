import axios from 'axios'


export const createProduct = async (product, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.post('/api/product', product, config)
}

export const getAllProductsByCount = async (count) => {
    return await axios.get(`/api/products/${count}`)
}

export const removeProductByAdmin = async (slug, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.delete(`/api/product/${slug}`, config)
}

export const getProduct = async (slug) => {
    return await axios.get(`/api/product/${slug}`)
}

export const updateProduct = async (slug, product, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.put(`/api/product/${slug}`, product, config)
}

export const getProducts = async (sort, order, page) => {
    return await axios.post(`/api/products`, { sort, order, page })
}

export const leaveRating = async (productId, star, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.put(`/api/reviews/${productId}`, { star }, config)
}

export const getRelated = async (productId) => {
    return await axios.get(`/api/product/related/${productId}`)
}

export const getSearchResult = async (arg) => {
    return await axios.post('/api/search/filters', arg)
}

export const getAllProducts = async () => {
    return await axios.get('/api/products')
}