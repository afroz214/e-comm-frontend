import React from 'react'
import '../stripe.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'

const promise = loadStripe('pk_test_51In72jSD6QJL1Hg8cWGcuh62n2jot7bl1QUpKS3kLrpDKmNBnVqgw3H6LirGgZWDf3rOJarJPNSuJu0o3P5kinuF001Z7nXY5X')

const Payment = () => {
    return (
        <div className="container text-center p-5">
            <h3>Compltete Your Purchase</h3>
            <Elements stripe={promise}>
                <div className="col-md-8 offset-md-2">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    )
}

export default Payment
