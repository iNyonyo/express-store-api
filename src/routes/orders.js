const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:id', async (req, res) => {
    const orderId = req.params.id;
    const orderfunc = await orderQuery(orderId);

    res.status(200).json(orderfunc);
});

async function orderQuery(id) {
    const result = await pool.query(`
        SELECT 
        customers.first_name,
        customers.last_name,
        orders.order_date,
        orders.address,
        products.name AS product_name,
        order_items.quantity,
        order_items.unit_price,
        orders.total_amount AS order_totals FROM customers 
        JOIN orders ON customers.id = orders.customer_id 
        JOIN order_items ON orders.id = order_items.order_id
        JOIN products ON order_items.product_id = products.id
        WHERE customers.id = $1 AND orders.status = 'delivered' 
    `, [id]);
    return result.rows;
}

module.exports = router;