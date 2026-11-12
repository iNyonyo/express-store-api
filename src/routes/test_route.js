const pool = require('../db');
const http = require('http');

const server = http.createServer(async (req, res) => {
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

server.listen(5000);