import express from 'express';
import { Pool } from 'pg';
import 'dotenv/config'

const app = express();
const pool = new Pool();

export const {
  PORT,
} = process.env;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching users');
  }
});

app.post('/users', async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding user');
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

