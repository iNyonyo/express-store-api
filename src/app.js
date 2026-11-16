const pool = require('./db');
const express = require('express');
const app = express();

const productRouter = require('./routes/products');
const customerRouter = require('./routes/customers');
const orderRouter = require('./routes/orders');
const reportsRouter = require('./routes/reports');

const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get(('/'), async (req, res, next) => {
    try{
        const user = await testQuery(3);

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(user));
    }
    catch(err){
        next(err);
    }
});

async function testQuery(id) {
    const result = await pool.query(
        'SELECT * FROM customers WHERE id = $1', [id]
    );
    return result.rows;
}

app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);
app.use(reportsRouter);
app.use(errorHandler);

app.listen(PORT);