const pool = require('./db');
const express = require('express');
const app = express();
const userRouter = require('./routes/products');
const customerRouter = require('./routes/customers');
const orderRouter = require('./routes/orders');
const reportsRouter = require('./routes/reports');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.get(('/'), async (req, res) => {
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

app.use('/products', userRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRouter);
app.use(reportsRouter);
app.use(errorHandler);
app.listen(5000);