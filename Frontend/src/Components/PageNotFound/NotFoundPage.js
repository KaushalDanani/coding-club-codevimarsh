import React from 'react'
import { Link } from 'react-router-dom';
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <div className="not-found-container">
        <div className="not-found-content">
            <div className='error-image'> </div>
            <img style={{mixBlendMode: 'hard-light'}} src='images/error_Img.png' alt='Image Not Found' loading="lazy" />
            <h1 className="not-found-title">404 - Page Not Found</h1>
            <p className="not-found-description">Oops! The page you are looking for does not exist.</p>
            <Link to="/"><button className='goHome'>Go back to the home page </button></Link>
        </div>
    </div>
  )
}

export default NotFoundPage