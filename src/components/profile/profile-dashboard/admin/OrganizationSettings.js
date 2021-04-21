import React from 'react';

import { Title } from './OrganizationSettingsElements';
import ContentWrapper from '../../../shared/wrappers/ContentWrapper';
import ChangeLogo from './change-org-logo/ChangeLogo';
import AddEmployee from './manage-employees/ManageEmployees';
import ChangeColor from './change-color/ChangeColor'

const OrganizationSettings = () => {
    return (
        <ContentWrapper>
            <Title>Org Settings</Title>
            <ChangeLogo />
            <AddEmployee />
            <ChangeColor />
        </ContentWrapper>
    );
};

export default OrganizationSettings;
