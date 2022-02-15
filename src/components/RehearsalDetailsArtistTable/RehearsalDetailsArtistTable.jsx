import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function RehearsalDetailsArtistTable() {

    const dispatch = useDispatch();

    useEffect(() => {
        fetchArtistsForRehearsal();
    }, [selectedArtists]);

    const selectedArtists = useSelector(store => store.setArtistsForRehearsal);
    console.log('selected artists are:', selectedArtists);

    const rehearsal = useSelector(store => store.setSelectedRehearsal);
    console.log('rehearsal id is:', rehearsal.id);


    const fetchArtistsForRehearsal = () => {
        dispatch({
            type: 'FETCH_ARTISTS_FOR_REHEARSAL',
            payload: rehearsal.id
        })
    }

    return(
        <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedArtists.map(selectedArtist => {
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
            </table>

    )
}


export default RehearsalDetailsArtistTable;