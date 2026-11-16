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

router.get('/:id', async (req, res, next) => {
    try{
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const userQuery = await idQuery(id);

        if (!userQuery.length) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(userQuery);
    } catch(err) {
        next(err);
    }
    
});

router.put('/:id', async(req, res, next) => {
    try{
        const { name, brand, description, price, quantity } = req.body;
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const product = await upsertProducts(id, name, brand, description, price, quantity);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch(err) {
        next(err);
    }
    
})

router.delete('/:id', async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const product_delete = await deleteProduct(id);
        res.status(200).json(product_delete);
    } catch(err){
        next(err);
    }
    
    
})

async function deleteProduct(id) {
    const data = await pool.query(
        `DELETE FROM products WHERE id = $1`, [id]
    );
    return data.rows;
}

async function upsertProducts(id, name, brand, description, price, quantity){
    const data = await pool.query(
        `INSERT INTO products (id, name, brand, description, price, quantity) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        ON CONFLICT (id) 
        DO UPDATE SET 
            name = EXCLUDED.name,
            brand = EXCLUDED.brand, 
            description = EXCLUDED.description, 
            price = EXCLUDED.price,
            quantity = EXCLUDED.quantity
        RETURNING * 
    `, [id, name, brand, description, price, quantity]);
    return data.rows[0];
}


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