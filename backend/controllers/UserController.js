import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { db } from "../config/db.js";
import console from "console";



export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userId; 
     
    
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Введите старый и новый пароли' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Новый пароль должен быть не менее 6 символов' });
    }

    
    const userResult = await db.query('SELECT password_hash FROM users WHERE id = $1;', [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный старый пароль' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2;', [newHash, userId]);

    res.json({ success: true, message: 'Пароль успешно изменен' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось сменить пароль' });
  }
};


export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    let dbName = 'cofferencia';
     if(username === 'testUser') {
      dbName = 'testdb';
    }
       
      

   
    const queryText = "SELECT * FROM users WHERE username = $1;";
    const result = await db.query(queryText, [req.body.username], dbName);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const user = result.rows[0];
    
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
        dbName: dbName,  
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
