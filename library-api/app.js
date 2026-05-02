const express = require('express');
const app = express();
require('dotenv').config();

const bookRoute = require('./routes/bookRoute');

app.use(express.json());
app.use('/books', bookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
