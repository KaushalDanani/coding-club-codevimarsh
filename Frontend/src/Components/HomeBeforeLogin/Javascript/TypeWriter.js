import React, { useEffect, useRef, useState } from 'react'
import '../CSS/Home_page_before_login.css';

function TypeWriter() {

    const index = useRef(0);
    const newText = useRef(0);
    const [currText, setCurrText] = useState('');
    const [text, setText] = useState('Hello Guys');
    const allText = [" Welcome to Coding Club", " Welcome to codeVimarsh", " Let's grow together"];

    function changeText() {
        if(newText.current <= 2)
        {
            setCurrText('');
            setText(allText[newText.current])
            index.current = 0;
            newText.current += 1;
        }
        else
        {
            setCurrText('');
            index.current = 0;
            newText.current = 0;
        }
    }

    useEffect(() => {
    
        setTimeout(() => {
            setCurrText((val) => val + text.charAt(index.current));
            index.current += 1;
            if(text.length == index.current)
                changeText();
        }, 500)

      
    }, [currText, text])
    

  return (
    <input className='welcomeToCode' style={{backgroundColor: 'transparent', border: 'none'}} value={currText} disabled></input> 
  )
}

export default TypeWriter