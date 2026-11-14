const pool = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const queries = await productQuery();

    res.status(200).json(queries);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const userQuery = await idQuery(id);
    res.status(200).json(userQuery);
});


async function productQuery() {
    const result = await pool.query(
        'SELECT * FROM products ORDER BY name'
    );
    return result.rows;
}

async function idQuery(id) {
    const result = await pool.query(
        'SELECT * FROM products WHERE id = $1', [id]
    );
    return result.rows[0];
}

module.exports = router;