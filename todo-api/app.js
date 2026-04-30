const express = require('express');
const app = express();
require('dotenv').config();

const todoRoute = require('./routes/todoRoute');

app.use(express.json());
app.use('/todos', todoRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
