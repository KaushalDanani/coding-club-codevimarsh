import React, { lazy, Suspense, useEffect, useState } from "react";
import "../CSS/Home_page_before_login.css";
import { Typewriter, Cursor } from "react-simple-typewriter";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../../App.css";
import useUser from "../../../store/userContext.js";
import HashLoader from "react-spinners/HashLoader.js";

// const Navbar_before_login = lazy(() => import("./Navbar_before_login.js"))
import Navbar_before_login from "./Navbar_before_login.js";

// import founderinfo from "./Founderinfo.js";
const Myfooter = lazy(() => import("./Myfooter.js"))
// import Myfooter from "./Myfooter.js";

const Foundercard = lazy(() => import("./Foundercard.js"))
// import Foundercard from "./Foundercard.js";

// const founderinfo = lazy(() => import("./Founderinfo.js"))

const Resources = lazy(() => import("./Resources.js"))
// import Resources from "./Resources.js";

const Projects = lazy(() => import("./Projects.js"))
// import Projects from "./Projects.js";
// import News from "./News.js";

const ProjCollab = lazy(() => import("./ProjCollab.js"))
// import ProjCollab from "./ProjCollab.js";

const Discussion = lazy(() => import("./Discussion.js"))
// import Discussion from "./Discussion.js";

// import TypeWriter from "./TypeWriter.js";

function Home_page_before_login() {
  const navigate = useNavigate();
  const oneLinerToStart = "Start your coding journey with code-vimarsh by joining us...";
  const { user, setUser } = useUser();
  const api_key = process.env.REACT_APP_QUOTE_API_KEY;
  const [isLoadingBeforeHome, setIsLoadingBeforeHome] = useState(false);
  const [imgData, setImgData] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [displayedQuote, setDisplayedQuote] = useState("");

  const userCradential = async () => {
    try {
      // console.log(process.env.REACT_APP_BACKEND_URL);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/home/dataset`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.message == undefined) {
        setUser(data.userData);
        setImgData(data.userData.profileImg);
        // console.log("-----------------------------USER-------------------------",data);
      } else {
        // alert(data.message)
        setUser(null);
      }
     
    } catch (err) {
      console.error(err, err.response);
    }
  };

  useEffect(() => {
    setIsLoadingBeforeHome(true);
    userCradential();

    const fetchQuote = async () => {
      try {
        const response = await fetch(api_key);
        if (!response.ok) {
          throw new Error('QUOTE API IS NOT WORKING');
        }
        const quote = await response.json();
        setQuote(quote.content);
        setAuthor(quote.author);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchQuote();
    setIsLoadingBeforeHome(false);
  }, []);

  const changeQuoteHandler = () => {
    setDisplayedQuote("");
    try {
      fetch(api_key)
        .then((response) => {
          if (!response.ok) throw new Error("QUOTE API IS NOT WORKING");
          return response.json();
        })
        .then((quote) => {
          setQuote(quote.content);
          setAuthor(quote.author);
          setDisplayedQuote("");
        });
    } catch (error) {
      console.error("QUOTE API IS NOT WORKING");
    }
  };

  if (isLoadingBeforeHome)
    return (
      <>
        <div className="loadingPage">
          <HashLoader
            color={"#ffffff"}
            loading={isLoadingBeforeHome}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </>
    );


  return user ? (
    <>
      {/* {navigate(`/home`)} */}
      <Navigate to={`/home`} replace />
      {/* {window.location.reload()} */}
    </>
  ) : (
    <>
      <Navbar_before_login />
      <div style={{ display: "flex" }}>
        <div className="welcomeContainer">
          <div className="typewriterContainer">
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
            <h4 className="oneLiner">
              {oneLinerToStart}
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

          {/* <div className="newDesign">
            <Spline scene="https://prod.spline.design/CDC-mcexNJJZUeKN/scene.splinecode" />
          </div> */}
          <div className="newDesign">
            <ul className="designUL">
              {/* <li className='newLi'>
                                        <a href='https://react.dev/' target='_blank' onClick="kevin()">
                                            <span className='designSpan'></span>
                                            <span className='designSpan'></span>
                                            <span className='designSpan'></span>
                                            <span className='designSpan'></span>
                                            <span> <a href='https://react.dev/' target='_blank'> <img src='/images/reactLogo.png'
                                                height="44px" width="44px"
                                                loading="lazy"
                                                alt="React"
                                            ></img> </a> </span>
                                        </a>
                                    </li>

                                    <li className='newLi'>
                                        <a href='https://dev.java/learn/' target='_blank' onClick="kevin()">
                                            <span className='designSpan'></span>
                                            <span className='designSpan'></span>
                                            <span className='designSpan'></span>
                                            <span className='designSpan'></span>
                                            <span> <a href='https://dev.java/learn/' target='_blank'> <img src='/images/java.png'
                                                height="44px" width="44px"
                                                loading="lazy"
                                                alt="Java"
                                            ></img> </a> </span>
                                        </a>
                                    </li> */}

              <li className="newLi">
                <a
                  href="https://www.geeksforgeeks.org/"
                  // onClick="kevin()"
                  target="_blank"
                >
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span>
                    {/* {" "}
                    <a href="https://www.geeksforgeeks.org/" target="_blank">
                      {" "} */}
                      <img
                        src="/images/geeksforgeeksLogo.svg"
                        height="44px"
                        width="44px"
                        loading="lazy"
                        alt="Geeksforgeeks"
                      ></img>
                    {/* </a>{" "} */}
                  </span>
                </a>
              </li>

              <li className="newLi">
                <a
                  href="https://www.w3schools.com/"
                  target="_blank"
                  // onClick="kevin()"
                >
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span>
                    {/* {" "}
                    <a href="https://www.w3schools.com/" target="_blank">
                      {" "} */}
                      <img
                        src="/images/w3schoolsLogo.png"
                        height="44px"
                        width="44px"
                        loading="lazy"
                        alt="W3Schools"
                      ></img>
                    {/* </a>{" "} */}
                  </span>
                </a>
              </li>

              <li className="newLi">
                <a
                  href="https://leetcode.com/"
                  target="_blank"
                  // onClick="kevin()"
                >
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span>
                    {/* {" "}
                    <a href="https://leetcode.com/" target="_blank">
                      {" "} */}
                      <img
                        src="/images/leetcodeLogo.png"
                        height="44px"
                        width="44px"
                        loading="lazy"
                        alt="LeetCode"
                      ></img>
                    {/* </a>{" "} */}
                  </span>
                </a>
              </li>

              <li className="newLi">
                <a
                  href="https://www.codechef.com/"
                  target="_blank"
                  // onClick="kevin()"
                >
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span className="designSpan"></span>
                  <span>
                    {/* {" "}
                    <a href="https://www.codechef.com/" target="_blank">
                      {" "} */}
                      <img
                        src="/images/codechef_logo.png"
                        height="44px"
                        width="41.5px"
                        loading="lazy"
                        alt="CodeChef"
                      ></img>
                    {/* </a>{" "} */}
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
            {quote ? (
              <>
                <div id="openQuote" />
                <p className="quoteContent">{quote}</p>
                <div id="closeQuote" />
              </>
            ) : (
              <>
                <Skeleton />
                <Skeleton width={"60%"} />
              </>
            )}
          </div>
          <div className="authorName">
            {author ? <span className="authorNameContainer"> ~ {author} </span> : <Skeleton height={'1.2rem'} width={250}/>}
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}> <Resources /> </Suspense>
      <Suspense fallback={<div>Loading...</div>}> <Projects /> </Suspense>
      <Suspense fallback={<div>Loading...</div>}> <ProjCollab /> </Suspense>
      <Suspense fallback={<div>Loading...</div>}> <Discussion /> </Suspense>
      {/* <div className="founderinfo" id="AboutUS">
        <h1 className="foundercardline">The Initiators Of Code-Vimarsh</h1>
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
      </div> */}
      <Suspense fallback={<div>Loading...</div>}> <Foundercard /> </Suspense>
      <Suspense fallback={<div>Loading...</div>}> <Myfooter /> </Suspense>
    </>
  );
}

export default Home_page_before_login;
