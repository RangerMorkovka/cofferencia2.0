import { body } from 'express-validator';

export const loginValidation = [
  body('username', 'Неверный логин').isLength({ min: 5 }),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];




