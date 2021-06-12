import React from 'react'
import TypeWriter from 'typewriter-effect'
import BestSeller from '../components/home/BestSeller'
import NewArrival from '../components/home/NewArrival'

const Home = () => {

    return (
        <div className="container">
            <div className="text-danger h1 text-center pt-3" style={{height: '100px', background: 'grey'}}>
                <TypeWriter options={{
                    strings: ['New Arrival', 'Best Seller'],
                    autoStart: true,
                    loop: true
                }} />
            </div>
            <h4 className="display-4 p-4 my-5 text-center">New Arrivals</h4>
            <NewArrival />
            <h4 className="display-4 p-4 my-5 text-center">Best Seller</h4>
            <BestSeller />
        </div>
    )
}

export default Home
