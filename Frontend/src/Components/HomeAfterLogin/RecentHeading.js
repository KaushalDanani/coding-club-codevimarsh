import React from 'react'
import "./RecentHeading.css"
import { Link } from 'react-router-dom'

function RecentHeading(props) {
  return (
    <div className='recentHeading'>
        <h1>{props.heading}</h1>
          <Link to={props.link}>
        <button className='recentHeadingButton'>
          View More
          </button>
          </Link>
    </div>
  )
}

export default RecentHeading