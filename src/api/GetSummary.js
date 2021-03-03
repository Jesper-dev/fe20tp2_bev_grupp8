// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const GetSummary = () => {
//   const [text, setText] = useState(undefined);
//   const [data, setData] = useState({});

//   const options = {
//     method: "GET",
//     url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary",
//     params: { symbol: "TSLA", region: "US" },
//     headers: {
//       "x-rapidapi-key": "9e8ddf2821msh4c4f74e49206ee9p1302d4jsn143cd2ada6f1",
//       "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
//     },
//   };

//   const searchStock = (e) => {
//     console.log(e.target.value);
//     setText(e.target.value);
//   };

//   const search = () => {
//     axios
//       .request(options)
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <input type="text" onKeyDown={searchStock} />
//       <button onClick={search}>Search lol</button>
//       {/* <h2>{!data ? "" : data.earnings.maxAge}</h2> */}
//     </div>
//   );
// };

// export default GetSummary;
