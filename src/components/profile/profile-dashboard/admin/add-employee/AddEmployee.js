import React, { useState, useEffect, useContext } from 'react';
import { ManageWrapper } from './AddEmployeeElements';
import { FirebaseContext } from '../../../../firebase';
import EmployeeCard from './EmployeeCard';
const AddEmployee = () => {
    const [open, setOpen] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [employeeList, setEmployeeList] = useState([]);
    const firebase = useContext(FirebaseContext);

    const user = JSON.parse(localStorage.getItem('authUser'));
    //let orgData; //changed! put it inside useEffect
    //let emails; //remove?

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailValue) return;
        addEmailToDb(emailValue);
    };

    const deleteEmailDb = (email) => {
        firebase
            .organization(user.organization)
            .child('/emails/list')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                let index = data.findIndex((x) => x.email === email);
                data.splice(index, 1);
                update(data);
            });
    };

    const update = (list) => {
        firebase.organization(user.organization).child('/emails').set({
            list,
        });
    };

    const addEmailToDb = (email) => {
        //TODO Gör om denna i sinom tid
        const emailsData = firebase.db.ref(
            'organizations/' + user.organization + '/emails/list'
        );
        if (emailsData === null) {
            return;
        }

        let list = [];
        emailsData.on('value', (snapshot) => {
            list = snapshot.val();
        });

        const emailObj = {
            email: email,
        };

        list.push(emailObj);
        firebase.db.ref('organizations/' + user.organization + '/emails').set({
            list,
        });
        setEmailValue('');
    };

    useEffect(() => {
        let orgData;
        // firebase.organization(user.organization)
        const organization = firebase.db.ref(
            'organizations/' + user.organization
        );
        organization.on('value', (snapshot) => {
            orgData = snapshot.val();
            if (!orgData) return;
            setEmployeeList(orgData.emails.list);
        });
    }, [firebase.db, user.organization]); //varning!

    return (
        <ManageWrapper>
            <h3>Manage employees</h3>
            <div className="emailWrapper">
                {employeeList.map((item, i) => {
                    return (
                        <EmployeeCard
                            key={i}
                            email={item.email}
                            i={i}
                            deleteFunc={deleteEmailDb}
                        />
                    );
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Add employee email:
                    <input
                        type="email"
                        placeholder="Ex. employee@letsvest.com"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                </label>
                <button>
                    <i className="fas fa-user-plus"></i>
                </button>
            </form>
        </ManageWrapper>
    );
};

export default AddEmployee;
