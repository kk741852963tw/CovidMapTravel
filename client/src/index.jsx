import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { json, tsv, geoPath, geoNaturalEarth1, zoom, select, zoomIdentity, transition, interpolate } from 'd3';
import { feature } from 'topojson';
import Country from './Country.jsx';
import CovidInformation from './CovidInformation.jsx';
import EntryRequirement from './EntryRequirement.jsx';
import Search from './Search.jsx';
import '../public/styles.css';
import axios from 'axios';


const root = createRoot(document.getElementById("root"));

const App = () => {
  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);

  const[countryName, setName] = useState({});
  const[countryISO, setISO] = useState({});
  const[countries, setFeature] = useState([]);
  const[covidInformations, setCovid] = useState([]);
  const[displayCountryName, setDisplay] = useState('United States');
  const[iso_a3, setIso_a3] = useState('USA');
  const[covid, setInformation] = useState({});
  const[status, setStatus] = useState(false);
  const[x, setX] = useState(0);
  const[y, setY] = useState(0);
  const[k, setK] = useState(1);

  useEffect(() => {
    Promise.all([
      tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
      json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
      ])
      .then(([name, id]) => {
        const countryname = {};
        name.forEach(country => { countryname[country.iso_n3] = country.name });
        setName(countryname);
        const countryiso = {};
        name.forEach(country => { countryiso[country.name] = country.iso_a3 });
        setISO(countryiso);
        const countries = feature(id, id.objects.countries);
        setFeature(countries.features);
      });
    const option = {
      url: '/456',
      method: 'get'
    };
    axios(option)
      .then(result => {
        setCovid(result.data);
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i]["a01"] === "USA") {
            setInformation(result.data[i]);
            break;
          }
        }
      })
      .catch((err) => console.log('server fail', err));
  }, []);

  const svg = select('svg');
  const g = select('g');

  svg.call(zoom()
  .scaleExtent([1, 8])
  .on('zoom', function(event) {
    if (status) {
      event.transform.k = 1;
      event.transform.x = 0;
      event.transform.y = 0;
      setStatus(prev => prev = false);
    }
    setX(prev => prev = event.transform.x);
    setY(prev => prev = event.transform.y);
    setK(prev => prev = event.transform.k);
    console.log(k,y,x);
    g.attr('transform', event.transform);
  }));

  const clickCountry = function(name) {
    setDisplay(prev => prev = name);
    setIso_a3(prev => prev = countryISO[name]);
    for (let i = 0; i < covidInformations.length; i++) {
      if (covidInformations[i]["a01"] === countryISO[name]) {
        setInformation(covidInformations[i]);
        break;
      }
      if (i === covidInformations.length - 1) {
        setInformation({"id":"null","a01":"null","a02":"null","a03":"null","a04":"null","a05":"null","a06":"null","a07":"null","a08":"null","a09":"null","a10":"null","a11":"null","a12":"null"});
      }
    }
  };

  const handleReset = function() {
    setStatus(prev => prev = true);
    transition().duration(500).tween('zoom', () => {
      console.log(k,y,x);
      let ki = interpolate(k, 1);
      let yi = interpolate(y, 0);
      let xi = interpolate(x, 0);
      return function(t) {svg.call(g.attr('transform',zoomIdentity.translate(xi(t), yi(t)).scale(ki(t))))};
    });
  };

  return (
    <div id="app">
      {/* earth shape */}
      <div>
        <div className="adjust"><div className="header"><div className="headerText">Covid Map Travel</div></div></div>
        <div id="sphere">
          <svg id="sphereSVG" width="960" height="500">
            <g>
              <path className="sphere" d={pathGenerator({ type: 'Sphere'})}></path>
              {/* country shape */}
              {countries.map((country, index) => {
                  return <Country displayCountryName={displayCountryName} country={country} countryName={countryName[country.id]} clickCountry={clickCountry} key={index}></Country>
                })
              }
            </g>
          </svg>
        </div>
        <Search data={countryName} countryClick={clickCountry}></Search>
        <div className="reset" onClick={handleReset}>origin size</div>
      </div>
      <div>
        <h1>From United States to <span className="displayCountryName">{displayCountryName}</span></h1>
        <h2>Destination Covid Information</h2>
        {covid.id === undefined ? <></> : <CovidInformation covidInformations={covid}></CovidInformation>}
        <h2>Destination Entry Requirement</h2>
        <EntryRequirement countryName={displayCountryName}></EntryRequirement>
      </div>
    </div>
  )
}

root.render(<App />);
