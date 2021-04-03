import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SearchBar from '../../shared/search-bar/SearchBar';

import UsFlag from '../../svgs/flags/America';
import Europe from '../../svgs/flags/Europe';
import Brazil from '../../svgs/flags/Brazil';
import Canada from '../../svgs/flags/Canada';
import UnitedKingdom from '../../svgs/flags/UnitedKingdom';

import { CardWrapper, SearchListWrapper } from './DiscoverSearchElements';

const DiscoverSearch = () => {
    const [searchList, setSearchList] = useState([]);

    let timer = 1000;
    let timeoutVal = 1000;

    const onSearchedStock = (e) => {
        let searchWord = e.target.value;

        if (!searchWord) return;

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                keywords: searchWord,
                function: 'SYMBOL_SEARCH',
                datatype: 'json',
            },
            headers: {
                'x-rapidapi-key':
                    '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            },
        };
        window.clearTimeout(timer);

        timer = window.setTimeout(() => {
            axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    setSearchList(response.data.bestMatches);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }, timeoutVal);
    };

    return (
        <>
            <SearchBar onSearchedStock={onSearchedStock} />
            <SearchListWrapper>
                {searchList.map((item, i) => {
                    return (
                        <>
                            <CardWrapper>
                                {item['4. region'] == 'United States' ? (
                                    <UsFlag />
                                ) : null}
                                {item['8. currency'] == 'CAD' ? (
                                    <Canada />
                                ) : null}
                                {item['4. region'] == 'United Kingdom' ? (
                                    <UnitedKingdom />
                                ) : null}
                                {item['8. currency'] == 'BRL' ? (
                                    <Brazil />
                                ) : null}
                                {item['8. currency'] == 'EUR' ? (
                                    <Europe />
                                ) : null}

                                <span>
                                    {item['2. name'].length > 20
                                        ? item['2. name'].slice(0, 18)
                                        : item['2. name']}
                                </span>
                                <span>{item['1. symbol']}</span>

                                <Link to={`/info/`}>
                                    <span>
                                        <i className="fas fa-caret-right"></i>
                                    </span>
                                </Link>
                            </CardWrapper>
                        </>
                    );
                })}
            </SearchListWrapper>
        </>
    );
};

export default DiscoverSearch;
