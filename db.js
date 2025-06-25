import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost", //아니면 127.0.0.1
  user: "root",
  password: "111111",
  database: "testdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
