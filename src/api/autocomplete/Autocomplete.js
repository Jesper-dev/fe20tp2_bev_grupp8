import React, { useEffect, useState } from "react";
import axios from "axios";

const Autocomplete = () => {
  const [name, setName] = useState(undefined);
  const [symbol, setSymbol] = useState(undefined);
  const [score, setScore] = useState(undefined);
  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete",
    params: { q: "tesla", region: "US" },
    headers: {
      "x-rapidapi-key": "9e8ddf2821msh4c4f74e49206ee9p1302d4jsn143cd2ada6f1",
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setName(response.data.quotes[0].shortname);
        setSymbol(response.data.quotes[0].symbol);
        setScore(response.data.quotes[0].score);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <p>{symbol}</p>
      <p>{score}</p>
    </div>
  );
};

export default Autocomplete;
