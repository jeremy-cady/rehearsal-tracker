const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('GET Productions');

    const queryText = `SELECT * FROM "productions"`

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log('result:', result.rows);
            
        })
        .catch((error) => {
            console.log('Error getting Productions', error);
            res.sendStatus(500);
        })

})

module.exports = router;