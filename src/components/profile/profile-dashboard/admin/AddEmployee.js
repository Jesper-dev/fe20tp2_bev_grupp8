import React, {useState, useEffect, useContext} from 'react'
import { AddEmailWrapper } from './AddEmployeeElements'
import { FirebaseContext } from '../../../firebase/context';
const AddEmployee = () => {
    const [open, setOpen] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [employeeList, setEmployeeList] = useState([])
    const firebase = useContext(FirebaseContext);

    const user = JSON.parse(localStorage.getItem('authUser'));
    let orgData; //remove?
    //let emails; //remove?

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!emailValue)return
        addEmailToDb(emailValue)
    }

    const addEmailToDb = (email) => {
        //let emailList = []; //remove?

        const emailsData = firebase.db.ref('organizations/' + user.organization + '/emails/list');
        if (emailsData === null) {
            return;
        }

        let list = [];
        emailsData.on('value', (snapshot) => {
            list = snapshot.val();
            // if(emails == null) {
            //     return;
            // }
        });

        const emailObj = {
            email: email
        };

        list.push(emailObj)
        firebase.db.ref('organizations/' + user.organization + '/emails').set({
            list
        })
        setEmailValue('')
    }


    useEffect(() => {
        const organization = firebase.db.ref('organizations/' + user.organization);
        organization.on('value', (snapshot) => {
            orgData = snapshot.val();
            if (!orgData) return;
            setEmployeeList(orgData.emails.list)
        });
    }, [])

    return (
        <AddEmailWrapper open={open}>
            {open ? (
                <p onClick={() => setOpen(!open)}>-</p>
            ) : (
                <p onClick={() => setOpen(!open)}>+</p>
            )}
            <h3>List of employees</h3>
            <div className="emailWrapper">
                {employeeList.map((item, i) => {
                    return (
                        <span
                            style={
                                i % 2 === 0
                                    ? { background: 'var(--body-third)' }
                                    : { background: 'var(--body)' }
                            }
                            key={i}
                        >
                            {item.email}
                        </span>
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
        </AddEmailWrapper>
    );
}

export default AddEmployee
