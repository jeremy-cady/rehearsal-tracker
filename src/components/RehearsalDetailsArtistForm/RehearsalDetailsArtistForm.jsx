import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import './RehearsalDetailsArtistForm.css';

import { 
    Table, 
    TableHead, 
    TableRow, 
    TableBody,
    Button, 
    Box, 
    Select,
    MenuItem,
    FormControl,
    FormGroup,
} 
from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


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
        <Box className="addArtistFormBox">
            <FormControl className="addArtistForm">
                <FormGroup className="addArtistFormGroup" row={true}>
                    <Select 
                        onChange={event => setSelectedArtistId(event.target.value)}
                        className="artistSelect"
                        sx={{
                            width: '200px',
                            height: '40px',
                            fontFamily: 'Josefin Slab'
                        }}    
                    >
                        <MenuItem></MenuItem>
                        {artists.map(artist => {
                            return(
                                <MenuItem 
                                    key={artist.id} 
                                    value={artist.id}
                                    sx={{
                                        fontFamily: 'Josefin Slab'
                                    }}
                                >
                                    {artist.first_name} {artist.last_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                
                    <Button 
                        onClick={markArtistSelected}
                        variant='contained'
                        sx={{
                            background: '#191970',
                            fontFamily: 'Josefin Slab',
                            marginLeft: '40px'
                        }}
                    >
                        Add
                    </Button>

                </FormGroup>
                
            </FormControl>
        </Box>
    )
}


export default RehearsalDetailsArtistForm;