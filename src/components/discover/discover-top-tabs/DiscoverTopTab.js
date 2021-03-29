import React from 'react' //changed! removed useState
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

import { TabBarElement } from './DiscoverTopTabElements';

const DiscoverTopTab = () => {
    return (
        <TabBarElement>
            <ul>
                <li>
                    <NavLink exact to={ROUTES.DISCOVER}>
                        <i className="fas fa-search-dollar"></i>
                        Discover
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
        </TabBarElement>
    );
}

export default DiscoverTopTab;
