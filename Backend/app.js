const express = require('express');
const cors = require('cors');
require('dotenv').config();
const studentRoutes = require('./routes/studentRoutes');
const { createStudentTable } = require('./models/studentModel');
const { createMarkTable } = require('./models/markModel');
const { createSubjectTable , insertDefaultSubjects} = require('./models/subjectModel');

const app = express();
app.use(express.json());
app.use(cors());

// Check database connection
(async () => {

  // Initialize tables
  await createStudentTable();
  await createMarkTable();
  await createSubjectTable();
  await insertDefaultSubjects();
})();

// Routes
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
