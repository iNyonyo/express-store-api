const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/reports/summary', async (req, res) => {
    const top_five = await topFive();
    const total_revenue = await totalRevenue();
    const per_month = await perMonth();

    res.status(200).json({total_revenue, per_month, top_five});
    
});

async function topFive() {
    const result = await pool.query(`
        SELECT 
            products.name, 
            SUM(order_items.quantity) AS item_quantity, 
            SUM(order_items.total_price) AS item_revenue 
        FROM products 
            JOIN order_items ON products.id = order_items.product_id 
            JOIN orders ON orders.id = order_items.order_id
            WHERE orders.status = 'delivered'
            GROUP BY products.name 
            ORDER BY item_revenue 
            DESC LIMIT 5
    `);
    return result.rows;
}

async function totalRevenue() {
    const result = await pool.query(`
        SELECT ROUND(SUM(total_amount), 2) AS total_revenue FROM orders WHERE status = 'delivered'
    `);
    return result.rows;
}

async function perMonth() {
    const result = await pool.query(`
        SELECT 
            EXTRACT(MONTH FROM order_date) AS month, 
            EXTRACT(YEAR FROM order_date) AS year, 
            SUM(total_amount) AS monthly_revenue 
        FROM orders 
            WHERE status = 'delivered' 
            GROUP BY 
            EXTRACT(MONTH FROM order_date), 
            EXTRACT(YEAR FROM order_date) 
            ORDER BY year, month 
    `);
    return result.rows;
}

module.exports = router;