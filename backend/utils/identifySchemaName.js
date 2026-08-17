import jwt from "jsonwebtoken";

export const identifySchemaName = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  console.log(token)
  if (!token || token === "null")
  {
    req.user = null;
    req.userSchema = "public";
    return next();
  }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      req.userSchema = decoded.schemaName || "public";
      console.log(decoded.schemaName);
      return next();
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Ошибка инициализации базы данных" });
    }
};
