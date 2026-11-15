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

router.post('/', async(req, res) => {
    const { first_name, last_name, gender, date_of_birth, email, phone } = req.body;
    const customer = await upsertCustomer(first_name, last_name, gender, date_of_birth, email, phone);

    res.status(200).json(customer);
})

async function upsertCustomer(first_name, last_name, gender, date_of_birth, email, phone){
    const data = await pool.query(
        `INSERT INTO customers (first_name, last_name, gender, date_of_birth, email, phone) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        ON CONFLICT (email) 
        DO UPDATE SET 
        first_name = EXCLUDED.first_name, 
            last_name = EXCLUDED.last_name, 
            gender = EXCLUDED.gender,
            date_of_birth = EXCLUDED.date_of_birth,
            phone = EXCLUDED.phone
        RETURNING * 
    `, [first_name, last_name, gender, date_of_birth, email, phone])
    return data.rows[0];
}

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