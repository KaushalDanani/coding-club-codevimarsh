import React from "react";
import './Resources.css';
import { useState } from "react";


export default function Resources(){

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
        <div className={`resources fade-in-section ${isVisible ? 'is-visible' : ''}`}
        ref={domRef}>
            <div className="image">
                <img src="/images/Resources.jpg" alt="Resources image"></img>
            </div>
            <div className="description">
                <p className="dischead">Get the Resources</p>
                <p className="discnode">
                    Get The Full Resources of Study Material And  Other Resources Of Computer Science Field
                </p>
                <button className="btnresource">Resources</button>
            </div>
            
        </div>
    );

}