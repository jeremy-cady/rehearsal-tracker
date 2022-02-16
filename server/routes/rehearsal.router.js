const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    
    const queryText = `
        SELECT 
            "productions".production_name AS production_name,
            "rehearsal".production_id AS production_id,
            "rehearsal".start_time AS start_time,
            "rehearsal".end_time AS end_time,
            "rehearsal".act AS act,
            "rehearsal".scene AS scene,
            "rehearsal".page_numbers AS pages,
            "rehearsal".measures AS measures,
            ARRAY_AGG("artists".first_name || ' ' || "artists".last_name) AS names,
	        ARRAY_AGG("artists".email) AS email,
	        ARRAY_AGG("artists".phone_number) AS phone
        FROM "productions"
        JOIN "rehearsal"
	        ON "productions".id = "rehearsal".production_id
        JOIN "rehearsals_artists"
	        ON "rehearsal".id = "rehearsals_artists".rehearsal_id
        JOIN "artists"
	        ON "rehearsals_artists".artist_id = "artists".id
        GROUP BY 
            "rehearsal".id,
            "productions".production_name,
            "rehearsal".production_id,
            "rehearsal".start_time,
            "rehearsal".end_time,
            "rehearsal".act,
            "rehearsal".scene,
            "rehearsal".page_numbers,
            "rehearsal".measures;
        `


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
            ("start_time", "end_time", "production_id")
        VALUES
            ($1, $2, $3);
        `;

    const queryParams = [
        req.body.start_time,
        req.body.end_time,
        req.body.production_id, 
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
    console.log('req.body is:', req.body);
    
    
    const queryText = `
        UPDATE "rehearsal"
        SET 
            "act" = $1, 
            "scene" = $2,
            "page_numbers" = $3,
            "measures" = $4
        WHERE "id" = $5;
        `;

    const queryParams = [
        req.body.act,
        req.body.scene,
        req.body.page_numbers,
        req.body.measures,
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