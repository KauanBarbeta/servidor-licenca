const express = require("express");
const app = express();

const clientes = {
  "CLIENTE123": { ativo: true },
  "CLIENTE456": { ativo: false }
};

app.get("/licenca", (req, res) => {
  const id = req.query.id;

  if (!clientes[id] || !clientes[id].ativo) {
    return res.json({ ativo: false });
  }

  res.json({ ativo: true });
});

app.listen(3000, () => {
  console.log("Servidor ligado");
});
