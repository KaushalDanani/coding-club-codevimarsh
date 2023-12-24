import React from 'react'
import RecentHeading from './RecentHeading'
import RecentTasksPanel from './RecentTasksPanel'

function NewTasks(props) {
  return (
    <div>
        <RecentHeading heading="Test your Coding Skills" link={`/contest/?userID=${props.userID}`}/>
        <RecentTasksPanel/>
    </div>
  )
}

export default NewTasks