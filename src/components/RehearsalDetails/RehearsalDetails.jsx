import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import RehearsalDetailsArtistForm from "../RehearsalDetailsArtistForm/RehearsalDetailsArtistForm";
import RehearsalDetailsArtistTable from "../RehearsalDetailsArtistTable/RehearsalDetailsArtistTable";
import RehearsalDetailsContentForm from "../RehearsalDetailsContentForm/RehearsalDetailsContentForm";
import './RehearsalDetails.css';

import { 
    Table, 
    TableHead, 
    TableRow, 
    TableBody,
    Button, 
    Box } 
from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function RehearsalDetails() {
    console.log('in RehearsalDetails');

    const rehearsal = useSelector(store => store.setSelectedRehearsal);
    console.log('rehearsal id is:', rehearsal.id);

    const selectedProduction = useSelector(store => store.setSelectedProduction);
    console.log('selected production is:', selectedProduction);

    const selectedArtists = useSelector(store => store.setArtistsForRehearsal);
    console.log('selected artists are:', selectedArtists);
   






    return(
        <>
            <h1 className="productionTitle">{selectedProduction.production_name}</h1>
            {selectedProduction ? 
            
                <div>
                    <Box className="artistFormBox">
                        <h3 className="addArtistTitle">Add Artists To The Rehearsal</h3>
                        <RehearsalDetailsArtistForm />
                    </Box>

                    <Box className="artistTableBox">
                        <h3 className="addedArtistsTitle">Added Artists</h3>
                        <RehearsalDetailsArtistTable />
                    </Box>

                    <Box className="rehearsalContentBox">
                        <h3 className="addContentTitle">Add Rehearsal Content</h3>
                        <RehearsalDetailsContentForm />
                    </Box>
                </div>
            :
            
                
                <Alert
                    severity="warning"
                >
                    Please select a Production from the Production page.
                </Alert>
               
        
            }
        
        </>
    )
}

export default RehearsalDetails;