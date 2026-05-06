const express = require('express');
const app = express();
require('dotenv').config();

const studentRoute = require('./routes/studentRoute');
const gradeRoute = require('./routes/gradeRoute');

app.use(express.json());
app.use('/students', studentRoute);
app.use('/grades', gradeRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
