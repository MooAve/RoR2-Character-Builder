import express from 'express';

import db from '../db/connection.js';

const router = express.Router();

//Retrieve and return a list of all character names
router.get("/", async (req, res) => {
    const options = {name: 1, _id: 0};

    let collection = await db.collection('characters');
    let results = await collection.find({ }).project(options).toArray();

    res.send(results).status(200);
});

//Retrieve and return one specific character
router.get("/:character", async (req, res) => {
    let character = req.params.character;

    let collection = await db.collection('characters');
    let results = await collection.find({name: character}).toArray();

    results[0].stats.level = 1;               // "level" attribute used by client
    res.send(results[0]).status(200);
});

export default router;