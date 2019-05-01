import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div>
                <h3>About Us</h3>
                <p> We have the good stuff, founded in 1800</p>
            </div>

            <Link to='/products'>
                <button type='button'>Take a look at our goods</button>
            </Link>
        </div>
    )
}

export default Home;
