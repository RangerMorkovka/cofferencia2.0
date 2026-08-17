import express from "express";
import { put } from "@vercel/blob";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import { db } from "./config/db.js";

import { loginValidation } from "./validation.js";
import { handleValidationErrors, checkAuth, identifySchemaName } from "./utils/index.js";
import { UserController } from "./controllers/index.js";
import { ProductController } from "./controllers/index.js";
import { CategoriesController } from "./controllers/index.js";
import { ProductVariantsController } from "./controllers/index.js";
import "dotenv/config";
import { error } from "console";
/*const originalLog = console.log;
console.log = function (...args) {
    const error = new Error();
    // Вытаскиваем из стека ошибок файл и строку, которая сделала вызов
    const stackLine = error.stack.split("\n")[2]; 
    const cleanPath = stackLine.substring(stackLine.lastIndexOf("/") + 1, stackLine.lastIndexOf(")"));
    
    // Выводим сам лог и рядом место, где он написан
    originalLog(...args, ` -> [Вызвано в: ${cleanPath}]`);
};*/

const app = express();

const port = process.env.port || 5174;
app.use(cors());
app.use(express.json());


app.set("trust proxy", true);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function findUserByUserName(username) {
  const queryText = "SELECT * FROM users WHERE username = $1;";
  const result = await db.query(queryText, [username]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads/images")) {
      fs.mkdirSync("uploads/images");
    }
    cb(null, "uploads/images");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/uploads/images", express.static(path.join(__dirname, "uploads/images")));


app.post(
  "/api/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login,
  
);
app.patch("/api/auth/changepassword", checkAuth, UserController.changePassword);
app.get("/api/auth/me", checkAuth,identifySchemaName, UserController.getMe);

app.post(
  "/api/uploads/images",
  checkAuth,
  upload.single("image"),
  async (req, res) => {
    
   
      
    res.json({
      img_url: `/api/uploads/images/${req.file.originalname}`,
    });
  
});

app.get("/api/categories", identifySchemaName, CategoriesController.getAllCategories);

app.get("/api/products",identifySchemaName, ProductController.getAllProducts);
app.get(
  "/api/product_variants",
  
  identifySchemaName,
  ProductVariantsController.getAllProductVariants
);
app.get("/api/product_variants/:id", checkAuth,identifySchemaName, ProductVariantsController.getOne);

app.get("/api/products/:id",checkAuth,identifySchemaName, ProductController.getOne);
app.post("/api/products", checkAuth,identifySchemaName,ProductController.create);
app.delete("/api/products/:id", checkAuth,identifySchemaName, ProductController.remove);
app.patch("/api/products/:id", checkAuth,identifySchemaName,ProductController.update);

//app.patch("/api/product_variants/:id",checkAuth,identifySchemaName, ProductController.update);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public"));
});
app.get("/:page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(5174, "0.0.0.0", (err) => {
  if (err) {
    return console.log(err);
  }
});
