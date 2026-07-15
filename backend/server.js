import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";

import pg from "pg";
import { db } from "./config/db.js";
import { loginValidation } from "./validation.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { UserController } from "./controllers/index.js";
import { ProductController } from "./controllers/index.js";
import { CategoriesController } from "./controllers/index.js";
import { ProductVariantsController } from "./controllers/index.js";

const app = express();

const port = process.env.port || 5174;
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

const ALLOWED_IPS = [];

app.get("/check-access", (req, res) => {
  const clientIP = req.ip || req.socket.remoteAddress;
  const isAllowed = ALLOWED_IPS.includes(clientIP);
  console.log(`[БЭКЕНД] Клиент: ${clientIP} | Доступ: ${isAllowed}`);
  res.json({ showLoginButton: isAllowed, debugIp: clientIP });
});

async function findUserByUserName(username) {
  const queryText = "SELECT * FROM users WHERE username = $1;";
  const result = await db.query(queryText, [username]);

  // Если ничего не найдено, rows будет пустым массивом
  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
  console.log(result.rows[0]); // Возвращает найденную строку с данными и хэшем пароля
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads/images", express.static("uploads/images"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login,
);
//app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/uploads/images", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/images/${req.file.originalname}`,
  });
});

app.get("/categories", CategoriesController.getAllCategories);

app.get("/products", ProductController.getAllProducts);
app.get("/product_variants", ProductVariantsController.getAllProductVariants);
//app.get('/posts/tags', PostController.getLastTags);
//app.get('/posts/:id', PostController.getOne);
//app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
//app.delete('/posts/:id', checkAuth, PostController.remove);
/*app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);*/

app.listen(5174, "0.0.0.0", (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
