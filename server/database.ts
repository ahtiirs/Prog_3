import mysql from 'mysql2';
import database from './src/database';

const pool = mysql.createPool({
host:,
user:,
database:,
waitForConnection: true,
connectionLimit: 10,
queueLimit:0,
});

export default pool;
