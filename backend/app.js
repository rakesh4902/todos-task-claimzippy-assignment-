// backend/server.js
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const { body, validationResult } = require('express-validator');
const path = require('path');

const databasePath = path.join(__dirname, 'userTasks.db');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
});

// Define a Task model
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

// Synchronize the database and create tables
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database and tables synced.');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Middleware for data validation 
const validateTaskData = (req, res, next) => {
  const { title, description } = req.body;
  let errors = "";

  if (title.length < 2) {
    errors = 'Title must be at least 2 characters long';
    
  }

  else if (description.length < 1) {
    errors += '\n Description cannot be empty';
  }

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  next();
};



// API Routes

// Create a new task
app.post('/tasks', validateTaskData, async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read a specific task by ID
app.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    console.error('Error fetching task by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task by ID
app.put('/tasks/:id', validateTaskData, async (req, res) => {
  const taskId = req.params.id;

  try {
    const [updatedRows] = await Task.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: { id: taskId },
      }
    );

    if (updatedRows > 0) {
      res.json({ message: 'Task updated successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    console.error('Error updating task by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedRows = await Task.destroy({
      where: { id: taskId },
    });

    if (deletedRows > 0) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    console.error('Error deleting task by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error handling middleware for routes that do not exist
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
