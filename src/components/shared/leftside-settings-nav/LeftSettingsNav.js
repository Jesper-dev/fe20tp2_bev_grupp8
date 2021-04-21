import React from 'react'

import { NavLink } from 'react-router-dom';

import TabBarElement from './LeftSettingsNavElements';
import * as ROUTES from '../../../constants/routes';


const LeftSettingsNav = ({ tabs, NavTitle }) => {
    return (
        <TabBarElement>
            <ul>
                <li className="title">{NavTitle}</li>
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
    )
}

export default LeftSettingsNav
