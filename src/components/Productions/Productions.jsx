import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import './Productions.css';

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
            <h1><u>Productions</u></h1>
            {productions.map(production => {
                return (
                    <div key={production.id}>
                        <Link onClick={()=>onSelect(production)}>{production.production_name}</Link>
                        {console.log('production id is:', production.id)}
                    </div>
                )
            })}
        </>

    )
}

export default Productions;