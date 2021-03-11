/* import React, { useState } from 'react' */
import NewsCard from '../card/news-card/NewsCard';

/* import MockNewsList from '../../../api/Mock/MockNewsList.json'; */

import { ContentWrapper } from './HomepageComponentsElements';
import { useSelector } from 'react-redux';

function NewsCardSection({array}) {
    /* const [newsList, setNewsList] = useState([]); */
    const SeeNewsRedux = useSelector((state) => state.SeeNews);
	return (
		<ContentWrapper style={SeeNewsRedux ? { display: 'block' } : { display: 'none' }}>
			    <h3>Breaking News</h3>
                {array.map((item, index) => {
                    return (
                        <NewsCard
                            title={item.title}
                            summary={item.summary}
                            key={index}
                        />
                    );
                })}
		</ContentWrapper>
	)
}

export default NewsCardSection
