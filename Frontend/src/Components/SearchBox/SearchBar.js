import React, { useState, useEffect } from 'react'
import './SearchBar.css'

const SearchBar = ({ sendBackSearchValue, type }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [suggestions, setSuggestions] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFocus = async () => {
    if(searchList.length == 0) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${type}/searchList`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      setSearchList(data.tagsList);
      // console.log("Search List is Set...😌😌😌");
    }
  } 

  const handleSearchValue = (e) => {
    const val = e.target.value;
    setSearchValue(val.trim())

    if(val)
      {
        const filteredSearchList = searchList.filter((element) => 
          element.toLowerCase().includes(val.toLowerCase()));
        setSuggestions(filteredSearchList);
        setShowSuggestions(true);
      }
      else {
        setShowSuggestions(false);
      }
  }

  const handleLiClickFromSuggestions = (suggestion) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  }

  const handleSearch = (suggestion) => {
    const desideSearchValue = typeof suggestion !== 'object' ? suggestion : searchValue;
    sendBackSearchValue(desideSearchValue);
  }

  return (
    <>
    <div style={{position: 'relative'}} onBlur={() => setShowSuggestions(false)}>
      <div className='searchContainer'>
          <input 
            className='searchInput'
            type='search'
            value={searchValue} 
            placeholder='Search by tags'
            onFocus={handleFocus}
            onChange={handleSearchValue}></input>
          <button className='searchBtn' title='Search' onClick={handleSearch}></button>
      </div>

        {(showSuggestions && suggestions.length > 0) &&
          <ul className='listOfSuggestions'>
            {suggestions.map((suggestion, idx) => {
              return (
                <li
                  key={idx}
                  className='suggestionElement'
                  onMouseDown={() => handleLiClickFromSuggestions(suggestion)}>{suggestion}</li>
              )
            })}
          </ul> }
    </div>
    </>
  )
}

export default SearchBar