import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createPaymentIntent } from '../actions/stripe'

const StripeCheckout = () => {

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disable, setDisable] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [discountPrices, setDiscountPrices] = useState(0)
    const [priceOff, setPriceOff] = useState(0)
    const [percentageDiscount, setPercentageDiscount] = useState(0)

    const stripe = useStripe()

    const elements = useElements()

    const user = useSelector(state => state.user)

    const coupon = useSelector(state => state.coupon)
    const { cartTotalPrice, discountPrice, offPrice, discount } = coupon

    useEffect(() => {
        loadClientSecret()
        setTotalPrice(cartTotalPrice)
        setDiscountPrices(discountPrice)
        setPriceOff(offPrice)
        setPercentageDiscount(discount)
    }, [])

    const loadClientSecret = async () => {
        const {data} = await createPaymentIntent(user.token)
        console.log('ClientSecret', data)
        setClientSecret(data.clientSecret)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);
  
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: e.target.name.value,
          },
        },
      });
  
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        // here you get result after successful payment
        // create order and save in database for admin to process
        // empty user cart from redux store and local storage
        console.log(JSON.stringify(payload, null, 4));
        setError(null);
        setProcessing(false);
        setSucceeded(true);
      }
    }
    
      const handleChange = async (e) => {
        // listen for changes in the card element
        // and display any errors as the custoemr types their card details
        setDisable(e.empty); // disable pay button if errors
        setError(e.error ? e.error.message : ""); // show error message
      }
    
      const cardStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };
    
      return (
        <>
        {/* <p> {totalPrice} </p>
        <p> {discountPrices} </p>
        <p> {priceOff} </p> */}
         <div className="row">
          <div className="col-12"> 
            {priceOff > 0 ? (
              <>
              <div className="alert alert-danger">
              <h3> Flat {percentageDiscount}% Off </h3>
            </div>
          <div className="col-md-4">
            <div className="alert alert-danger">TotalPrice: {totalPrice} </div>
          </div>
          <div className="col-md-4">
            <div className="alert alert-primary">Price Off: {priceOff} </div>
          </div>
          <div className="col-md-4">
            <div className="alert alert-success">Payable Price: {discountPrices} </div>
            </div>
            </>
            ) : <p className="lead alert alert-danger"><strong> No Coupon Applied</strong></p>}
          </div>
        </div>

        
        <p className={succeeded ? 'alert alert-success' : 'hidden'}>Payment Successful</p>
          <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
            <button
              className="stripe-button"
              disabled={processing || disable || succeeded}
            >
              <span id="button-text">
                {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
              </span>
            </button>
            <br />
            {error && <div className="card-error" role="alert"> {error} </div>}
          </form>
        </>
      );
}

export default StripeCheckout
