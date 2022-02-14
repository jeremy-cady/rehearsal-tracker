import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import './RehearsalDetails.css';

function RehearsalDetails() {
    console.log('in RehearsalDetails');

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchArtists();
    }, []);

    const rehearsal = useSelector(store => store.setSelectedRehearsal);
    console.log('rehearsal id is:', rehearsal.id);

    const artists = useSelector(store => store.artistReducer);
    console.log('artists are:', artists);

    // const selectedArtistsList = useSelector(store => store.setSelectedArtistsList);
    // console.log('selectedArtistList is:', selectedArtistsList);
   

    const [act, setAct] = useState('');
    const [scene, setScene] = useState('');
    const [pages, setPages] = useState('');
    const [measures, setMeasures] = useState('');
    const [selectedArtistId, setSelectedArtistId] = useState('');
    

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


    const fetchSelectedArtistsList = () => {
        dispatch({
            type: 'FETCH_SELECTED_ARTISTS_LIST'
        })
    }

    const markArtistSelected = () => {
        console.log('artist id is:', selectedArtistId);
        dispatch({
            type: 'MARK_ARTIST_SELECTED',
            payload: {
                artist_id: Number(selectedArtistId),
                rehearsal_id: rehearsal.id
        }});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'ADD_REHEARSAL_CONTENT',
            payload: {
                act: act,
                scene: scene,
                page_numbers: pages,
                measures: measures,
                id: rehearsal.id,
            }
        })
        clearFields();
    }

    const clearFields = () => {
        setAct('');
        setScene('');
        setPages('');
        setMeasures('');
    }



    return(
        <>
    
            <h3><u>Add Artists To The Rehearsal</u></h3>
            <form>
                <select onChange={event => setSelectedArtistId(event.target.value)}>
                    <option></option>
                    {artists.map(artist => {
                        return(
                                <option key={artist.id} value={artist.id}>
                                    {artist.first_name} {artist.last_name}
                                </option>
                        )
                    })}
                </select>
                <button onClick={markArtistSelected}>Add</button>
            </form>

            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedArtistsList.map(selectedArtist => {
                            return (
                            <tr key={selectedArtist.id}>
                                <td>{selectedArtist.first_name} {selectedArtist.last_name}</td>
                                <td>{selectedArtist.email}</td>
                                <td>{selectedArtist.phone_number}</td>
                            </tr>
                            )
                        }  
                    )}
                </tbody>
            </table> */}

            <h3><u>Add Rehearsal Content</u></h3>
            <form>
                <input
                    type="text"
                    placeholder="Act"
                    value={act}
                    onChange={event => setAct(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Scene"
                    value={scene}
                    onChange={event => setScene(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Pages"
                    value={pages}
                    onChange={event => setPages(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Measures"
                    value={measures}
                    onChange={event => setMeasures(event.target.value)}
                />

                <div>
                    <button onClick={onBack}>⬅️Back</button>
                    <button onClick={onSubmit}>Submit</button>
                    <button onClick={onNext}>Artists Page➡️</button>
                </div>
            </form>

           
        
        
        </>
    )
}

export default RehearsalDetails;