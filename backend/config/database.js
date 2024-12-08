const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'auction_project',
  password: 'your_password_here',
  port: 5432,
});

module.exports = pool; 