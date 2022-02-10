import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './RehearsalDetails.css';

function RehearsalDetails() {
    console.log('in RehearsalDetails');

    const history = useHistory();
    const dispatch = useDispatch();

    const artists = useSelector(store => store.artistReducer);
    console.log('artists are:', artists);

    const selectedArtists = useSelector(store => store.setSelectedArtist);
    console.log('selected artists are:', selectedArtists);

    const [act, setAct] = useState('');
    const [scene, setScene] = useState('');
    const [pages, setPages] = useState('');
    const [measures, setMeasures] = useState('');
    const [selectedRehearsalArtist, setSelectedRehearsalArtist] = useState('');

    useEffect(() => {
        fetchArtists();
    }, []);

    const onBack = () => {
        window.history.back();
    }

    const onNext = () => {
        history.push('/artists')
    }

    const fetchArtists = () => {
        dispatch({
            type: 'FETCH_ARTISTS'
        })
    }

    const onSelect = (artist) => {
        console.log('artist is:', artist);
        dispatch({
            type: 'SET_SELECTED_ARTIST',
            payload: artist
        });
    }



    return(
        <>
            <h3><u>Add Rehearsal Content</u></h3>
            <input
                type="text"
                placeholder="Act"
                onChange={event => setAct(event.target.value)}
            />

            <input
                type="text"
                placeholder="Scene"
                onChange={event => setScene(event.target.value)}
            />

            <input
                type="text"
                placeholder="Pages"
                onChange={event => setPages(event.target.value)}
            />

            <input
                type="text"
                placeholder="Measures"
                onChange={event => setMeasures(event.target.value)}
            />

            <h3><u>Add Artists To The Rehearsal</u></h3>
            <select>
                {artists.map(artist => {
                    return(
                        <option key={artist.id}>
                            {artist.first_name} {artist.last_name}
                        </option>
                    )
                })}
            </select>
            <button onClick={onSelect}>Add</button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {selectedArtists.map(selectedArtist => {
                        return(
                            <tr key={selectedArtist.id}>
                                <td>{selectedArtist.first_name} {selectedArtist.last_name}</td>
                                <td>{selectedArtist.email}</td>
                                <td>{selectedArtist.phone_number}</td>
                            </tr>
                        )
                    })}
                </tbody> */}
            </table>

            <button onClick={onBack}>⬅️Back</button>
            <button>Submit</button>
            <button onClick={onNext}>Artists Page➡️</button>
        
        
        </>
    )
}

export default RehearsalDetails;