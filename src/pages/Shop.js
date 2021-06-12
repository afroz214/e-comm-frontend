import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, getSearchResult } from '../actions/product'
import Laptop from '../pages/admin/product/laptop.png'
import StarRating from 'react-star-ratings'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Slider, Checkbox } from 'antd'
import { getCategories } from '../actions/category'
import { getSubs } from '../actions/sub'

const { SubMenu } = Menu

const Shop = () => {
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(0)
    const [ok, setOK] = useState(false)
    const [categories, setCategories] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [allSubs, setAllSubs] = useState([])
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"])
    const [brand, setBrand] = useState('')
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"])
    const [color, setColor] = useState('')
    const [shippings, setShippings] = useState(['Yes', 'No'])
    const [theShipping, setTheShipping] = useState('')

    const search = useSelector(state => state.search)
    const { text } = search

    const dispatch = useDispatch()

    useEffect(() => {
        // loadProducts()
        loadCategories()
        loadSubs()
    }, [])

    const loadProducts = async () => {
        const { data } = await getAllProducts()
        setProducts(data)
    }

    const loadCategories = async () => {
        const { data } = await getCategories()
        setCategories(data)
    }

    const loadSubs = async () => {
        const { data } = await getSubs()
        setAllSubs(data)
    }

    useEffect(() => {
        if (!text) {
            loadProducts()
        } else {
            const delayed = setTimeout(() => {
                loadSearchProducts({ query: text })
            }, 500)
            return () => clearTimeout(delayed)
        }
    }, [text])

    const loadSearchProducts = async (arg) => {
        const { data } = await getSearchResult(arg)
        setProducts(data)
    }

    useEffect(() => {
        loadSearchProducts({ price })
    }, [ok])

    const handlePrice = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        })
        setCategoryIds([])
        setPrice(e.target.value)
        setTimeout(() => {
            setOK(!ok)
        }, 500)
    }

    const handleCheck = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        })
        setPrice(0)
        const initialState = [...categoryIds]
        const justChecked = e.target.value
        const foundIndex = initialState.indexOf(justChecked)
        console.log(foundIndex)
        if (foundIndex === -1) {
            initialState.push(justChecked)
        } else {
            initialState.splice(foundIndex, 1)
            if (initialState.length === 0) {
                loadProducts()
            }
        }
        setCategoryIds(initialState)
        return loadSearchProducts({ category: initialState })
    }


    const handleSub = (sub) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        })
        setCategoryIds([])
        setPrice(0)
        setTheShipping('')
        setBrand('')
        setColor('')
        return loadSearchProducts({ sub })
    }

    const handleBrand = (e) => {
        setTheShipping('')
        setColor('')
        setBrand(e.target.value)
        return loadSearchProducts({ brand: e.target.value })
    }

    const handleColor = (e) => {
        setTheShipping('')
        setBrand('')
        setColor(e.target.value)
        return loadSearchProducts({ color: e.target.value })
    }

    const handleShipping = async (e) => {
        setBrand('')
        setColor('')
        setTheShipping(e.target.value)
        return loadSearchProducts({ shipping: e.target.value })
    }

    return (
        <div className="container-fluid py-5">
           <div className="row">
               <div className="col-md-3">
                   Search/Filters
                   <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6"]} mode="inline">
                       <SubMenu title="Price" key="1">
                           <div className="text-center">
                              <div className="mb-3">
                                  ${price}
                              </div>
                       <input min="0" max="2500" step="100" type="range" className="form-range" value={price} onChange={handlePrice} />
                       </div>
                       </SubMenu>

                       <br />
                       
                       <SubMenu title="Category" key="2">
                           <div className="text-center">
                              {categories && categories.length && categories.map(c => (
                                  <div className="form-check py-3" key={c._id}>
                                      <input type="checkbox" className="form-check-input" value={c._id} onChange={handleCheck} checked={categoryIds.includes(c._id)} />
                                      <label className="form-check-label"> {c.name} </label>
                                </div>
                              ))}
                       </div>
                       </SubMenu>

                       <SubMenu title="Sub Category" key="3">
                           <div className="text-center">
                              {allSubs && allSubs.length && allSubs.map(s => (
                                  <button key={s._id} className="btn btn-secondary mx-3 my-3" onClick={() => handleSub(s._id)}> {s.name} </button>
                              ))}
                       </div>
                       </SubMenu>

                       <SubMenu title="Brands" key="4">
                           <div className="text-center">
                              {brands.map(b => (
                                  <div key={b} className="px-3 pb-2 my-3">
                                  <input type="radio" className="mx-2" value={b} onChange={handleBrand} checked={b === brand}  />
                                  <label> {b} </label>
                                  </div>
                              ))}
                       </div>
                       </SubMenu>

                       <SubMenu title="Color" key="5">
                           <div className="text-center">
                              {colors.map(c => (
                                  <div key={c} className="px-3 pb-2 my-3">
                                  <input type="radio" className="mx-2" value={c} onChange={handleColor} checked={c === color}  />
                                  <label> {c} </label>
                                  </div>
                              ))}
                       </div>
                       </SubMenu>

                       <SubMenu title="Shipping" key="6">
                           <div className="text-center">
                              {shippings.map(s => (
                                  <div key={s} className="px-3 pb-2 my-3">
                                  <input type="checkbox" className="mx-2" value={s} onChange={handleShipping} checked={s === theShipping}  />
                                  <label> {s} </label>
                                  </div>
                              ))}
                       </div>
                       </SubMenu>
                   </Menu>
               </div>
               <div className="col-md-9">
                   <h3>Products  </h3>
                 {products && products.length > 0 ? (
                     <div className="row">
                         {products.map(p => (
                             <div key={p._id} className="col-md-4 text-center">
                                 {p && p.ratings && p.ratings.length ? <StarRating starRatedColor="red" starDimension="20px" rating={p.ratings.reduce((acc, item) => acc + item.star, 0) / p.ratings.length} /> : <p>No Rating Yet</p>}
                                 <img src={Laptop} className="img-fluid" />
                                 <p className="lead"> {p.title} <strong>- ${p.price} </strong> </p>
                                 <Link to={`/product/${p.slug}`} className="btn btn-sm btn-outline-danger float-left">View product</Link>
                                 <Link className="btn btn-sm btn-outline-primary float-right">Add To Cart</Link>
                             </div>
                         ))}
                     </div>
                 ) : <h4>No Product Found</h4>}
               </div>
           </div>
        </div>
    )
}

export default Shop
