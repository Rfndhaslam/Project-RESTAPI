const db = require('../config/database');

const getAllTodos = () => db.query('SELECT * FROM todos');

const getTodoById = (id) => db.query('SELECT * FROM todos WHERE id = ?', [id]);

const createTodo = (body) => db.query('INSERT INTO todos (title, description, status, due_date) VALUES (?, ?, ?, ?)', [body.title, body.description, body.status, body.due_date]);

const updateTodo = (body, id) => db.query('UPDATE todos SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ?', [body.title, body.description, body.status, body.due_date, id]);

const deleteTodo = (id) => db.query('DELETE FROM todos WHERE id = ?', [id]);

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
