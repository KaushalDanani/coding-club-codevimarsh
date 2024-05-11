import React from 'react'
import { Link } from 'react-router-dom'
import "./RecentHeading.css"
import RecentTasksPanel from './RecentTasksPanel.js'

function NewTasks(props) {
  return (
    <div>
        {/* <RecentHeading heading="Test your Coding Skills" link={`/contest/?userID=${props.userID}`}/> */}
        <div className='recentHeading'>
        <h1>Test your Coding Skills</h1>
          <Link to={`/contest/?userID=${props.userID}`}>
            <button className='recentHeadingButton'>View More</button>
          </Link>
        </div>

        <RecentTasksPanel contests={props.contests}/>
    </div>
  )
}

export default NewTasks