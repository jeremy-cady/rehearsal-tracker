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
    TableCell,
    Button, 
    Box,
    Select,
    MenuItem,
} from '@mui/material';
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
        console.log('delete', rehearsal.id);
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
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Production
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Date
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Start Time
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                End Time
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Act
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Scene
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Pages
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Measures
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Artists
                            </TableCell>
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rehearsals.map(rehearsal => {
                            return(
                                <TableRow key={rehearsal.id}>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {rehearsal.production_name}
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {moment(rehearsal.start_time).format('MM-DD-YYYY')}
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {moment(rehearsal.start_time).format('h:mm a')}
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {moment(rehearsal.end_time).format('h:mm a')}
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {rehearsal.act}
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {rehearsal.scene}
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {rehearsal.pages}
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {rehearsal.measures}
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                       <Select>
                                           <MenuItem></MenuItem>
                                           {rehearsal.names.map(name => {
                                               return(
                                                    <MenuItem
                                                        sx={{
                                                            fontFamily: 'Josefin Slab',
                                                            fontSize: '18px',
                                                        }}
                                                    >
                                                       {name}
                                                    </MenuItem>
                                               )                                                   
                                               })
                                           })
                                       </Select>
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        <DeleteIcon 
                                            onClick={() => deleteRehearsal(rehearsal)}
                                        >
                                        </DeleteIcon>
                                    </TableCell>
            
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

