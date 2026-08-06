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
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { UserController } from "./controllers/index.js";
import { ProductController } from "./controllers/index.js";
import { CategoriesController } from "./controllers/index.js";
import { ProductVariantsController } from "./controllers/index.js";
import "dotenv/config";
import { error } from "console";
const app = express();

const port = process.env.port || 5174;
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

async function findUserByUserName(username) {
  const queryText = "SELECT * FROM users WHERE username = $1;";
  const result = await db.query(queryText, [username]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

/*const storage = multer.diskStorage({
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

const upload = multer({ storage });*/

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

//app.use("/api/uploads/images", express.static("uploads/images"));
app.get("/api/uploads/images/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const targetUrl = `https://vercel-storage.com/${filename}`;
    
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      return res.status(404).json({ error: "Изображение не найдено в облаке Blob" });
    }

    // Явно задаем тип контента, чтобы браузер понял, что это картинка
    const contentType = response.headers.get("Content-Type") || "image/webp";
    res.setHeader("Content-Type", contentType);
    
    // Переопределяем CSP, чтобы браузер разрешил показ на вашем сайте
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    res.setHeader("Cache-Control", "public, max-age=604800, immutable");

    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));

  } catch (err) {
    console.error("Ошибка при проксировании картинки:", err);
    return res.status(500).json({ error: "Внутренняя ошибка прокси-сервера" });
  }
});

app.post(
  "/api/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login,
);
app.patch("/api/auth/changepassword", checkAuth, UserController.changePassword);
app.get("/api/auth/me", checkAuth, UserController.getMe);

app.post(
  "/api/uploads/images",
  checkAuth,
  upload.single("image"),
  async (req, res) => {
    try{
    const file =req.file;
 
       if (!file || !file.buffer || file.buffer.length === 0) {
        
        return res.status(400).json({ error: 'Файл пуст или передан неверно' });
      }

      // Проверяем первые 4 байта (магические числа), чтобы понять, реальная ли это картинка
      // Для WebP первые байты всегда содержат "RIFF" и "WEBP"
      const hexHeader = file.buffer.slice(0, 12).toString('ascii');
      


    if(!file){
      return res.status(400).json({error:'Файл изображения не выбран'})
    }
      const blob = await put(file.originalname, file.buffer,{
        access: "public",
        contentType: file.mimetype,
        allowOverwrite: true,
      });
const filename = blob.url.substring(blob.url.lastIndexOf('/') + 1);
      return res.json({
        img_url: `/api/uploads/images/${filename}` 
      })
     }catch (err) {
      console.error("Ошибка при загрузке в Vercel Blob:", err);
      return res.status(500).json({ error: "Не удалось загрузить изображение" });
    /*res.json({
      img_url: `/uploads/images/${req.file.originalname}`,
    });*/
  }
});

app.get("/api/categories", CategoriesController.getAllCategories);

app.get("/api/products", ProductController.getAllProducts);
app.get(
  "/api/product_variants",
  ProductVariantsController.getAllProductVariants,
);
app.get("/api/product_variants/:id", ProductVariantsController.getOne);
//app.get('/posts/tags', PostController.getLastTags);
app.get("/api/products/:id", ProductController.getOne);
app.post("/api/products", ProductController.create);
app.delete("/api/products/:id", checkAuth, ProductController.remove);
app.patch("/api/products/:id", ProductController.update);

app.patch("/api/product_variants/:id", ProductController.update);

app.get("/*path", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(5174, "0.0.0.0", (err) => {
  if (err) {
    return console.log(err);
  }
});
