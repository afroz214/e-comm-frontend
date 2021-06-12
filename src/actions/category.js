import axios from 'axios'

export const createCategory = async (datas, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.post('/api/category', datas, config)
}

export const updateCategory = async (slug, datas, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.put(`/api/category/${slug}`, datas, config)
}

export const getCategory = async (slug) => {
    return await axios.get(`/api/category/${slug}`)
}

export const getCategories = async () => {
    return await axios.get(`/api/categories`)
}

export const removeCategory = async (slug, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.delete(`/api/category/${slug}`, config)
}

export const getCategorySubs = async (id) => {
    return await axios.get(`/api/category/subs/${id}`)
}