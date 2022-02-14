const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.body is:', req.body);
    
    const queryText = `
        INSERT INTO "rehearsals_artists"
            ("rehearsal_id", "artists_id")
        VALUES($1, $2)
        `;

    const queryParams = [
        req.body.artists_id,
        req.body.rehearsal_id
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