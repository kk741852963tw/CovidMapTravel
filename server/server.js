require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const path = require("path");
const axios = require("axios");
const app = express();
const cors = require('cors');


app.use(express.static(path.join(__dirname, "../client/public")));
app.use(express.json());

app.use(cors());

app.get('/456', (req, res) => {
  const option = {
    url: 'https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=4049',
    method: 'get'
  };
  axios(option)
    .then(result => res.status(200).send(result.data))
    .catch((err) => console.log('api fail', err));
});

app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);