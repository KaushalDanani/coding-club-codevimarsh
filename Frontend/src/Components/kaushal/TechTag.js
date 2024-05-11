import React from 'react';
import './TechTag.css';

export default function TechTag(props){

    return(
        <span className='techtag'>{props.tagname}</span>
    )

}