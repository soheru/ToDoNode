const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let todos = [];

app.get('/', (req, res) => {
    const { priority } = req.query;
    let filteredTodos = todos;
    if (priority) {
        filteredTodos = todos.filter(todo => todo.priority === priority);
    }
    res.render('index', { todos: filteredTodos, filter: priority || '' });
});

app.post('/add', (req, res) => {
    const { title, priority } = req.body;
    if (!title.trim()) {
        return res.render('index', { todos, filter: '', alert: 'Task cannot be empty!' });
    }
    todos.push({
        id: Date.now(),
        title,
        priority: priority || 'Low'
    });
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) return res.redirect('/');
    res.render('edit', { todo });
});

app.post('/edit/:id', (req, res) => {
    const { title, priority } = req.body;
    const todo = todos.find(t => t.id == req.params.id);
    if (todo) {
        todo.title = title;
        todo.priority = priority;
    }
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    todos = todos.filter(t => t.id != req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});