import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./LoginHomePage.css";
import Greeting from "./Greeting.js";
import NewTasks from "./NewTasks.js";
// import NewUpdates from "./NewUpdates.js";
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import useUser from "../../store/userContext.js";
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import HashLoader from "react-spinners/HashLoader.js";
import { useLocation } from "react-router-dom";

function LoginHomePage() {
  const api_key = process.env.REACT_APP_QUOTE_API_KEY;
  // const navigate = useNavigate()
  const [isLoadingHome, setIsLoadingHome] = useState(false);
  const [fname, setFname] = useState("");
  const [userID, setUserID] = useState("");
  const [admin, setAdmin] = useState(false);
  const [contests, setContests] = useState([]);
  // const [newsData, setNewsData] = useState([]);
  // const [articlesData, setArticlesData] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  // const [userData,setUserData] = useState('');
  const [base64Img,setBase64Img] = useState('');
  const { user, setUser } = useUser();

  useEffect(() => {
    // setTimeout(() => {
      fetch(api_key)
      .then((response) => response.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });

    // }, 3000)
  }, []);

  const changeQuoteHandler = () => {
    fetch(api_key)
      .then((response) => response.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingHome(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/home/dataset`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        const data = await response.json();
        if(data.message == undefined)
          {
              setUser(data.userData);
              setFname(data.userData.fname);
              setUserID(data.userData._id);
              setAdmin(data.userData.isAdmin);
              setBase64Img(`data:image/png;base64,${data.userData.profileImg}`);
          }
          else {
              // alert(data.message)
              setUser(null);
          }

        const response2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contest/upcoming`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const contestData = await response2.json();
        setContests(contestData);

        // Articles and News Section

        // const response3 = await fetch(
        //   "https://newsapi.org/v2/everything?q=apple&from=2023-12-31&to=2023-12-31&sortBy=popularity&apiKey=876ed1ab1a2545c18ffdb151c871e344"
        // );
        // const newsData = await response3.json();
        // setNewsData(newsData.articles);

        // const response4 = await fetch(
        //   "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=876ed1ab1a2545c18ffdb151c871e344"
        // );
        // const articleData = await response4.json();
        // setArticlesData(articleData.articles);

        setIsLoadingHome(false);
      } catch (err) {
        console.error(err, err.response);
      }
    })();
  }, []);


  if (isLoadingHome)
    return (
      <>
        <div className="loadingPage">
          <HashLoader
            color={"#ffffff"}
            loading={isLoadingHome}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </>
    );

  return (
    (!user) ? (
      <>
        {/* {navigate("/")} */}
        <Navigate to={"/"} replace />
        {/* {window.location.reload()} */}
      </>
    ) : (
      <>
      <Navbar_after_login imgData={base64Img} />
      <div className="background-color-LoginHome">
        <Greeting fname={fname} userID={userID} isAdmin={admin} />
        <div className="quoteContainerAfterLogin">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 className="quoteTitle">Quote</h2>
            <input
              type="button"
              className="new_quote_btn"
              onClick={changeQuoteHandler}
              title='Change Quote'
            />
          </div>
          <hr />
          <div className="quoteDiv">
            <div className="quoteDivInfo">
              {quote ? 
              <>
                <div id="openQuote" />
                <p className="quoteContent">{quote}</p>
                <div id="closeQuote" />
              </>
              : 
              <> 
                <Skeleton />
                <Skeleton width={'60%'} />
              </> }
            </div>
                <div className="authorName">
                  {author ? 
                      <span className="authorNameContainer"> ~ {author} </span>
                    :
                      <Skeleton height={'1.2rem'} width={250}/>
                  }
                </div>
          </div>
        </div>
        <NewTasks userID={userID}
          contests={contests}
        />
        
        {/* Article and News Display Section */}
        {/* <NewUpdates title={"Articles"} userID={userID} news={articlesData} isArticleSelected={true}/>
        <NewUpdates title={"News"} userID={userID} news={newsData} isArticleSelected={false}/> */}
      </div>
      <MyfooterAfterLogin />
    </>
  )
  )
}

export default LoginHomePage;
