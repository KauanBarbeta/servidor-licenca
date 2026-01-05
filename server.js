const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ADMIN_TOKEN = "HATSURO123"; // depois você muda

const clientes = {
  "CLIENTE123": { ativo: true },
  "CLIENTE456": { ativo: false }
};

app.get("/", (req, res) => {
  res.send("Servidor online 🚀");
});

// 🔐 Verificação de licença
app.get("/licenca", (req, res) => {
  const id = req.query.id;
  if (!clientes[id] || !clientes[id].ativo) {
    return res.status(403).json({ ativo: false });
  }
  res.json({ ativo: true });
});

// 📋 Lista clientes (admin)
app.get("/admin/clientes", (req, res) => {
  if (req.query.token !== ADMIN_TOKEN) {
    return res.status(401).json({ erro: "Acesso negado" });
  }
  res.json(clientes);
});

// 🔄 Ativar / desativar
app.post("/admin/toggle", (req, res) => {
  if (req.body.token !== ADMIN_TOKEN) {
    return res.status(401).json({ erro: "Acesso negado" });
  }

  const id = req.body.id;
  if (!clientes[id]) {
    return res.status(404).json({ erro: "Cliente não existe" });
  }

  clientes[id].ativo = !clientes[id].ativo;
  res.json({ sucesso: true, ativo: clientes[id].ativo });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor ligado");
});
