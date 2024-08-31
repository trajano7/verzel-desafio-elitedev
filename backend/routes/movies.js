const express = require('express');
const { hashPassword, isValidPassword } = require('../utils/authentication');

const router = express.Router();

router.get('/movies', async (req, res, next) => {
    const hash = await hashPassword("teste");
    console.log(hash);
    console.log(await isValidPassword("teste", hash));
    res.send("OLA BACKEND");
});

module.exports = router