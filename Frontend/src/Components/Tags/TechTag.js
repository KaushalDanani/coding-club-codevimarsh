import React from 'react';
import './TechTag.css';

function TechTag(props){

    return(
        <span className='techtag'>{props.tagname}</span>
    )
}

export default React.memo(TechTag);