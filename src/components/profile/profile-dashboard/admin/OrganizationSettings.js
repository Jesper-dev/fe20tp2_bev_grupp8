import React from 'react'

import { Title } from './OrganizationSettingsElements'
import ContentWrapper from '../../../shared/wrappers/ContentWrapper'
import ChangeLogo from './change-org-logo/ChangeLogo'
import AddEmployee from './add-employee/AddEmployee'

const OrganizationSettings = () => {
    return (
        <ContentWrapper>
            <Title>Org Settings</Title>
            <ChangeLogo />
            <AddEmployee />
        </ContentWrapper>
    )
}

export default OrganizationSettings
