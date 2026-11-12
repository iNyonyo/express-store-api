const pool = require('./db');
const express = require('express');
const app = express();

app.get(('/'), async (req, res) => {
    const user = await testQuery(3);

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(user));
});

async function testQuery(id) {
    const result = await pool.query(
        'SELECT * FROM customers WHERE id = $1', [id]
    );
    return result.rows[0];
}

app.listen(5000);