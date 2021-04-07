import React, { useState } from 'react';

import { EmployeeWrapper } from './EmployeeCardElements';
import { GenericVestBtn } from '../../../../shared/button/ButtonElements';

const EmployeeCard = ({ email, i, deleteFunc }) => {
    const [open, setOpen] = useState(false);
    return (
        <EmployeeWrapper i={i} open={open}>
            <div className="wrapper">
                <p>{email}</p>
                <i
                    className="fas fa-caret-down"
                    onClick={() => setOpen(!open)}
                ></i>
            </div>
            <div className="toolbar">
                <GenericVestBtn
                    onClick={() => deleteFunc(email)}
                    pad="8px"
                    border="2px solid var(--primary)"
                    br="10px"
                    bg="none"
                    co="var(--primary)"
                >
                    DELETE
                </GenericVestBtn>
            </div>
        </EmployeeWrapper>
    );
};

export default EmployeeCard;
