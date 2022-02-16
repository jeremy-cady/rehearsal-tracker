import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import './RehearsalDetailsContentForm.css';

import { 
    Button, 
    Box, 
    FormControl,
    FormGroup,
    Input,
    TextField,
} 
from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function RehearsalDetailsContentForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchArtistsForRehearsal();
    }, []);

    const rehearsal = useSelector(store => store.setSelectedRehearsal);
    console.log('rehearsal id is:', rehearsal.id);

    const selectedProduction = useSelector(store => store.setSelectedProduction);
    console.log('selected production is:', selectedProduction);

    const selectedArtists = useSelector(store => store.setArtistsForRehearsal);
    console.log('selected artists are:', selectedArtists);

    const [act, setAct] = useState('');
    const [scene, setScene] = useState('');
    const [pages, setPages] = useState('');
    const [measures, setMeasures] = useState('');


    const onBack = () => {
        window.history.back();
    }

    const onNext = () => {
        history.push('/artists')
    }


    const fetchArtistsForRehearsal = () => {
        dispatch({
            type: 'FETCH_ARTISTS_FOR_REHEARSAL',
            payload: rehearsal.id
        })
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
        history.push('/rehearsalMatrix')
    }

    const clearFields = () => {
        setAct('');
        setScene('');
        setPages('');
        setMeasures('');
    }

    return(
        <FormControl>

            <FormGroup row={true} className="inputGroup">

                <TextField
                    className="contentInputField"
                    variant="outlined"
                    type="text"
                    placeholder="Act"
                    value={act}
                    onChange={event => setAct(event.target.value)}
                >
                </TextField>

                <TextField
                    className="contentInputField"
                    variant="outlined"
                    type="text"
                    placeholder="Scene"
                    value={scene}
                    onChange={event => setScene(event.target.value)}
                >
                </TextField>

                <TextField
                    className="contentInputField"
                    variant="outlined"
                    type="text"
                    placeholder="Pages"
                    value={pages}
                    onChange={event => setPages(event.target.value)}
                >
                </TextField>

                <TextField
                    className="contentInputField"
                    sx={{
                        fontFamily: 'Josefin Slab'
                    }}
                    variant="outlined"
                    type="text"
                    placeholder="Measures"
                    value={measures}
                    onChange={event => setMeasures(event.target.value)}
                >
                </TextField>

            </FormGroup>

            <FormGroup row={true} className="buttonGroup">

                <Button 
                    onClick={onBack}
                    variant="contained"
                    className="contentFormGroupBtn"
                    sx={{
                        background: '#191970',
                        fontFamily: 'Josefin Slab'
                    }}
                >
                    <ArrowBackIcon></ArrowBackIcon>
                    Back
                </Button>

                <Button 
                    onClick={onSubmit}
                    variant="contained"
                    className="contentFormGroupBtn"
                    sx={{
                        background: '#191970',
                        fontFamily: 'Josefin Slab',
                        marginLeft: '50px',
                        marginRight: '50px'
                    }}
                >
                    Submit
                </Button>

                <Button
                    onClick={onNext}
                    variant="contained"
                    className="contentFormGroupBtn"
                    sx={{
                        background: '#191970',
                        fontFamily: 'Josefin Slab'
                    }}
                >
                    Artists Page
                    <ArrowForwardIcon></ArrowForwardIcon>
                </Button>

            </FormGroup>

        </FormControl>

    )
}


export default RehearsalDetailsContentForm;