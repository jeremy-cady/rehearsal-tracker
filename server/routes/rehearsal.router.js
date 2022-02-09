const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post ('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        INSERT INTO "rehearsal"
            (start_time, end_time, production_id)
        VALUES
            ($1, $2, $3);
        `;

    const queryParams = [
        req.body.start_time,
        req.body.end_time,
        req.body.production_id
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('POST error', error);
            res.sendStatus(500);
        })
});