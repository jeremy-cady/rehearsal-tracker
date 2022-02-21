import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Artists.css';

import swal from 'sweetalert';

import { 
    Table, 
    TableHead, 
    TableRow, 
    TableBody,
    TableCell,
    Button, 
    Box,
    FormControl,
    FormGroup,
    TextField,
    InputLabel
 } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Artists() {
    console.log('in Artists');

    const dispatch = useDispatch();

    const artists = useSelector(store => store.artistReducer);
    console.log('artists are:', artists);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetchArtists();
    }, [])

    const fetchArtists = () => {
        dispatch({
            type: 'FETCH_ARTISTS'
        });
    }

    const onBack = () => {
        window.history.back();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('in handleSubmit');

        dispatch({
            type: 'CREATE_ARTIST',
            payload: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phone
            }
        })
        clearFields();
    }

    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
    }


    const deleteArtist = (artist) => {
        console.log('artist.id is: ', artist.id);
        dispatch({
            type: 'DELETE_ARTIST',
            payload: artist
        })
    }


    const deleteAlert = (artist) => {
        swal({
            title: "Are you sure you want to delete this artist from the database?",
            text: "Once deleted, you will not be able to recover the artist data!",
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
                        deleteArtist(artist);
                        swal(
                            "The artist has been deleted from the database.",
                            {icon: "success"})
                        break;
                    case "cancel":
                        swal("The artist was not deleted from the database.");
                        break;
              }
          })
    }


    

    return (
        <>
            <h1 className="allArtistsTitle">All Artists</h1>

            <Box className="addArtistForm">
                <h3 className="addNewArtistTitle">Add A New Artist</h3>

                <FormControl>

                    <FormGroup row={true}>

                        <Button 
                            onClick={onBack}
                            variant="contained"
                            sx={{
                                background: '#191970',
                                fontFamily: 'Josefin Slab',
                                marginRight: '10px'
                            }}
                        >
                            <ArrowBackIcon></ArrowBackIcon>
                            Back
                        </Button>

                        <TextField
                            className="artistInput"
                            label="First Name"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                marginLeft: '10px',
                                marginRight: '10px'
                            }}
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={event => setFirstName(event.target.value)}
                        >    
                        </TextField>
                        
                        <TextField
                            className="artistInput"
                            label="Last Name"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                marginLeft: '10px',
                                marginRight: '10px'
                            }}
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                        >
                        </TextField>

                        <TextField
                            className="artistInput"
                            label="Email"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                marginLeft: '10px',
                                marginRight: '10px'
                            }}
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        >
                        </TextField>

                        <TextField
                            className="artistInput"
                            label="Phone"
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                marginLeft: '10px',
                                marginRight: '10px'
                            }}
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                        >
                        </TextField>

                        <Button 
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                background: '#191970',
                                fontFamily: 'Josefin Slab',
                                marginLeft: '10px'
                            }}
                        >
                            Submit
                        </Button>

                    </FormGroup>

                </FormControl>

            </Box>

            <Box className="allArtistsTableBox">

                <Table 
                    className="allArtistsTable"
                    sx={{
                        width: '1400px',
                        marginBottom: '180px'
                    }}
                >
                    <TableHead>

                        <TableRow className="tableHeaderRow">

                            <TableCell 
                                className="tableCell"
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px'
                                }}
                            >
                                First Name
                            </TableCell>

                            <TableCell 
                                className="tableCell"
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px'
                                }}
                            >
                                Last Name
                            </TableCell>

                            <TableCell 
                                className="tableCell"
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px'
                                }}
                            >
                                Email
                            </TableCell>

                            <TableCell 
                                className="tableCell"
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px'
                                }}
                            >
                                Phone
                            </TableCell>

                            <TableCell 
                                className="tableCell"
                                sx={{
                                    fontFamily: 'Josefin Slab',
                                    textAlign: 'center',
                                    fontSize: '18px'
                                }}
                            >
                                Delete
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {artists.map(artist => {
                            return(
                                <TableRow key={artist.id} hover={true}>

                                    <TableCell
                                        className="tableCell"
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }}
                                    >
                                        {artist.first_name}
                                    </TableCell>

                                    <TableCell
                                        className="tableCell"
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }}
                                    >
                                        {artist.last_name}
                                    </TableCell>

                                    <TableCell
                                        className="tableCell"
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }}
                                    >
                                        {artist.email}
                                    </TableCell>

                                    <TableCell
                                        className="tableCell"
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }}
                                    >
                                        {artist.phone_number}
                                    </TableCell>

                                    <TableCell
                                        className="tableCell"
                                        sx={{
                                            fontFamily: 'Josefin Slab',
                                            textAlign: 'center',
                                            fontSize: '18px'
                                        }}
                                    >
                                        <DeleteIcon onClick={() => deleteAlert(artist)}></DeleteIcon>

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


export default Artists;