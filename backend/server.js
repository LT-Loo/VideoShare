import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Pool } from 'pg';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config({ path: "../.env" });

// Connect Neon Postgres
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// console.log("DB URL:", process.env.DATABASE_URL);

app.get("/videos", async (req, res) => {
    // const client = await pool.connect();
    try {
        const result = await pool.query("SELECT * FROM upload");
        // console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB query failed" });
    }
});

app.listen(4000, () => console.log("API running."));