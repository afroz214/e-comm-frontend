import axios from 'axios'

export const createSub = async (datas, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.post('/api/sub', datas, config)
}

export const updateSub = async (slug, datas, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.put(`/api/sub/${slug}`, datas, config)
}

export const getSub = async (slug) => {
    return await axios.get(`/api/sub/${slug}`)
}

export const getSubs = async () => {
    return await axios.get(`/api/subs`)
}

export const removeSub = async (slug, token) => {
    const config = {
        headers: {
            token
        }
    }
    return await axios.delete(`/api/sub/${slug}`, config)
}