import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";

const Search = (props) => {

  const[input, setInput] = useState([]);
  const[objectKeys, setObjectKeys] = useState([]);
  const value = useRef('');

  useEffect(() => {
    setObjectKeys(Object.keys(props.data));
  }, [props]);

  const handleInput = function(e) {
    if (e.target.value.length > 0) {
      const temp = [];
      for (let i = 0; i < objectKeys.length; i++) {
        if (props.data[objectKeys[i]].toLowerCase().includes(e.target.value.toLowerCase())) {
          temp.push(props.data[objectKeys[i]]);
        }
      }
      const array = temp.sort();
      setInput(array);
    } else {
      setInput([]);
    }
  };

  const handleClick = function(country) {
    props.countryClick(country);
    setInput([]);
    value.current.value = '';
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder="Enter a country/district name" onChange={(e) => handleInput(e)} ref={value}></input>
        <div className="searchIcon"><SearchIcon></SearchIcon></div>
      </div>
      {input.length === 0 ? <></> :
      <div className="dataResult">
        {input.map((country, index) => {
          return <div className="dataItem" key={index} onClick={() => handleClick(country)}><p key={index}>{country}</p></div>
        })}
      </div>}
    </div>
  )
};

export default Search;