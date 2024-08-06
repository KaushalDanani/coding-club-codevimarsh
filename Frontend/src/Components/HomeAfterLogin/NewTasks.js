import React from 'react'
import { Link } from 'react-router-dom'
import "./RecentHeading.css"
import RecentTasksPanel from './RecentTasksPanel.js'

function NewTasks(props) {
  return (
    <div>
      {
        props.contests.length!=0?
        <>
        <div className='recentHeading'>
        <h1>Test your Coding Skills</h1>
          <Link to={`/contest/?userID=${props.userID}`}>
            <button className='recentHeadingButton'>View More</button>
          </Link>
        </div>

        <RecentTasksPanel contests={props.contests}/>
        </>
      :
      null}
      
    </div>
  )
}

export default NewTasks