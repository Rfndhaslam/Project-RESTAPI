const TodoModel = require('../models/todoModel');

const getAllTodos = async (req, res) => {
  try {
    const [todos] = await TodoModel.getAllTodos();
    res.json({
      message: 'GET all todos success',
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [todo] = await TodoModel.getTodoById(id);
    if (todo.length === 0) {
      return res.status(404).json({
        message: 'Todo not found',
        data: null,
      });
    }
    res.json({
      message: 'GET todo by id success',
      data: todo[0],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const body = req.body;
    const [result] = await TodoModel.createTodo(body);
    res.status(201).json({
      message: 'Todo created successfully',
      data: { id: result.insertId, ...body },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const [result] = await TodoModel.updateTodo(body, id);
    res.json({
      message: 'Todo updated successfully',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await TodoModel.deleteTodo(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
