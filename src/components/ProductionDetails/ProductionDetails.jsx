import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

function ProductionDetails() {
    console.log('in ProductionDetails');

    const dispatch = useDispatch();

    const [startTime, setStartTime] = useState('');
    console.log('start time is:', startTime);
    const [endTime, setEndTime] = useState('');
    console.log('end time is:', endTime);

    const selectedProduction = useSelector(store => store.setSelectedProduction);
    console.log('selected production is:', selectedProduction);

    const productionRehearsals = useSelector(store => store.setProductionRehearsals);
    console.log('rehearsals are:', productionRehearsals);


    const fetchProductionRehearsals = () => {
        dispatch({
            type: 'FETCH_PRODUCTION_REHEARSALS',
            payload: selectedProduction.id
        })
    }

    const handleSubmit = () => {
        console.log('in handleSubmit');
        dispatch({
            type:'CREATE_REHEARSAL',
            payload: {
                start_time: startTime,
                end_time: endTime,
                production_id: selectedProduction.id,
                production_name: selectedProduction.production_name
            }
        })
        fetchProductionRehearsals();
    }

    useEffect(() => {
        fetchProductionRehearsals();
    }, [])


    const onSelect = (rehearsal) => {
        dispatch({
            type: 'SET_SELECTED_REHEARSAL',
            payload: rehearsal
        })
    }



    return (
        <>
            <h1>{selectedProduction.production_name}</h1>

            <h3><u>Rehearsals</u></h3>
            {productionRehearsals.map(rehearsal => {
                return(
                    <div key={rehearsal.id}>
                        <Link to="/rehearsal/details" onClick={()=>onSelect(rehearsal)}>
                            <h5>
                                    {moment(rehearsal.start_time).format('MM-DD-YY')}
                            </h5>
                        </Link>
                        <h5>{moment(rehearsal.start_time).format('h:mm a')} - {moment(rehearsal.end_time).format('h:mm a')}</h5>
                    </div>
                )
            })}

            <label htmlFor="startTime">Start time:</label>
            <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                min="2022-02-08T18:00"
                max="2022-03-25T23:59"    
                onChange={event => setStartTime(event.target.value)}
            />

            <label htmlFor="endTime">End time:</label>
            <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                min="2022-02-08T18:00"
                max="2022-03-25T23:59"  
                onChange={event => setEndTime(event.target.value)}  
            />

            <button onClick={handleSubmit}>Submit</button>
        
        </>
    )
}

export default ProductionDetails;