import React, { useState, useEffect, useContext } from 'react';
import { ManageWrapper } from './ManageEmployeesElements';
import { FirebaseContext } from '../../../../firebase';
import EmployeeCard from './EmployeeCard';
const AddEmployee = () => {
    const [open, setOpen] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [employeeList, setEmployeeList] = useState([]);
    // const [employeeID, setEmployeeID] = useState('');
    const firebase = useContext(FirebaseContext);

    const user = JSON.parse(localStorage.getItem('authUser'));
    let employeeID = ''
    let userData = {}

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailValue) return;
        addEmailToDb(emailValue, nameValue);
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
        findUser(email, 'makeAdmin');
        console.log(userData)
    };

    const findUser = (email, makeAdmin) => {
        let users = [];
        console.log('Email in findUser: ', email)
        firebase
            .organization(user.organization)
            .child('/users')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                let orgData = [];

                for (const key in data) {
                    const obj = {
                        id: key,
                        email: data[key].email,
                    };
                    users.push(obj);
                }

                let index = users.findIndex((x) => x.email == email);

                let foundObj = users[index];
                employeeID = foundObj.id
                if(makeAdmin == 'makeAdmin'){
                    updateEmployee(foundObj.id)
                }
                console.log(foundObj)
                userData = foundObj
                return foundObj;

            });

    };

    const updateEmployee = (id) => {
        console.log(id)
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

    const addEmailToDb = (email, name) => {
        firebase.organization(user.organization).child('/emailList').update({
            [name]: email
        })
        setEmailValue('');
        setNameValue('');
    };

    useEffect(() => {
        let orgData;
        firebase.organization(user.organization).child('/emailList').once('value', (snapshot) => {
            const data = snapshot.val()
            if (!data) return;
            let list = []

            for(const key in data) {
                list.push(data[key])
            }
            setEmployeeList(list);
            console.log(list)
        })
    }, [firebase.db, user.organization, nameValue]); //varning!

    return (
        <ManageWrapper>
            <h3>Manage employees</h3>
            <div className="emailWrapper">
                {employeeList.map((item, i) => {
                    return (
                        <EmployeeCard
                            key={i}
                            email={item}
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
                <label>
                    Add employee name:
                    <input
                        type="name"
                        placeholder="Ex. Magnus"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
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
