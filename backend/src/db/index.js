import pool from 'pg';

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "courseapp",
    password: "password",
    port: 5432
})

export default pool;