import React from "react";
import '../CSS/News.css';
import { Link } from "react-router-dom";
import { useEffect } from "react";


export default function News(){

  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
  
    if (domRef.current) {
      observer.observe(domRef.current);
    }
  
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);


    return(
        <div className={`news fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef} id="newsSource">
            <div className="image">
                <img src="/images/News.jpg" alt="News image"></img>
            </div>
            <div className="newsdiscription">
                <p className="newsdischead">Know The Latest News</p>
                <p className="newsdiscnode">
                    Get The Latest News Of Technology And Computer Science Field
                </p>
                <Link to={"signin"}> <button className="btnnews">News</button> </Link>
            </div>
            
        </div>
    );

}