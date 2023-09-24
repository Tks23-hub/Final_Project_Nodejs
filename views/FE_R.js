const express = require('express');
const router = express.Router()
module.exports = router;

router.get("/",(req, res) => {
    res.render("mainPage", {pageTitle:"בוקר טוב"});
});
router.get("/enter-leave",(req, res) => {
    res.render("enter-leave", {pageTitle:"בוקר טוב"});
});

router.get("/shifts",(req, res) => {
    res.render('shifts', { workers: "workers" });
});
