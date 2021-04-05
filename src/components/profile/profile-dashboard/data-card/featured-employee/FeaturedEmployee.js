import React, { useEffect, useState } from 'react';
import FeaturedEmployeeWrapper from './FeaturedEmployeeElements';

import { Link } from 'react-router-dom';

import * as ROUTES from '../../../../../constants/routes';

import { useSelector } from 'react-redux';

const FeaturedEmployee = () => {
    const OrganizationData = useSelector((state) => state.OrganizationData);

    // const [index, setIndex] = useState(0);
    const [featuredUser, setFeaturedUser] = useState();

    useEffect(() => {
        let highest = 0;
        OrganizationData.forEach((item) => {
            if (item.currency.currency > highest)
                highest = item.currency.currency;
        });

        let index = OrganizationData.findIndex(
            (item) => item.currency.currency == highest
        );

        if (index === -1) {
            index = 0;
        }

        // setIndex(index);
        setFeaturedUser(OrganizationData[index]);
    }, [OrganizationData]);

    return (
        <FeaturedEmployeeWrapper>
            {featuredUser ? (
                <div>
                    <div>
                        <h2>Employee of the week</h2>
                        <h3>
                            {featuredUser.username}
                            <i className="fas fa-crown"></i>
                        </h3>
                        <h4>{featuredUser.currency.currency.toFixed(2)} $</h4>
                        <p>
                            {featuredUser.username} made a whopping&nbsp;
                            <span>
                                {(
                                    ((featuredUser.currency.currency - 100000) /
                                        100000) *
                                    100
                                ).toFixed(2)}
                                %
                            </span>
                            &nbsp;profit this week!
                        </p>
                    </div>
                    <div>
                        <img src={featuredUser.picture.profile_pic} />
                        <Link to={`/user/${featuredUser.username}`}>
                            Profile
                        </Link>
                    </div>
                </div>
            ) : (
                'Loading'
            )}
        </FeaturedEmployeeWrapper>
    );
};

export default FeaturedEmployee;
