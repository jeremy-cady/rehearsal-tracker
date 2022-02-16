import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import './ProductionDetails.css';

import { 
    Table, 
    TableHead, 
    TableRow, 
    TableBody,
    Button, 
    Box } 
from '@mui/material';

function ProductionDetails() {
    console.log('in ProductionDetails');

    const dispatch = useDispatch();
    const history = useHistory();

    const [startTime, setStartTime] = useState('');
    console.log('start time is:', startTime);
    const [endTime, setEndTime] = useState('');
    console.log('end time is:', endTime);

    const selectedProduction = useSelector(store => store.setSelectedProduction);
    console.log('selected production is:', selectedProduction);

    const productionRehearsals = useSelector(store => store.setProductionRehearsals);
    console.log('production rehearsals are:', productionRehearsals);

    const rehearsals = useSelector(store => store.rehearsals);
    console.log('rehearsals are:', rehearsals);


    const fetchRehearsals = () => {
        dispatch({
            type: 'FETCH_REHEARSALS'
        });
    }



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
    }

    useEffect(() => {
        fetchRehearsals();
        fetchProductionRehearsals();
    }, [])


    const onSelect = (rehearsal) => {
        dispatch({
            type: 'SET_SELECTED_REHEARSAL',
            payload: rehearsal
        })
    }


    const onBack = () => {
        window.history.back();
    }



    return (
        <>
            
            <h1 className="selectedProductionTitle">{selectedProduction.production_name}</h1>

            <Box className="calendarForm">
                <Box className="date1">
                    <label htmlFor="startTime">Start time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        min="2022-02-08T18:00"
                        max="2022-03-25T23:59"    
                        onChange={event => setStartTime(event.target.value)}
                    />

                </Box>
                
                <Box className="date2">
                <label htmlFor="endTime">End time:</label>
                <input
                    type="datetime-local"
                    id="endTime"
                    name="endTime"
                    min="2022-02-08T18:00"
                    max="2022-03-25T23:59"  
                    onChange={event => setEndTime(event.target.value)}  
                />

                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        background: "#191970",
                        fontFamily: "Josefin Slab",
                        marginLeft: "20px"
                      }}
                >
                    Submit
                </Button>
                </Box>
            </Box>

            <Box className="backBtn">
                <Button 
                    onClick={onBack}
                    variant="contained"
                    sx={{
                      background: "#191970",
                      fontFamily: "Josefin Slab"
                    }}
                >
                    Back
                </Button>
            </Box>

            <h3 className="rehearsalTitle">Rehearsals</h3>

            <Box className="rehearsalList" sx={{ width: "1300px" }}>
                {productionRehearsals.map(rehearsal => {
                    return(
                        <div key={rehearsal.id} className="rehearsalTimes">
                            <Link to="/rehearsal/details" onClick={()=>onSelect(rehearsal)}>
                                <h5>
                                        {moment(rehearsal.start_time).format('MM-DD-YY')}
                                </h5>
                            </Link>
                            <h5>{moment(rehearsal.start_time).format('h:mm a')} - {moment(rehearsal.end_time).format('h:mm a')}</h5>
                        </div>
                    )
                })}
            </Box>
        
        </>
    )
}

export default ProductionDetails;