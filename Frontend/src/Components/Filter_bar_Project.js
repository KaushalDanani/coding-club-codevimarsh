import React from 'react'
import { useState } from 'react';
import './Filter_bar.css'
import { addproject_open ,  } from './Innercomp/AddProject.js';
import { Link } from 'react-router-dom';

// import {question_open} from '../Question_answer/Ask_Question';
export default function Filter_bar() {

	const tagsArr = ['DSA', 'C', 'c#', 'C++'];

	function tagChecksgenerator() {
		function checkTag(tagname) {
			return (
				<div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
					<input type="checkbox" className="btn-check" id={"btncheck_"+tagname} />
					<label className="btn btn-outline-success tagbutton" for={"btncheck_"+tagname}>{tagname}</label>
				</div>

			)
		}

		return (tagsArr.map(checkTag))
	}

	const [changeImage, setChangeImage] = useState('true');

	return (
		<>
		<div className='filter navbar'>
			{/* <Ask_Question/> */}
			{/* <button className="borderbutton">Add Yours</button> */}

			<Link to={'/project/add_project'}><button className={changeImage ? 'ProjectDispBtn changeAddImage' : 'ProjectDispBtn'} 
          onMouseOut={() => setChangeImage(true)}
          onMouseOver={()=> setChangeImage(false)}
		  > Add </button></Link>

        {/* <hr style={{width: '95%', height: '2.5px', backgroundColor: 'white', marginLeft: '60px', marginBottom: '2.5vh'}}/> */}
			{/* <div className="select1">
				<p>
					<button id="art" className="borderbutton" type="button" data-bs-toggle="collapse"
						data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">
						Filter by Tags
					</button>
				</p>
			</div>
			<div className="collapse" id="collapseExample1">
				<div className="tagsdiv">
					<div className="sub">Tags :</div>
					{tagChecksgenerator()}
				</div>
			</div> */}



		</div>
		</>
	)
}
