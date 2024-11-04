import express from 'express';

import db from '../db/connection.js';

const router = express.Router();

//Retrieve and return a list of all item names
router.get("/", async (req, res) => {
    const options = {name: 1, _id: 0};

    let collection = await db.collection('items');
    let results = await collection.find({ }).project(options).toArray();

    res.send(results).status(200);
});

//Retrieve and return a list of item names that match the given filter
router.get("/filter/:type/:val", async (req, res) => {
    let type = req.params.type;
    let val = req.params.val;

    const options = {name: 1, _id: 0};

    let collection = await db.collection('items');
    
    let results = await collection.find({[type]: val}).project(options).toArray();

    res.send(results).status(200);
});

//Retrieve and return one specific item
router.get("/:item", async (req, res) => {
    let item = req.params.item;

    let collection = await db.collection('items');
    let results = await collection.find({"name": item}).toArray();
    results[0].quantity = 1;
    res.send(results[0]).status(200);
});

export default router;