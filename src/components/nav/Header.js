import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../search/Search'

const { SubMenu, Item } = Menu

const Header = () => {

    const [current, setCurrent] = useState('home')

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const history = useHistory()

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logoutHandler = () => {
        firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        history.push('/login')
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home">
                {user && user.role === 'subscriber' ? <Link to="/user/history">
                Home
                </Link> : <Link to="/admin/dashboard">
                Home
                </Link>}
            </Item>
            <Item key="shop">
                <Link to="/shop">Shop</Link>
            </Item>
            <Item key="cart">
                <Link to="/cart">Cart<span className="badge badge-danger mx-1"> {cart.length} </span> </Link>
            </Item>
            {!user && (
                <>
                <Item key="login" className="float-right">
                <Link to="/login">
                Login
                </Link>
                </Item>
                <Item key="register" className="float-right">
                    <Link to="/register">
                    Register
                    </Link>
                </Item>
                </>
            ) }
            {user && (
                <SubMenu title={`${user.email.split('@')[0]}`} className="float-right">
                {user && user.role === 'subscriber' ? <Item><Link to="/user/history">Dashboard</Link></Item> : <Item><Link to="/admin/dashboard">Dashboard</Link></Item>}
                {/* <Item key="setting2">Option 2</Item> */}
                <Item onClick={logoutHandler}>Logout</Item>
                </SubMenu>
            )}
            <Search />
            
        </Menu>
    )
}

export default Header
