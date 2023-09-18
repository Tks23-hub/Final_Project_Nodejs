const express = require('express');
const port = 7575;
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");

var db_M = require('./database');
global.db_pool = db_M.pool;

const fe_rtr = require('./Workers_List');
app.use('/workers', fe_rtr);

const workTime = require('./working_hours');
app.use('/workingHours', workTime);

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
