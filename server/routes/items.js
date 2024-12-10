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

//Retrieve and return a list of item names that match both filters
router.get("/filter/both/:cat/:rar", async (req, res) => {
    let cat = req.params.cat;
    let rar = req.params.rar;

    const options = {name: 1, _id: 0};

    let collection = await db.collection('items');
    
    let results = await collection.find({category: cat, rarity: rar}).project(options).toArray();

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

router.post("/", async (req, res) => {

    let collection = await db.collection('items');
    let stats = {}

    if (req.body.stat_1_name !== "") {
        stats[req.body.stat_1_name] = [parseFloat(req.body.stat_1_value), parseFloat(req.body.stat_1_stack), req.body.stat_1_scaling]
    }
    if (req.body.stat_2_name !== "") {
        stats[req.body.stat_2_name] = [parseFloat(req.body.stat_2_value), parseFloat(req.body.stat_2_stack), req.body.stat_2_scaling]
    }

    let effects = []

    if (req.body.effect_1_description !== "") {
        let effect_1_stats = {}
        
            
        if (req.body.effect_1_stat_1_name !== "") {
            effect_1_stats[req.body.effect_1_stat_1_name] = [
                parseFloat(req.body.effect_1_stat_1_value), 
                parseFloat(req.body.effect_1_stat_1_stack),
                req.body.effect_1_stat_1_scaling
            ];
        }
        if (req.body.effect_1_stat_2_name !== "") {
            effect_1_stats[req.body.effect_1_stat_2_name] = [
                parseFloat(req.body.effect_1_stat_2_value), 
                parseFloat(req.body.effect_1_stat_2_stack),
                req.body.effect_1_stat_2_scaling
            ];
        }

        effects.push(
            {
              type: req.body.effect_1_type,
              stats: effect_1_stats,
              description: req.body.effect_1_description  
            }
        )
    }

    if (req.body.effect_2_description !== "") {
        let effect_2_stats = {}
            
        if (req.body.effect_2_stat_1_name !== "") {
            effect_2_stats[req.body.effect_2_stat_1_name] = [
                parseFloat(req.body.effect_2_stat_1_value), 
                parseFloat(req.body.effect_2_stat_1_stack),
                req.body.effect_2_stat_1_scaling
            ];
        }
        if (req.body.effect_2_stat_2_name !== "") {
            effect_2_stats[req.body.effect_2_stat_2_name] = [
                parseFloat(req.body.effect_2_stat_2_value), 
                parseFloat(req.body.effect_2_stat_2_stack),
                req.body.effect_2_stat_2_scaling
            ];
        }

        effects.push(
            {
                type: req.body.effect_2_type,
                stats: effect_2_stats,
                description: req.body.effect_2_description  
            }
        );
    }

    await collection.insertOne({
        name: req.body.name,
        rarity: req.body.rarity,
        category: req.body.category,
        stats: stats,
        effects: effects
    });

    res.send("Wow!").status(200);
});


export default router;