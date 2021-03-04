import React from 'react'
import { ToolbarElement } from './ToolbarElements'
import { Link } from "react-router-dom";

const Toolbar = () => {
    return (
        <ToolbarElement>
            <ul>
                <li>
					<Link to="/"><i class="fas fa-home"></i>Home</Link>
				</li>
                <li><Link to="/discover"><i class="fas fa-search-dollar"></i>Discover</Link></li>
                <li><Link to="/social"><i class="fas fa-users"></i>Social</Link></li>
                <li><Link to="/profile"><i class="fas fa-user-circle"></i>Profile</Link></li>
            </ul>
        </ToolbarElement>
    )
}

export default Toolbar
