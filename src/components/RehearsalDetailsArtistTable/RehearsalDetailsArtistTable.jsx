import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './RehearsalDetailsArtistTable.css';

import { 
    Table, 
    TableHead, 
    TableRow, 
    TableBody,
    TableCell,
    Button, 
    Box } 
from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


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
        <Table 
            className="selectedArtistTable"
            sx={{
                width: '900px',
            }}
        >
                <TableHead>
                    <TableRow className="headerRow">
                        <TableCell 
                            className="tableCell" 
                            sx={{
                                fontFamily: 'Josefin Slab',
                                textAlign: 'center',
                            }}
                        >
                            Name
                        </TableCell>
                        <TableCell 
                            className="tableCell" 
                            sx={{
                                fontFamily: 'Josefin Slab',
                                textAlign: 'center',
                            }}
                        >
                            Email
                        </TableCell>
                        <TableCell 
                            className="tableCell" 
                            sx={{
                                fontFamily: 'Josefin Slab',
                                textAlign: 'center',
                            }}
                        >
                            Phone
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedArtists.map(selectedArtist => {
                            return (
                            <TableRow key={selectedArtist.id}>
                                <TableCell
                                    className="tableCell" 
                                    sx={{
                                        fontFamily: 'Josefin Slab',
                                        textAlign: 'center',
                                    }}
                                >
                                    {selectedArtist.first_name} {selectedArtist.last_name}
                                </TableCell>
                                <TableCell
                                    className="tableCell" 
                                    sx={{
                                        fontFamily: 'Josefin Slab',
                                        textAlign: 'center',
                                    }}
                                >
                                    {selectedArtist.email}
                                </TableCell>
                                <TableCell
                                    className="tableCell" 
                                    sx={{
                                        fontFamily: 'Josefin Slab',
                                        textAlign: 'center',
                                    }}
                                >
                                    {selectedArtist.phone_number}
                                </TableCell>
                            </TableRow>
                            )
                        }  
                    )}
                </TableBody>
            </Table>

    )
}


export default RehearsalDetailsArtistTable;