const pool = require("./config/db");

const createTables = async () => {
  try {
    console.log("Pool:", pool);

    const studentTable = `
            CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      age INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const marksTable = `
    CREATE TABLE IF NOT EXISTS marks (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      mark INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_student_subject UNIQUE (student_id, subject_id)
  );
    `;

    /**
     * Create the subjects table.
     */
    const subjectsTable = `
    CREATE TABLE IF NOT EXISTS subjects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    );
  `;

    await pool.query(studentTable);
    await pool.query(subjectsTable);

    /**
     * Insert default subjects into the subjects table.
     */
    const subjects = ["Math", "English", "Chemistry", "Physics", "Electronics"];
    const insertDefaultSubjects = `
        INSERT INTO subjects (name)
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
      `;

    for (const subject of subjects) {
      await pool.query(insertDefaultSubjects, [subject]);
    }

    await pool.query(marksTable);

    console.log("Tables created successfully");
    process.exit(0); // Exit script
  } catch (error) {
    console.error("Error creating tables:", error);
    process.exit(1); // Exit with failure
  }
};
createTables();
