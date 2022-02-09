import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function RehearsalDetails() {
    console.log('in RehearsalDetails');

    const [act, setAct] = useState('');
    const [scene, setScene] = useState('');
    const [pages, setPages] = useState('');
    const [measures, setMeasures] = useState('');

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
        
        
        </>
    )
}

export default RehearsalDetails;