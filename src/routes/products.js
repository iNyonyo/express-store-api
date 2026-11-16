const pool = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        const queries = await productQuery(page, limit, search);

        res.status(200).json(queries);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const userQuery = await idQuery(id);

        if (!userQuery) {
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

        if (!name || !brand || !description || price === undefined || quantity === undefined) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const product = await upsertProducts(id, name, brand, description, price, quantity);

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

        if (product_delete.rowCount === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(204).send("Product deleted successfully");
    } catch(err){
        next(err);
    }
    
    
})

async function deleteProduct(id) {
    const data = await pool.query(
        `DELETE FROM products WHERE id = $1`, [id]
    );
    return data;
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


async function productQuery(page, limit, search) {
    const offset = (page - 1) * limit;

    const result = await pool.query(
        `SELECT * FROM products
         WHERE name ILIKE $1
         ORDER BY name
         LIMIT $2 OFFSET $3`,
        [`%${search}%`, limit, offset]
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