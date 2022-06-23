import React, { useState, useEffect } from "react";
import { geoPath, geoNaturalEarth1 } from 'd3';

const Countrty = (props) => {
  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);

  const handleClick = function(e) {
    props.clickCountry(e.target.textContent);
  };

  return (
      <path className={props.countryName === props.displayCountryName ? "countryDisplay" : "country"} d={pathGenerator(props.country)} onClick={(e) => handleClick(e)}>
        <title>{props.countryName}</title>
      </path>
  )
};

export default Countrty;