import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function RehearsalDetailsArtistForm() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchArtists();
        fetchArtistsForRehearsal();
    }, [selectedArtists]);

    const [selectedArtistId, setSelectedArtistId] = useState('');

    const artists = useSelector(store => store.artistReducer);
    console.log('artists are:', artists);

    const rehearsal = useSelector(store => store.setSelectedRehearsal);
    console.log('rehearsal id is:', rehearsal.id);

    const selectedArtists = useSelector(store => store.setArtistsForRehearsal);
    console.log('selected artists are:', selectedArtists);

    const fetchArtists = () => {
        dispatch({
            type: 'FETCH_ARTISTS'
        })
    }

    const fetchArtistsForRehearsal = () => {
        dispatch({
            type: 'FETCH_ARTISTS_FOR_REHEARSAL',
            payload: rehearsal.id
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

    return(
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
    )
}


export default RehearsalDetailsArtistForm;