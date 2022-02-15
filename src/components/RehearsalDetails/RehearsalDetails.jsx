import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import RehearsalDetailsArtistForm from "../RehearsalDetailsArtistForm/RehearsalDetailsArtistForm";
import RehearsalDetailsArtistTable from "../RehearsalDetailsArtistTable/RehearsalDetailsArtistTable";
import RehearsalDetailsContentForm from "../RehearsalDetailsContentForm/RehearsalDetailsContentForm";
import './RehearsalDetails.css';

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
            <h1>{selectedProduction.production_name}</h1>
            <h3><u>Add Artists To The Rehearsal</u></h3>
            <RehearsalDetailsArtistForm />

            <h3><u>Added Artists</u></h3>
            <RehearsalDetailsArtistTable />

            <h3><u>Add Rehearsal Content</u></h3>
            <RehearsalDetailsContentForm />

           
        
        
        </>
    )
}

export default RehearsalDetails;