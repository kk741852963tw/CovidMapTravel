import React, { useState, useEffect } from "react";

const CovidInformation = (props) => {

  const help = function(number) {
    if (number === "null") {
      return number;
    }
    let array = number.split('.');
    let string = '';
    if (array[1] !== undefined) {
      for (let i = array[1].length - 1; i >= 0; i--) {
        string += array[1][i];
      }
      string += '.';
    }
    for (let i = array[0].length - 1; i >= 0; i--) {
      if ((array[0].length - i) % 3 === 1 && i !== array[0].length - 1) {
        string += ',';
      }
      string += array[0][i];
    }
    string = string.split('').reverse().join('');
    return string;
  }

  return (
    <div id="covid">
      <div className="covidHeader">Date</div>
      <div className="covidHeader">Total Population</div>
      <div className="covidHeader">Total Confirmed Case</div>
      <div className="covidHeader">Total Confirmed Case<br></br>(per million people)</div>
      <div className="covidHeader">New Confirmed Case</div>
      <div className="covidHeader">New Confirmed Case(7MA)</div>
      <div className="covidHeader">New Confirmed Case<br></br>(per million people)</div>
      <div className="covidHeader">New Confirmed Case(7MA)<br></br>(per million people)</div>
      <div className="covid">{props.covidInformations["a04"]}</div>
      <div className="covid">{help(props.covidInformations["a11"])}</div>
      <div className="covid">{help(props.covidInformations["a05"])}</div>
      <div className="covid">{help(props.covidInformations["a08"])}</div>
      <div className="covid">{help(props.covidInformations["a06"])}</div>
      <div className="covid">{help(props.covidInformations["a07"])}</div>
      <div className="covid">{help(props.covidInformations["a09"])}</div>
      <div className="covid">{help(props.covidInformations["a10"])}</div>
    </div>
  )
};

export default CovidInformation;