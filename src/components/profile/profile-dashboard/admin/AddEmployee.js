import React, {useState, useEffect, useContext} from 'react'
import { AddEmailWrapper } from './AddEmployeeElements'
import { FirebaseContext } from '../../../firebase/context';
const AddEmployee = () => {
    const [open, setOpen] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const firebase = useContext(FirebaseContext);

    const user = JSON.parse(localStorage.getItem('authUser'));
    let orgData;
    let emails;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addEmailToDb(emailValue)
    }

    const addEmailToDb = (email) => {
        let emailList = [];

        const emailsData = firebase.db.ref('organizations/' + user.organization + '/emails/list');
        console.log(emailsData)
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
        });
    }, [])
    
    return (
        <AddEmailWrapper open={open}>
            {open ? (
                <p onClick={() => setOpen(!open)}>-</p>
            ) : (
                <p onClick={() => setOpen(!open)}>+</p>
            )}
            <h3>List of employees:</h3>
            <div className="emailWrapper"></div>
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
