import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

function RehearsalMatrix() {
    const dispatch = useDispatch();

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



    return (
        <>
            <h1>Rehearsal Matrix</h1>

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
                    </tr>
                </thead>
                <tbody>
                    {rehearsals.map(rehearsal => {
                        return(
                            <tr key={rehearsal.id}>
                                <td>production name</td>
                                <td>{moment(rehearsal.start_time).format('MM-DD-YYYY')}</td>
                                <td>{moment(rehearsal.start_time).format('h:mm a')}</td>
                                <td>{moment(rehearsal.end_time).format('h:mm a')}</td>
                                <td>{rehearsal.act}</td>
                                <td>{rehearsal.scene}</td>
                                <td>{rehearsal.page_numbers}</td>
                                <td>{rehearsal.measures}</td>
                                <td>
                                    <select>
                                        <option></option>
                                        <option>option 1</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                    </select>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}


export default RehearsalMatrix;