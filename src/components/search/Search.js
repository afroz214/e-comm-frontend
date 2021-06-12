import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Search = () => {


    const dispatch = useDispatch()

    const search = useSelector(state => state.search)
    const { text } = search 

    const history = useHistory()

    const handleChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/shop?${text}`)
    }


    return (
        <form onSubmit={handleSubmit} className="form-inline my-5 justify-content-center">
            <input type="search" value={text} className="form-control" placeholder="Search" onChange={handleChange} />
            <button type="submit" disabled={!text.length} className="btn btn-sm btn-outline-success">Search</button>
        </form>
    )
}

export default Search
