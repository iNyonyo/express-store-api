require('dotenv').config();

const pg = require('pg');

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    max: 20,
    min: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    maxUses: 7500,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
});

module.exports = pool;