/* import React, { useState } from 'react' */
import NewsCard from '../card/news-card/NewsCard';

/* import MockNewsList from '../../../api/Mock/MockNewsList.json'; */

import { ContentWrapper } from './CustomComponentsElements';

function NewsCardSection({ array }) {
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
    );
}

export default NewsCardSection;
