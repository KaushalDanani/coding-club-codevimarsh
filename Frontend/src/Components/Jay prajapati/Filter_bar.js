import React from 'react'
import { useState } from 'react';
import './Filter_bar.css'
import { question_open } from '../Question_answer_jp/Ask_Question.js';
// import { addproject_open ,  } from '../Innercomp/AddProject';
// import {question_open} from '../Question_answer/Ask_Question';
export default function Filter_bar() {

	const tagsArr = ['DSA', 'C', 'c#', 'C++'];
	const [changeImage, setChangeImage] = useState('true');


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

	return (
		<div className='filter navbar'>
			{/* <Ask_Question/> */}
			{/* <button className="borderbutton" onClick={question_open}>Add Yours</button> */}
			
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
	)
}
