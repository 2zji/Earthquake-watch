// routes/auth.js
import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);

    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (rows.length > 0) {
      return res.status(409).json({ error: "이미 존재하는 사용자입니다." });
    }

    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashed,
    ]);
    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error("❌ 회원가입 오류:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "존재하지 않는 사용자입니다." });
    }

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) {
      return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }

    res.json({
      message: "로그인 성공",
      user: { id: rows[0].id, username: rows[0].username },
    });
  } catch (err) {
    console.error("❌ 로그인 오류:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

export default router;
