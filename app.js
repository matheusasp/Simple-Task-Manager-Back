const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/nodejs', {
  dialect: 'postgres',
  logging: false,
});
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type'], 
}));

app.use(express.json());

const Tasks = require('./models/tasks')(sequelize, DataTypes);

app.post('/tasks', async (req, res) => {
  try {
    const task = await Tasks.create({task_name: req.body.value.task_name,
      status: 'To Do'});
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao criar tarefa',
      details: error.message || error 
    });
  }
});


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});


app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefa' });
  }
});


app.put('/tasks/:id', async (req, res) => {
  
  try {
    const task = await Tasks.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
      console.log(task);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
});


app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: 'Tarefa excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
});

app.options('*', cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
