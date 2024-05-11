import React from 'react'
import './Projects.css'
// import img from './res/html-5.png'

export default function Projects(props) {
    function getTag(tag) {
        return (
            <div className="tag">{tag}</div>
        )
    }

    return (
        <div className='card-body project'>
            <div>
                <img src="/images/html-5.png" className='thumbnail'/>
            </div>
            <div className='data'>
                <h2 className='proj_title'>
                    {props.title}
                </h2>
                <div className='tags'>{props.tags.map(getTag)}</div>
                <div className="details">
                    {props.details}
                </div>
            </div>
        </div>
    )
}