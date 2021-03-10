/* import React, { useState } from 'react' */
import NewsCard from '../card/news-card/NewsCard';

/* import MockNewsList from '../../../api/Mock/MockNewsList.json'; */

import { ContentWrapper } from './HomepageComponentsElements';

function NewsCardSection({array}) {
    /* const [newsList, setNewsList] = useState([]); */

	return (
		<ContentWrapper>
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
