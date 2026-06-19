const prisma = require("../data/prisma");

const login = async (req, res) => {
  const { email, senha } = req.body;

  const professor = await prisma.professor.findUnique({
    where: { email }
  });

  if (!professor || professor.senha !== senha) {
    return res.status(401).json({ error: "Login inválido" });
  }

  return res.json({
    id: professor.id,
    nome: professor.nome,
    email: professor.email
  });
};

module.exports = { login };