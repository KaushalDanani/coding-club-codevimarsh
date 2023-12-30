import React from 'react'
import { Link } from 'react-router-dom'
import "./AddContest.css"

function AddContest() {
  return (
    <>
        <Link to={'/contest'}>
        <div className='contestBackBtn'></div>
    </Link>
    </>
  )
}

export default AddContest