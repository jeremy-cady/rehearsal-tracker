import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function RehearsalMatrix() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        fetchRehearsals();
    }, []);

    const rehearsals = useSelector(store => store.rehearsals);
    console.log('rehearsals are:', rehearsals);

    const fetchRehearsals = () => {
        dispatch({
            type: 'FETCH_REHEARSALS'
        });
    }

    const onNext = () => {
        history.push('/productions')
    }

    const deleteRehearsal = (rehearsal) => {
        console.log('delete', rehearsal);
        dispatch({
            type: 'DELETE_REHEARSAL',
            payload: rehearsal
        })
    }



    return (
        <>
            <h1>Rehearsal Matrix</h1>

            <button onClick={onNext}>Create A New Rehearsal</button>

            <table>
                <thead>
                    <tr>
                        <th>Production</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Act</th>
                        <th>Scene</th>
                        <th>Pages</th>
                        <th>Measures</th>
                        <th>Artists</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {rehearsals.map(rehearsal => {
                        return(
                            <tr key={rehearsal.id}>
                                <td>{rehearsal.production_name}</td>
                                <td>{moment(rehearsal.start_time).format('MM-DD-YYYY')}</td>
                                <td>{moment(rehearsal.start_time).format('h:mm a')}</td>
                                <td>{moment(rehearsal.end_time).format('h:mm a')}</td>
                                <td>{rehearsal.act}</td>
                                <td>{rehearsal.scene}</td>
                                <td>{rehearsal.page_numbers}</td>
                                <td>{rehearsal.measures}</td>
                                <td>{rehearsal.artists}</td>
                                {/* <td>
                                    <select>
                                        <option></option>
                                        {rehearsal.artists.map(artist => {
                                            return(
                                                <option key={artist.id}>
                                                    {artist.first_name} {artist.last_name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </td> */}
                                <td><button onClick={() => deleteRehearsal(rehearsal)}>❌</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}


export default RehearsalMatrix;