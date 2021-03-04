import React from 'react'
import { ToolbarElement } from './ToolbarElements'
import { Link } from "react-router-dom";

import * as ROUTES from '../../../constants/routes';

const Toolbar = () => {
    return (
        <ToolbarElement>
            <ul>
                <li>
					<Link to={ROUTES.HOME}><i className="fas fa-home"></i>Home</Link>
				</li>
                <li><Link to={ROUTES.DISCOVER}><i className="fas fa-search-dollar"></i>Discover</Link></li>
                <li><Link to={ROUTES.SOCIAL}><i className="fas fa-users"></i>Social</Link></li>
                <li><Link to={ROUTES.PROFILE}><i className="fas fa-user-circle"></i>Profile</Link></li>
            </ul>
        </ToolbarElement>
    )
}

export default Toolbar;
