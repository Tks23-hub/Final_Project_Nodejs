const express = require('express');
const router = express.Router()
module.exports = router;


router.post("/Add", (req, res) => {
    let {Worker_FirstName, Worker_LastName} = req.body;

    let q = `INSERT INTO workers( Worker_FirstName, Worker_LastName) VALUES ('${Worker_FirstName}','${Worker_LastName}')`;

    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})

        } else {
            res.status(200).json({message: "OK"});

        }

    });



});


router.patch("/Edit/:row_id",(req, res) => {
    let id = req.params.row_id;
    let { Worker_FirstName, Worker_LastName } = req.body;

    let q = `UPDATE workers SET Worker_FirstName = '${Worker_FirstName}', Worker_LastName = '${Worker_LastName}' WHERE Worker_id = ${id}`;

    db_pool.query(q, function(err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: "OK" });
        }
    });
});


router.delete("/Del/:row_id", (req, res) => {
    let id = req.params.row_id;
    let removeShiftsQuery = `DELETE FROM work_time WHERE Worker_id='${id}'`;

    db_pool.query(removeShiftsQuery, function (err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            let deleteWorkerQuery = `DELETE FROM workers WHERE Worker_id='${id}'`;
            db_pool.query(deleteWorkerQuery, function (err, rows, fields) {
                if (err) {
                    res.status(500).json({ message: err });
                } else {
                    res.status(200).json({ message: "OK" });
                }
            });
        }
    });
});



router.get("/List", (req, res) => {

    let q = "SELECT * FROM `workers` ";

    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})

        } else {
            res.status(200).json(rows);
        }
    });
});



