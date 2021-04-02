import React from 'react';

import { TabBarDropDownElement } from './TabBarDropDownElements';

const TabBarDropDown = ({ setDataFunction }) => {
    return (
        <TabBarDropDownElement>
            <ul class="dropdown">
                <li>
                    <a>stockdata</a>
                    <ul>
                        <li>
                            <a>Most followed</a>
                            <ul>
                                <li>
                                    <a
                                        id="stocks-pie"
                                        onClick={setDataFunction}
                                    >
                                        Piechart
                                    </a>
                                </li>
                                <li>
                                    <a
                                        id="stocks-bar"
                                        onClick={setDataFunction}
                                    >
                                        {' '}
                                        Barchart
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>crytpodata</a>
                    <ul>
                        <li>
                            <a>Most followed</a>
                            <ul>
                                <li>
                                    <a
                                        id="crypto-pie"
                                        onClick={setDataFunction}
                                    >
                                        {' '}
                                        Piechart
                                    </a>
                                </li>
                                <li>
                                    <a
                                        id="crypto-bar"
                                        onClick={setDataFunction}
                                    >
                                        {' '}
                                        Barchart
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </TabBarDropDownElement>
    );
};

export default TabBarDropDown;
