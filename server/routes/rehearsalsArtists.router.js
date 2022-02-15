const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
   
    const queryText = `
    SELECT 
        "artists".first_name,
        "artists".last_name,
        "artists".email,
        "artists".phone_number,
        "rehearsal".id AS rehearsalID
    FROM "artists"
    JOIN "rehearsals_artists"
        ON "artists".id = "rehearsals_artists".artist_id
    JOIN "rehearsal"
        ON "rehearsal".id = "rehearsals_artists".rehearsal_id
    WHERE "rehearsal".id = $1;
        `;

    const queryParams = [
        req.params.id
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows)
            console.log('results are:', result.rows);
            
        }).catch(error => {
            console.log('GET failed', error);
            res.sendStatus(500);
        })
})




router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('made it to post', req.body);
    
    const queryText = `
        INSERT INTO "rehearsals_artists"
            ("rehearsal_id", "artist_id")
        VALUES($1, $2)
        `;

    const queryParams = [
        req.body.rehearsal_id,
        req.body.artist_id
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('POST error', error);
            res.sendStatus(500);
        })
})

module.exports = router;