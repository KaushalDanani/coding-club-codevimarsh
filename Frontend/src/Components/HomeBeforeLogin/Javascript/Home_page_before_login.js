import React, { useEffect, useState } from "react";
import "../CSS/Home_page_before_login.css";
import { Typewriter, Cursor } from "react-simple-typewriter";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import Myfooter from "./Myfooter.js";
import Foundercard from "./Foundercard.js";
import founderinfo from "./Founderinfo.js";
import Resources from "./Resources.js";
import Projects from "./Projects.js";
import News from "./News.js";
import ProjCollab from "./ProjCollab.js";
import Discussion from "./Discussion.js";
import Navbar_before_login from "./Navbar_before_login.js";
import TypeWriter from "./TypeWriter.js";

function Home_page_before_login(props) {
    const navigate = useNavigate();
    const api_key = process.env.REACT_APP_QUOTE_API_KEY;
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [displayedQuote, setDisplayedQuote] = useState("");

    useEffect(() => {
        fetch(api_key)
            .then((response) => response.json())
            .then((quote) => {
                setQuote(quote.content);
                setAuthor(quote.author);
            });
    }, []);

    const changeQuoteHandler = () => {
        setDisplayedQuote("");
        fetch(api_key)
            .then((response) => response.json())
            .then((quote) => {
                setQuote(quote.content);
                setAuthor(quote.author);
                setDisplayedQuote("");
            });
    };

    return (
        
            (props.user) ? (
            <>
                {navigate("/home")}
                {/* {window.location.reload()} */}
            </>
            ) : (
            <>
                <Navbar_before_login />
                <div style={{ display: "flex" }}>
                    <div className="welcomeContainer">
                        <div className="typewriterContainer">
                            {/* <h2 className="welcomeToCode">Welcome to <span> Coding Club,<br></br>MSU... </span> </h2> */}
                            <span className="welcomeToCode">
                                <Typewriter
                                    words={[
                                        "Welcome to Coding Club, MSU...",
                                        "Welcome to Code-Vimarsh...",
                                        "Let's grow together in coding...!",
                                    ]}
                                    loop={true}
                                    cursor
                                    cursorStyle="</>"
                                    cursorBlinking={false}
                                    typeSpeed={150}
                                    deleteSpeed={100}
                                />
                            </span>
                            {/* <TypeWriter /> */}
                            <h4 className="oneLiner">
                                Start your coding journey with codeMinions by joining us...
                            </h4>
                            <Link to={"signin"}>
                                {" "}
                                <input
                                    type="button"
                                    value="Get Started"
                                    className="get_start"
                                />{" "}
                            </Link>
                        </div>
                        <div className="newDesign">
                            <ul className="designUL">
                                {/* <li className='newLi'>
                                    <a href='https://react.dev/' target='_blank' onclick="kevin()">
                                        <span className='designSpan'></span>
                                        <span className='designSpan'></span>
                                        <span className='designSpan'></span>
                                        <span className='designSpan'></span>
                                        <span> <a href='https://react.dev/' target='_blank'> <img src='/images/reactLogo.png'
                                            height="44px" width="44px"
                                        ></img> </a> </span>
                                    </a>
                                </li>

                                <li className='newLi'>
                                    <a href='https://dev.java/learn/' target='_blank' onclick="kevin()">
                                        <span className='designSpan'></span>
                                        <span className='designSpan'></span>
                                        <span className='designSpan'></span>
                                        <span className='designSpan'></span>
                                        <span> <a href='https://dev.java/learn/' target='_blank'> <img src='/images/java.png'
                                            height="44px" width="44px"
                                        ></img> </a> </span>
                                    </a>
                                </li> */}

                                <li className="newLi">
                                    <a
                                        href="https://www.geeksforgeeks.org/"
                                        onclick="kevin()"
                                        target="_blank"
                                    >
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span>
                                            {" "}
                                            <a href="https://www.geeksforgeeks.org/" target="_blank">
                                                {" "}
                                                <img
                                                    src="/images/geeksforgeeksLogo.svg"
                                                    height="44px"
                                                    width="44px"
                                                ></img>{" "}
                                            </a>{" "}
                                        </span>
                                    </a>
                                </li>

                                <li className="newLi">
                                    <a
                                        href="https://www.w3schools.com/"
                                        target="_blank"
                                        onclick="kevin()"
                                    >
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span>
                                            {" "}
                                            <a href="https://www.w3schools.com/" target="_blank">
                                                {" "}
                                                <img
                                                    src="/images/w3schoolsLogo.png"
                                                    height="44px"
                                                    width="44px"
                                                ></img>{" "}
                                            </a>{" "}
                                        </span>
                                    </a>
                                </li>

                                <li className="newLi">
                                    <a
                                        href="https://leetcode.com/"
                                        target="_blank"
                                        onclick="kevin()"
                                    >
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span>
                                            {" "}
                                            <a href="https://leetcode.com/" target="_blank">
                                                {" "}
                                                <img
                                                    src="/images/leetcodeLogo.png"
                                                    height="44px"
                                                    width="44px"
                                                ></img>{" "}
                                            </a>{" "}
                                        </span>
                                    </a>
                                </li>

                                <li className="newLi">
                                    <a
                                        href="https://www.codechef.com/"
                                        target="_blank"
                                        onclick="kevin()"
                                    >
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span className="designSpan"></span>
                                        <span>
                                            {" "}
                                            <a href="https://www.codechef.com/" target="_blank">
                                                {" "}
                                                <img
                                                    src="/images/codechef_logo.png"
                                                    height="44px"
                                                    width="41.5px"
                                                ></img>{" "}
                                            </a>{" "}
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="quoteContainer">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="quoteTitle">Quote</h3>
                        <input
                            type="button"
                            className="new_quote_btn"
                            onClick={changeQuoteHandler}
                            title="Change Quote"
                        />
                    </div>
                    <hr />
                    <div className="quoteDiv">
                        <div className="quoteDivInfo">
                            <div id="openQuote" />
                            <p className="quoteContent">{quote}</p>
                            <div id="closeQuote" />
                        </div>
                        <div className="authorName">
                            {" "}
                            <span> ~ {author} </span>{" "}
                        </div>
                    </div>
                </div>

                <Resources />
                <Projects />
                <ProjCollab />
                <Discussion />
                <div className="founderinfo" id="AboutUS">
                    <h1 className="foundercardline">The Initiators Of CodeVimarsh</h1>
                    <div className="founderGrid">
                        {founderinfo.map(function Founderinfocard(element) {
                            return (
                                <Foundercard
                                    key={element.id}
                                    name={element.name}
                                    post={element.post}
                                    image={element.image}
                                ></Foundercard>
                            );
                        })}
                    </div>
                </div>
                <Myfooter />
            </>
            )
        
    );
}

export default Home_page_before_login;
