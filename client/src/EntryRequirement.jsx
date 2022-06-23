import React, { useState, useEffect } from "react";
import data_va_open from "./data/data_va_open.jsx";
import data_va_travel from "./data/data_va_travel.jsx";
import data_va_quarantine from "./data/data_va_quarantine.jsx";
import data_va_restricted from "./data/data_va_restricted.jsx";
import data_unknown from "./data/data_unknown.jsx";
import data_unva_open from "./data/data_unva_open.jsx";
import data_unva_travel from "./data/data_unva_travel.jsx";
import data_unva_quarantine from "./data/data_unva_quarantine.jsx";
import data_unva_restricted from "./data/data_unva_restricted.jsx";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const EntryRequirement = (props) => {

  const[freeVA, setFreeVA] = useState('');
  const[testVA, setTestVA] = useState('');
  const[quarantineVA, setQuarantineVA] = useState('');
  const[citizensVA, setCitizensVA] = useState('');
  const[unknownVA, setUnknownVA] = useState('');
  const[freeUNVA, setFreeUNVA] = useState('');
  const[testUNVA, setTestUNVA] = useState('');
  const[quarantineUNVA, setQuarantineUNVA] = useState('');
  const[citizensUNVA, setCitizensUNVA] = useState('');
  const[unknownUNVA, setUnknownUNVA] = useState('');

  useEffect(() => {
    if (props.countryName === "United States") {
      setFreeVA('');
      setTestVA('');
      setQuarantineVA('');
      setCitizensVA('');
      setUnknownVA('');
      setFreeUNVA('');
      setTestUNVA('');
      setQuarantineUNVA('');
      setCitizensUNVA('');
      setUnknownUNVA('');
    } else {
      if (data_va_open.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeVA('✓');
        setTestVA(''); //Open for travel. COVID-19 testing or quarantine is not required.
        setQuarantineVA('');
        setCitizensVA('');
        setUnknownVA('');
      } else if (data_va_travel.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeVA('');
        setTestVA('✓'); //Open for travel with required COVID-19 testing.
        setQuarantineVA('');
        setCitizensVA('');
        setUnknownVA('');
      } else if (data_va_quarantine.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeVA('');
        setTestVA('✓'); //Open for travel with required COVID-19 testing and quarantine upon arrival.
        setQuarantineVA('✓');
        setCitizensVA('');
        setUnknownVA('');
      } else if (data_va_restricted.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeVA('');
        setCitizensVA('✓'); //Travel is only open for returning citizens and those meeting strict requirements.
        setQuarantineVA('');
        setTestVA('');
        setUnknownVA('');
      } else if (data_unknown.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeVA('');
        setUnknownVA('✓'); //Travel restrictions for this location are unknown.
        setQuarantineVA('');
        setTestVA('');
        setCitizensVA('');
      } else {
        setFreeVA('fail');
        setUnknownVA('');
        setQuarantineVA('');
        setTestVA('');
        setCitizensVA('');
      }
      if (data_unva_open.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeUNVA('✓');
        setTestUNVA(''); //Open for travel. COVID-19 testing or quarantine is not required.
        setQuarantineUNVA('');
        setCitizensUNVA('');
        setUnknownUNVA('');
      } else if (data_unva_travel.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeUNVA('');
        setTestUNVA('✓'); //Open for travel with required COVID-19 testing.
        setQuarantineUNVA('');
        setCitizensUNVA('');
        setUnknownUNVA('');
      } else if (data_unva_quarantine.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeUNVA('');
        setTestUNVA('✓'); //Open for travel with required COVID-19 testing and quarantine upon arrival.
        setQuarantineUNVA('✓');
        setCitizensUNVA('');
        setUnknownUNVA('');
      } else if (data_unva_restricted.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeUNVA('');
        setCitizensUNVA('✓'); //Travel is only open for returning citizens and those meeting strict requirements.
        setQuarantineUNVA('');
        setTestUNVA('');
        setUnknownUNVA('');
      } else if (data_unknown.toString().split(' ').join('').includes(props.countryName.split(' ').join('').split('.').join(''))) {
        setFreeUNVA('');
        setUnknownUNVA('✓'); //Travel restrictions for this location are unknown.
        setQuarantineUNVA('');
        setTestUNVA('');
        setCitizensUNVA('');
      } else {
        setFreeUNVA('fail');
        setUnknownUNVA('');
        setQuarantineUNVA('');
        setTestUNVA('');
        setCitizensUNVA('');
      }
    }
  }, [props])

  return (
    <>
      <div id="entry">
        <div className="entryHeader">status</div>
        <div className="entryHeader">free</div>
        <div className="entryHeader">test</div>
        <div className="entryHeader">quarantine</div>
        <div className="entryHeader">only citizens</div>
        <div className="entryHeader">unknown</div>
        <div>Vaccinated</div>
        <div className="entry">{freeVA}</div>
        <div className="entry">{testVA}</div>
        <div className="entry">{quarantineVA}</div>
        <div className="entry">{citizensVA}</div>
        <div className="entry">{unknownVA}</div>
        <div>No Vaccinated</div>
        <div className="entry">{freeUNVA}</div>
        <div className="entry">{testUNVA}</div>
        <div className="entry">{quarantineUNVA}</div>
        <div className="entry">{citizensUNVA}</div>
        <div className="entry">{unknownUNVA}</div>
      </div>
      <div className="errorMessage">
        <div className="errorIcon"><ErrorOutlineIcon></ErrorOutlineIcon></div>
        <div className="errorText">Information is provided as guidance only and accurate at the time of publishing. Always check government websites and airline materials before booking and traveling.</div>
      </div>
    </>
  )
};

export default EntryRequirement;