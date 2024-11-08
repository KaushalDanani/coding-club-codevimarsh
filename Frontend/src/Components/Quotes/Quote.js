import React, { useEffect, useState } from "react";
import "./Quote.css"
import Skeleton from "react-loading-skeleton";

const Quote = () => {
    const api_key = process.env.REACT_APP_QUOTE_API_KEY;
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        try {
            fetch(api_key)
                .then((response) => {
                    if (!response.ok) throw new Error("QUOTE API IS NOT WORKING");
                    return response.json();
                })
                .then((quote) => {
                    setQuote(quote.quote);
                    setAuthor(quote.author);
                });
        } catch (error) {
            console.error("QUOTE API IS NOT WORKING");
        }
    }, [api_key]);

    const changeQuoteHandler = () => {
        try {
            fetch(api_key)
                .then((response) => {
                    if (!response.ok) throw new Error("QUOTE API IS NOT WORKING");
                    return response.json();
                })
                .then((quote) => {
                    setQuote(quote.quote);
                    setAuthor(quote.author);
                });
        } catch (error) {
            console.error("QUOTE API IS NOT WORKING");
        }
    };

    return (
        <div className="quote-section">
            <div className="quoteContainer">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2 className="quoteTitle">Quote</h2>
                    <input
                        type="button"
                        className="new_quote_btn"
                        onClick={changeQuoteHandler}
                        title="Change Quote"
                    />
                </div>
                <hr style={{border: '0.01rem solid white', opacity: 1}} />
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
                        {author ? (
                            <span className="authorNameContainer"> ~ {author} </span>
                        ) : (
                            <Skeleton height={"1.2rem"} width={250} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quote;
