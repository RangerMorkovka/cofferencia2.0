import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { db } from "../config/db.js";

export const login = async (req, res) => {
  try {
    const queryText = "SELECT * FROM users WHERE username = $1;";
    const result = await db.query(queryText, [req.body.username]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const user = result.rows[0];
    console.log(user.password_hash);
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user.password_hash,
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );

    const { password_hash, ...userData } = user;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const queryText = "SELECT id, username FROM users WHERE id = $1;";
    const result = await db.query(queryText, [req.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const user = result.rows[0];
    const { passwordHash, ...userData } = user;

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
