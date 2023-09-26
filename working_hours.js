const express = require('express');
const router = express.Router()
module.exports = router;


router.post("/AddStart", (req, res) => {
    let {Worker_id, Start_Shift} = req.body;
    let q = `INSERT INTO work_time (Worker_id, Start_Shift) VALUES ('${Worker_id}','${Start_Shift}' )`;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err.message});
        } else {
            res.status(200).json({message: "OK"});
        }
    });
});

router.post("/AddEnd", (req, res) => {
    let {Worker_id, End_Shift} = req.body;
    let q = `UPDATE work_time SET End_Shift = '${End_Shift}'  WHERE End_Shift IS NULL AND  Worker_id = ${Worker_id}`;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err.message});
        } else {
            res.status(200).json({message: "OK"});
        }
    });
});


router.get("/List", (req, res) => {
    let q = "SELECT * FROM `work_time`";

    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json(rows);
        }
    });
});

router.get("/List/:worker_id", (req, res) => {
    let workerID = req.params.worker_id;
    let q = `SELECT * FROM work_time WHERE Worker_id = ${workerID}`;

    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json(rows);
        }
    });
});


router.patch("/Edit/:row_id",(req, res) => {
    let id=req.params.row_id;
    let {Start_Shift, End_Shift} = req.body;


    let q=`UPDATE \`work_time\` SET End_Shift = '${End_Shift}',Start_Shift='${Start_Shift}' WHERE shift_id=${id} `;

    db_pool.query(q, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;
        }else{
            res.status(200).json({message: "OK"});
        }
    });
});

router.delete("/Del/:row_id",(req, res) => {
    let id=req.params.row_id;

    let q=`DELETE FROM \`work_time\` WHERE shift_id='${id}' `;

    db_pool.query(q, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
        }else{
            res.status(200).json({message: "OK"});
        }
    });
});



