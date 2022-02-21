import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import swal from 'sweetalert';
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
    init("user_3GYNO1mUdxArTOYsVk7dR");

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


    const sendEmail = (rehearsal) => {

        
        let templateParams = {
            email: rehearsal.email,
            date: moment(rehearsal.start_time).format('MM-DD-YYYY'),
            startTime: moment(rehearsal.start_time).format('h:mm a'),
            endTime: moment(rehearsal.end_time).format('h:mm a'),
            act: rehearsal.act,
            scene: rehearsal.scene,
            pages: rehearsal.pages,
            measures: rehearsal.measures,
        }

        let serviceID = 'service_fbrp49d';

        let templateID = 'template_si5tp6u';

        let userID = 'user_3GYNO1mUdxArTOYsVk7dR';
        
        emailjs.send(serviceID, templateID, templateParams, userID)
                .then((result) => {
                    console.log(result.text);
                    if(result.text==="OK") {
                        swal("Rehearsal notification has been sent!", {
                            icon: "success",
                        })
                    }
                }).catch((error) => {
                    console.log(error.text);
                });
    }


    const deleteAlert = (rehearsal) => {
        swal({
            title: "Are you sure you want to delete this rehearsal?",
            text: "Once deleted, you will not be able to recover the data!",
            icon: "warning",
            buttons: {
                cancel: "Cancel",
                delete: {
                    text: "Delete",
                    value: "delete"
            },
        }})
            .then((value) => {
                switch(value) {
                    case "delete":
                        deleteRehearsal(rehearsal);
                        swal(
                            "The rehearsal has been deleted.",
                            {icon: "success"})
                        break;
                    case "cancel":
                        swal("The rehearsal was not deleted.");
                        break;
              }
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
                        marginBottom: '30px',
                        marginTop: '20px'
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
                            <TableCell 
                                className="tableCell" 
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                Send Email
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
                                            onClick={() => deleteAlert(rehearsal)}
                                        >
                                        </DeleteIcon>
                                    </TableCell>
                                    <TableCell 
                                        className="tableCell" 
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                        }}
                                    >
                                        <Button 
                                            variant="contained"
                                            sx={{
                                                fontFamily: 'Josefin Slab',
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                background: '#191970'
                                            }}
                                            onClick={() => sendEmail(rehearsal)}
                                        >
                                            Send
                                        </Button>
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

