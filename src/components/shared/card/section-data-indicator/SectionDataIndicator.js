import React from 'react';

import { ContentWrapper } from './SectionDataIndicatiorElements';

const SectionDataIndicator = ({ LabelsArr }) => {
    return (
        <>
            <ContentWrapper>
                <table>
                    <thead>
                        <tr>
                            {LabelsArr.map((item, i) => {
                                return <th key={i}>{item}</th>;
                            })}
                        </tr>
                    </thead>
                </table>
            </ContentWrapper>
        </>
    );
};

export default SectionDataIndicator;
