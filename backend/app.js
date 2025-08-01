require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');
const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('AI Tutor backend veikia!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend port: ${PORT}`));