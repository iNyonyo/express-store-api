const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
    const customerQuery = await cusQuery();

    res.status(200).json(customerQuery);
});

router.get('/:id/orders', async (req, res) => {
    const customerId = req.params.id;
    const order_query = await ordersQuery(customerId);

    res.status(200).json(order_query);
});

async function cusQuery() {
    const result = await pool.query(
        'SELECT * FROM customers ORDER BY first_name'
    );
    return result.rows;
}

async function ordersQuery(id) {
    const result = await pool.query(
        'SELECT * FROM orders WHERE customer_id = $1', [id]
    );
    return result.rows[0];
}

module.exports = router;