import { useEffect } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { setFetchedCryptoList } from '../../redux/actions'

const FetchAllCrypto = () => {
    const dispatch = useDispatch()


    const getCryptoInfo = async () => {
        await axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            )
            .then((res) => dispatch(setFetchedCryptoList(res.data)))
            .catch((err) => console.log(err));
    };


    useEffect(() => {
        getCryptoInfo()
    }, [])

    return null
}

export default FetchAllCrypto
