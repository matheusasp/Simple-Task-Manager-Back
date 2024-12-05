const express = require('express');
const bodyParser = require('body-parser');
const { Tasks } = require('../models/tasks');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'], 
  }));

app.use(express.json());


app.post('/tasks', async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});


app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
