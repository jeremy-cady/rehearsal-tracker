
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (2048) NOT NULL,
    "last_name" VARCHAR (2048) NOT NULL,
    "auth_level" VARCHAR (2048) DEFAULT "ADMIN"
 );


CREATE TABLE "productions" (
    "id" SERIAL PRIMARY KEY,
    "production_name" VARCHAR (2048),
 );



CREATE TABLE "rehearsal" (
    "id" SERIAL PRIMARY KEY,
    "act" VARCHAR (2048),
    "scene" VARCHAR (2048),
    "page_numbers" VARCHAR (2048),
    "measures" VARCHAR (2048),
    "date" DATE (2048),
    "time" TIME (2048),
    "production_id" INTEGER FOREIGN KEY REFERENCES "production"(id),
);


CREATE TABLE "rehearsals_artists" (
    "rehearsal_id" INT, 
    FOREIGN KEY ("rehearsal_id") REFERENCES "rehearsal"(id),
    "artists_id" INT,
    FOREIGN KEY ("artists_id") REFERENCES "artists"(id)
);


CREATE TABLE "artists" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (2048),
    "last_name" VARCHAR (2048),
    "phone_number" VARCHAR (2048),
    "email" VARCHAR (2048)
);


