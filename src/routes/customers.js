const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
    const customerQuery = await cusQuery();

    res.status(200).json(customerQuery);
});

router.get('/:id/orders', async (req, res, next) => {
    try{
        const customerId = parseInt(req.params.id);

        if (isNaN(customerId) || customerId <= 0) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const order_query = await ordersQuery(customerId);

        if (!order_query || order_query.length === 0) {
            return res.status(404).json({ message: 'No order found' });
        }

        res.status(200).json(order_query);
    } catch(err) {
        next(err);
    }
    
});

router.post('/', async(req, res, next) => {
    try {
        const { first_name, last_name, gender, date_of_birth, email, phone } = req.body;

        if (!first_name || !last_name || !gender || !date_of_birth || !email) {
                return res.status(400).json({ 
                    message: 'first_name, last_name, gender, date of birth and email are required' 
                });
        }

        const customer = await upsertCustomer(first_name, last_name, gender, date_of_birth, email, phone);

        res.status(201).json(customer);
    } catch(err) {
        next(err);
    }
    
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
    return result.rows;
}

module.exports = router;