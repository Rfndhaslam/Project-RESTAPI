const express = require('express');
const app = express();
require('dotenv').config();

const categoryRoutes = require('./routes/categoryRoute');
const productRoutes = require('./routes/productRoute');

app.use(express.json());
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
