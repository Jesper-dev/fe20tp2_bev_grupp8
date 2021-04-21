import React from 'react';
import { NavLink } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import PostTabBarElement from './PostTabBarElement';

const PostTabBar = ({ tabs }) => {
    return (
        <PostTabBarElement>
            <ul>
				{tabs.map((tab, index) => {
					return(
						<li key={index}>
					    	<NavLink exact to={tab.link}>
								{/* {tab.icon} */}
                        		{tab.label}
                    		</NavLink>
						</li>
					);
				})}
            </ul>
        </PostTabBarElement>
    );
};

export default PostTabBar;