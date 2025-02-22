import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const SECRET_KEY = 'sua_chave_secreta';

// Endpoint para login
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

// Endpoint para lista de usuários
app.get('/api/users', async (req: Request, res: Response) => {
  const { page = 1, per_page = 5 } = req.query;
  const users = await prisma.user.findMany({
    skip: (Number(page) - 1) * Number(per_page),
    take: Number(per_page),
  });
  res.json(users);
});

// Endpoint para obter usuário por ID
app.get('/api/users/:id', async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

// Endpoint para atualizar usuário por ID
app.put('/api/users/:id', async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: { firstName, lastName, email },
  });
  res.json(user);
});

// Endpoint para deletar usuário por ID
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const user = await prisma.user.delete({ where: { id: Number(req.params.id) } });
  res.json(user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});