
import React, { useEffect } from 'react'
import Header from './components/nav/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import RegisterComplete from './pages/auth/RegisterComplete'
import { useDispatch } from 'react-redux'
import { auth } from './firebase'
import ForgotPassword from './pages/auth/ForgotPassword'
import { getCurrentUser } from './actions/auth'
import History from './pages/user/History'
import UserRoute from './components/routes/UserRoute'
import Password from './pages/user/Password'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateCategory from './pages/admin/category/CreateCategory'
import UpdateCategory from './pages/admin/category/UpdateCategory'
import SubCreate from './pages/admin/sub/SubCreate'
import SubUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/ProductUpdate'
import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import SubHome from './pages/category/SubHome'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Coupon from './pages/admin/coupon/Coupon'
import Payment from './pages/Payment'
import Test from './pages/Test'



const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const {token} = await user.getIdTokenResult()
        const { data } = await getCurrentUser(token)
        dispatch({
          type: 'USER_LOGGED_IN',
          payload: {
            _id: data._id,
            name: data.name,
            email: data.email,
            token,
            role: data.role
          }
        })
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <>
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Switch>
      {/* <Route path="/" exact component={Test} /> */}
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/register/complete" exact component={RegisterComplete} />
      <Route path="/forgot/password" exact component={ForgotPassword} />
      <UserRoute path="/user/history" exact component={History} />
      <UserRoute path="/user/password" exact component={Password} />
      <UserRoute path="/admin/dashboard" exact component={AdminDashboard} />
      <UserRoute path="/admin/product" exact component={CreateCategory} />
      <UserRoute path="/admin/category/:slug" exact component={UpdateCategory} />
      <UserRoute path="/admin/sub" exact component={SubCreate} />
      <UserRoute path="/admin/sub/:slug" exact component={SubUpdate} />
      <UserRoute path="/admin/category" exact component={ProductCreate} />
      <UserRoute path="/admin/products" exact component={AllProducts} />
      <UserRoute path="/admin/coupon" exact component={Coupon} />
      <UserRoute path="/admin/product/:slug" exact component={ProductUpdate} />
      <Route path="/product/:slug" exact component={Product} />
      <Route path="/category/:slug" exact component={CategoryHome} />
      <Route path="/sub/:slug" exact component={SubHome} />
      <Route path="/shop" exact component={Shop} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/checkout" exact component={Checkout} />
      <Route path="/payment" exact component={Payment} />
      </Switch>
    </BrowserRouter>
    </>
  )
}

export default App
