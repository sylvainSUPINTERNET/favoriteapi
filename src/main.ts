require('dotenv').config();

import { NextFunction, Request, Response } from "express";
import { createNodeAndRelationNodes } from "./neo/nodes/create";

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
})


app.listen(8080, () => {
    console.log("Start on port : 8080")
})