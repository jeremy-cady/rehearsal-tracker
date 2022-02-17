import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import './Productions.css';

import { 
    Table, 
    TableHead, 
    TableRow, 
    TableBody,
    Button, 
    Box } 
from '@mui/material';

function Productions() {
    const dispatch = useDispatch();
    const productions = useSelector(store => store.productions);
    const history = useHistory();
    console.log('productions are:', productions);

    const fetchProductions = () => {
            dispatch({
                type:'FETCH_PRODUCTIONS'
            });
    }

    useEffect(() => {
        fetchProductions();
    }, []);

    const onSelect = (production) => {
        console.log('production is:', production.production_name);
        dispatch({
            type: 'SET_SELECTED_PRODUCTION',
            payload: production
        })
        history.push(`/production/details`);
    }
    


    return (
        <>
            <h1 className="pageTitle">Productions</h1>

            <Box className="linksBox">
                {productions.map(production => {
                    return (
                    
                            <div 
                                key={production.id}
                                className="productionTitle"
                            >   
                                <Link 
                                    onClick={()=>onSelect(production)}
                                    className="titleLink"
                                >
                                    {production.production_name}
                                </Link>
                            </div>
                
        
                    )
                })}
            </Box>

        </>

    )
}

export default Productions;