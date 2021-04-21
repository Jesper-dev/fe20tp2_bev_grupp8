// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import { recommendation } from '../../redux/actions';
// import { useDispatch } from 'react-redux';

// const Recommendations = () => {
//     const [stocks, setStocks] = useState([]);
//     const dispatch = useDispatch();

//     const options = {
//         method: 'GET',
//         url:
//            'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations',

//         params: { symbol: 'TSLA' },
//         headers: {
//             'x-rapidapi-key':
//                 '9e8ddf2821msh4c4f74e49206ee9p1302d4jsn143cd2ada6f1',
//             'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
//         },
//     };
//     useEffect(() => {
//         axios
//             .request(options)
//             .then((response) => {
//                 setStocks(response.data.finance.result[0].quotes);

//                 dispatch(
//                     recommendation(response.data.finance.result[0].quotes)
//                 );
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, []);

//     return <div></div>;
// };

// export default Recommendations;
