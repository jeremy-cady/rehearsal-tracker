const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        INSERT INTO "artists"
            ("first_name", "last_name", "phone_number", "email")
        VALUES
            ($1, $2, $3, $4);
        `;

    const queryParams = [
        req.body.first_name,
        req.body.last_name,
        req.body.phone_number,
        req.body.email
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('POST error', error);
            res.sendStatus(500);
        })
});

module.exports = router;