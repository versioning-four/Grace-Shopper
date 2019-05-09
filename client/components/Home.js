import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-text-box">
          <h1 style={{ 'text-align': 'center' }}>
            Versioning Four - We're experts in our <strong>field...</strong>
          </h1>
        </div>
      </div>
      <div className="about-us">
        <h3>About Us</h3>
        <p>
          Founded in 1800, the Versioning Four family have been providing high
          quality farming products <br />
          and more to the farming community for more than two centuries.
          <br />
          <br />
          The company began in Missouri and made a name for itself amongst local
          farmers through providing <br />
          high end products in a timely manner. Customer satisfaction has always
          been our highest priority.
          <br />
          <br />
          As time has gone by and technology has improved we have branched out
          our business operations <br />
          and we are now dedicated to providing quality products and service to
          people in the farming <br />
          community throughout the US.
          <br />
          <br />
          We have the good stuff, please feel to browse our products.
        </p>
        <Link to="/products">
          <button type="button" className="standard-btn">
            Take a look at our goods
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
