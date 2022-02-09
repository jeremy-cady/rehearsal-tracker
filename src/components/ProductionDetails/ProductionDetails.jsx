import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductionDetails() {
    console.log('in ProductionDetails');
    const dispatch = useDispatch();

    const [startTime, setStartTime] = useState('');
    console.log('start time is:', startTime);
    const [endTime, setEndTime] = useState('');
    console.log('end time is:', endTime);

    const selectedProduction = useSelector(store => store.setSelectedProduction);
    console.log('selected production is:', selectedProduction);

    const handleSubmit = () => {
        dispatch({
            type:'CREATE_REHEARSAL',
            payload: {
                start_time: startTime,
                end_time: endTime,
                production_id: selectedProduction.id
            }
        })
    }

    return (
        <>
            <h1>Production Name</h1>

            <h3><u>Rehearsals</u></h3>

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