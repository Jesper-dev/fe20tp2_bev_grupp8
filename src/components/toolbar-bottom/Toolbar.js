import React from 'react'
import { ToolbarElement } from './ToolbarElements'
import { Link } from "react-router-dom";

const Toolbar = () => {
    return (
        <ToolbarElement>
            <ul>
                <li>
					<Link to="/">Home</Link>
				</li>
                <li>DISCOVER</li>
                <li>SOCIAL</li>
                <li>PROFILE</li>
            </ul>
        </ToolbarElement>
    )
}

export default Toolbar
