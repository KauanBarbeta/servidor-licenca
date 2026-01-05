const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// 🔓 Permitir acesso de qualquer lugar (CORS)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// 🔐 Token correto
const TOKEN_ADMIN = "hatsuro123";

// ✅ ROTA DE STATUS (ESSENCIAL)
app.get("/status", (req, res) => {
  const token = req.query.token;

  if (token === TOKEN_ADMIN) {
    return res.json({ ativo: true });
  }

  return res.json({ ativo: false });
});

// 🌐 Rot
