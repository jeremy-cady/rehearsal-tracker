import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import './RehearsalMatrix.css';

import { 
    Table, 
    TableHead, 
    TableRow, 
    TableBody,
    Button, 
    Box } 
from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
            <h1 className="pageTitle">Rehearsal Matrix</h1>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Button 
                    variant="contained"
                    sx={{ 
                        color: 'white',
                        background: '#191970',
                        fontFamily: 'Josefin Slab',
                        margin: '10px',

                    }}
                    className="createRehearsalBtn"
                    onClick={onNext}
                >
                        Create A New Rehearsal
                </Button>
            </Box>
            

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                
            >
                <Table 
                    className="matrixTable"
                    sx={{
                        marginTop: "30px",
                        width: "1500px"
                    }}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                background: "#B0C4DE", 
                            }}>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rehearsals.map(rehearsal => {
                            return(
                                <TableRow key={rehearsal.id}>
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
                                    <td><DeleteIcon onClick={() => deleteRehearsal(rehearsal)}></DeleteIcon></td>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}


export default RehearsalMatrix;