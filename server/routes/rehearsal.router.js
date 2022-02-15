const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    
    const queryText = `
        SELECT * FROM "rehearsal";`


    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('GET rehearsals failed', error);
            res.sendStatus(500);
        })
})


router.get('/:id', rejectUnauthenticated, (req, res) => {

    const queryText = `
        SELECT * FROM "rehearsal"
        WHERE "production_id" = $1;
        `;

    const queryParams = [
        req.params.id
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.send(result.rows)
            console.log('results are:', result.rows);
            
        }).catch(error => {
            console.log('GET specific production rehearsals failed', error);
            res.sendStatus(500);
        });
})



router.post ('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        INSERT INTO "rehearsal"
            ("start_time", "end_time", "production_id", "production_name")
        VALUES
            ($1, $2, $3, $4);
        `;

    const queryParams = [
        req.body.start_time,
        req.body.end_time,
        req.body.production_id, 
        req.body.production_name
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('POST error', error);
            res.sendStatus(500);
        })
});



router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('id is', req.params.id);
    
    const queryText = `
        UPDATE "rehearsal"
        SET 
            "act" = $1, 
            "scene" = $2,
            "page_numbers" = $3,
            "measures" = $4,
            "artists" = $5
        WHERE "id" = $6;
        `;

    const queryParams = [
        req.body.act,
        req.body.scene,
        req.body.page_numbers,
        req.body.measures,
        req.body.artists,
        req.params.id
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('PUT error', error);
            res.sendStatus(500);
        })
})



router.delete('/:id', (req, res) => {
    console.log('id is:', req.params.id);
    
    const queryText = `
        DELETE FROM "rehearsal"
        WHERE "id" = $1;
        `;

    const queryParams = [
        req.params.id
    ]

    pool.query(queryText, queryParams)
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('DELETE error', error);
            res.sendStatus(500);
        })
})


module.exports = router;