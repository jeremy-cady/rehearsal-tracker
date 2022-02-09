import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import './Productions.css';

function Productions() {
    const dispatch = useDispatch();
    const productions = useSelector(store => store.productions);
    console.log('productions are:', productions);

    const fetchProductions = () => {
            dispatch({
                type:'FETCH_PRODUCTIONS'
            });
    }

    useEffect(() => {
        fetchProductions();
    }, []);
    


    return (
        <>
            <h1><u>Productions</u></h1>
            {productions.map(production => {
                return (
                    <div key={production.id}>
                        <Link to="/production/details">{production.production_name}</Link>
                    </div>
                )
            })}
        </>

    )
}

export default Productions;