const express = require('express');
const app = express();
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');

app.use(express.json());
app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/comments', commentRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
