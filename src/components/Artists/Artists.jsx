import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function Artists() {
    console.log('in Artists');

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const onBack = () => {
        window.history.back();
    }

    const handleSubmit = () => {
        console.log('in handleSubmit');
        dispatch({
            type: 'CREATE_ARTIST',
            payload: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phone
            }
        })
    }


    return (
        <>
            <h3><u>All Artists</u></h3>

            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                </tbody>
            </table>

            <h3><u>Add Artists</u></h3>

            <input
                type="text"
                placeholder="First Name"
                onChange={event => setFirstName(event.target.value)}
            />

            <input
                type="text"
                placeholder="Last Name"
                onChange={event => setLastName(event.target.value)}
            />

            <input
                type="text"
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}
            />

            <input
                type="text"
                placeholder="Phone"
                onChange={event => setPhone(event.target.value)}
            />

            <button onClick={handleSubmit}>Submit</button>

            <div>
                <button onClick={onBack}>Back</button>
            </div>
        </>
    )
}


export default Artists;