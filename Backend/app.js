const express = require('express');
const cors = require('cors');
require('dotenv').config();
const studentRoutes = require('./routes/studentRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/students', studentRoutes);
app.use('/subjects',subjectRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
