import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsList = () => {
  const [array, setArray] = useState([]);
  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list",
    params: { category: "generalnews", region: "US" },
    headers: {
      "x-rapidapi-key": "9e8ddf2821msh4c4f74e49206ee9p1302d4jsn143cd2ada6f1",
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        setArray(response.data.items.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div className="newsWrapper">
      {array.map((item, index) => {
        return (
          <div className="newsBox" key={index}>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NewsList;
