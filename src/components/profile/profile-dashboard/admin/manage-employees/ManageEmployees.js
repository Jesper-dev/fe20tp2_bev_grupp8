import React, { useState, useEffect, useContext } from 'react';
import { ManageWrapper } from './ManageEmployeesElements';
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

    const removeUser = (email) => {
        deleteEmailDb(email);

        let userData = findUser(email);
        console.log(user.id);
        firebase
            .organization(user.organization)
            .child(`/users/${userData.id}`)
            .remove();

        firebase.user(userData.id).update({
            organization: '',
        });
    };

    const makeUserAdmin = (email) => {
        let user = findUser(email);
        updateEmployee(user.id);
    };

    const findUser = (email) => {
        let users = [];
        firebase
            .organization(user.organization)
            .child('/users/')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                let orgData = [];

                for (const key in data) {
                    const obj = {
                        id: key,
                        email: data[key].email,
                    };
                    users.push(obj);
                }
            });

        let index = users.findIndex((x) => x.email === email);
        let foundObj = users[index];
        return foundObj;
    };

    const updateEmployee = (id) => {
        firebase
            .organization(user.organization)
            .child(`/users/${id}/roles`)
            .set({
                ADMIN: 'ADMIN',
            });

        firebase.user(id).child('/roles').set({
            ADMIN: 'ADMIN',
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
                            removeUser={removeUser}
                            makeUserAdmin={makeUserAdmin}
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
