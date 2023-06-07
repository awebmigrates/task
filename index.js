const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// In-memory data store for todos
let todos = [];

// Retrieve all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Retrieve a specific todo by its ID
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
    } else {
        res.json(todo);
    }
});

// Create a new todo
app.post('/todos', (req, res) => {
    const { id, title, description, completed } = req.body;
    const newTodo = { id, title, description, completed };
    todos.push(newTodo);
    res.status(201).json({ message: 'Todo added successfully' }, newTodo);
});

// Update a specific todo by its ID
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        res.status(404).json({ error: 'Todo not found' });
    } else {
        todos[todoIndex] = { ...todos[todoIndex], title, description, completed };
        res.json({ message: 'Todo updated successfully' }, todos[todoIndex]);
    }
});

// Delete a specific todo by its ID
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        res.status(404).json({ error: 'Todo not found' });
    } else {
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json({ message: 'Todo deleted successfully' }, deletedTodo[0]);
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 3000');
});


// to start the server :-  node ./index.js