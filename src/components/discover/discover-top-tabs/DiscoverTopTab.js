import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

import { TabWrapper } from './DiscoverTopTabElements';

const DiscoverTopTab = () => {
    // const [checked, setChecked] = useState(false)

    // const onClick = () => setChecked(!checked);

    return (
        <TabWrapper>
            <ul>
                <li>
                    <NavLink exact to={ROUTES.DISCOVER}>
                        <i className="fas fa-search-dollar"></i>
                        Discovery
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to={ROUTES.DISCOVER_STOCKS}>
                        <i className="fas fa-chart-line"></i>
                        Stocks
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to={ROUTES.DISCOVER_CRYPTO}>
                        <i className="fab fa-btc"></i>
                        Crypto
                    </NavLink>
                </li>
            </ul>

{/*
            <nav>
                <a>
                    <i className="fas fa-search-dollar"></i>
                    <b> Disc</b>
                </a>
                <a onClick={onClick}>
                    <i className="fas fa-chart-line"></i>
                    <b> ST</b>
                </a>
                <a onClick={onClick}>
                    <i className="fab fa-btc"></i>
                    <b> CRY</b>
                </a>
                <span></span>
            </nav>
*/}
        </TabWrapper>
    );
}

export default DiscoverTopTab;
