import React from 'react'

import {EmployeeWrapper} from './EmployeeCardElements'

const EmployeeCard = ({email, i}) => {
    return (
        <EmployeeWrapper i={i}>
            <p>{email}</p>
            <span>X</span>
        </EmployeeWrapper>
    )
}

export default EmployeeCard
