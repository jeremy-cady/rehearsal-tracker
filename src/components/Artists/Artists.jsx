import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Artists() {
    console.log('in Artists');

    const dispatch = useDispatch();

    const artists = useSelector(store => store.artistReducer);
    console.log('artists are:', artists);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetchArtists();
    }, [])

    const fetchArtists = () => {
        dispatch({
            type: 'FETCH_ARTISTS'
        });
    }

    const onBack = () => {
        window.history.back();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

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
        clearFields();
    }

    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
    }


    const deleteArtist = (artist) => {
        console.log('artist.id is: ', artist.id);
        dispatch({
            type: 'DELETE_ARTIST',
            payload: artist
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
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {artists.map(artist => {
                        return(
                            <tr key={artist.id}>
                                <td>{artist.first_name}</td>
                                <td>{artist.last_name}</td>
                                <td>{artist.email}</td>
                                <td>{artist.phone_number}</td>
                                <td><button onClick={() => deleteArtist(artist)}>❌</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h3><u>Add A New Artists</u></h3>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                />

                <button>Submit</button>
            </form>

            <div>
                <button onClick={onBack}>⬅️Back</button>
            </div>
        </>
    )
}


export default Artists;