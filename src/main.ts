require('dotenv').config();

import { NextFunction, Request, Response } from "express";
import { createNodeAndRelationNodes } from "./neo/nodes/create";
import { searchNodeAndRelations } from "./neo/nodes/search";

const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');


app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/api/nodes', async ( req:Request , res: Response, next:NextFunction ) => {
    await createNodeAndRelationNodes(req.body);
    res.status(200).json(req.body);
});

app.get('/api/nodes/:nodeType', async ( req:Request , res: Response, next:NextFunction ) => {
    let data = await searchNodeAndRelations(req.params.nodeType);

    if ( data.records.length > 0 && data.records[0]._fields.length > 0 ) {
        let responseLabels = data.records[0]._fields.flatMap( (labels:string[]) => {
            return labels[0];
        }).map( (label:string) => {
            return { "label": label}
        })
        res.status(200).json({"result":responseLabels});
    } else {
        res.status(200).json({"result": []});
    }

});



app.listen(8080, () => {
    console.log("Start on port : 8080")
})