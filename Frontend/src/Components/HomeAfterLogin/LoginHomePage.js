import React, { useContext, useEffect, useState } from "react";
import "./LoginHomePage.css";
import Myfooter from "../../Components/HomeBeforeLogin/CSS/Myfooter.css";
import Greeting from "./Greeting.js";
import NewTasks from "./NewTasks.js";
import NewUpdates from "./NewUpdates.js";
import Navbar_after_login from "../NavbarAfterLogin/Navbar_after_login.js";
import useUser from "../../store/userContext.js";
import MyfooterAfterLogin from "../FooterAfterLogin/MyfooterAfterLogin.js";
import HashLoader from "react-spinners/HashLoader.js";
import { useLocation } from "react-router-dom";

function LoginHomePage(props) {
  const [isLoadingHome, setIsLoadingHome] = useState(false);
  const [fname, setFname] = useState("");
  const [userID, setUserID] = useState("");
  const [admin, setAdmin] = useState(false);
  const [contests, setContests] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [userData,setUserData] = useState('');
  const [base64Img,setBase64Img] = useState('');
  const { user, setUser } = useUser();

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingHome(true);
        const response = await fetch("/home/user/dataset", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const [data] = await response.json();
        setUser(data);
        setFname(data.fname);
        setUserID(data._id);
        setAdmin(data.isAdmin);

        const response2 = await fetch(`/contest/upcoming`, {
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

        const response3 = await fetch('/navbar/profileImg/dataset')
        const data3 = await response3.json();
        setUserData(data3.data);
        setBase64Img(`data:image/png;base64,${data3.data.profileImg}`);

        setIsLoadingHome(false);
      } catch (err) {
        console.error(err, err.response);
      }
    })();
  }, []);

  const changeQuoteHandler = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((quote) => {
        setQuote(quote.content);
        setAuthor(quote.author);
      });
  };

  

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
    <>
      <Navbar_after_login imgData={base64Img} />
      <div className="background-color-LoginHome">
        <Greeting fname={fname} userID={userID} isAdmin={admin} />
        <div className="quoteContainerAfterLogin">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="quoteTitle">Quote</h3>
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
        <NewTasks userID={userID}
          contests={contests}
        />
        
        {/* Article and News Display Section */}
        {/* <NewUpdates title={"Articles"} userID={userID} news={articlesData} isArticleSelected={true}/>
        <NewUpdates title={"News"} userID={userID} news={newsData} isArticleSelected={false}/> */}
      </div>
      <MyfooterAfterLogin />
    </>
  );
}

export default LoginHomePage;
