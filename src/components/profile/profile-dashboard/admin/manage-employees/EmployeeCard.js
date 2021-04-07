import React, { useState } from 'react';

import { EmployeeWrapper } from './EmployeeCardElements';
import { GenericVestBtn } from '../../../../shared/button/ButtonElements';

const EmployeeCard = ({ email, i, removeUser, makeUserAdmin }) => {
    const [open, setOpen] = useState(false);
    return (
        <EmployeeWrapper i={i} open={open}>
            <div className="wrapper">
                <p>{email}</p>
                {open ? (
                    <i
                        className="fas fa-sort-up"
                        onClick={() => setOpen(!open)}
                    ></i>
                ) : (
                    <i
                        className="fas fa-caret-down"
                        onClick={() => setOpen(!open)}
                    ></i>
                )}
            </div>
            <div className="toolbar">
                <GenericVestBtn
                    onClick={() => removeUser(email)}
                    pad="8px"
                    border="2px solid var(--primary)"
                    br="10px"
                    bg="none"
                    co="var(--primary)"
                >
                    DELETE
                </GenericVestBtn>
                <GenericVestBtn
                    onClick={() => makeUserAdmin(email)}
                    pad="8px"
                    border="2px solid var(--primary)"
                    br="10px"
                    bg="none"
                    co="var(--primary)"
                >
                    MAKE ADMIN
                </GenericVestBtn>
            </div>
        </EmployeeWrapper>
    );
};

export default EmployeeCard;
