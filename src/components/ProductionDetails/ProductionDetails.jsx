import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function ProductionDetails() {
    console.log('in ProductionDetails');

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    console.log('start time is:', startTime);
    console.log('end time is:', endTime);

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
        
        </>
    )
}

export default ProductionDetails;