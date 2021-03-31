import React from 'react';
import { NavLink } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

import TabBarElement from './TabBarElement';

const TabBar = ({ tabs }) => {
    return (
        <TabBarElement>
            <ul>
				{tabs.map((tab, index) => {
					return(
						<li key={index}>
					    	<NavLink exact to={tab.link}>
								{tab.icon && tab.icon}
                        		{tab.label}
                    		</NavLink>
						</li>
					);
				})}
            </ul>
        </TabBarElement>
    );
};

export default TabBar;