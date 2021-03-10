import React from 'react'
import NewsCard from '../card/news-card/NewsCard';

import { ContentWrapper } from './HomepageComponentsElements';

function NewsCardSection({array}) {
	return (
		<ContentWrapper>
			    <h3>Breaking News</h3>
                {array.map((item, index) => {
                    return (
                        <NewsCard
                            title={item.title}
                            key={index}
                            summary={item.summary}
                        />
                    );
                })}
		</ContentWrapper>
	)
}

export default NewsCardSection
