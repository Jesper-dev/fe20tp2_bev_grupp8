import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [story, setStory] = useState(undefined);
  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details",
    params: { uuid: "9803606d-a324-3864-83a8-2bd621e6ccbd", region: "US" },
    headers: {
      "x-rapidapi-key": "9e8ddf2821msh4c4f74e49206ee9p1302d4jsn143cd2ada6f1",
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        console.log(response.data.data.contents[0].content.summary);
        setStory(response.data.data.contents[0].content.summary);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return <div></div>;
};

export default News;
