const pool = require('../config/db');

/**
 * Retrieve all subjects.
 */
const getAllSubjects = async () => {

  // Query to retrieve subjects
  const query = 'SELECT * FROM subjects';

  const subjects = (await pool.query(query)).rows;

  return { subjects };
};


module.exports = {
    getAllSubjects
};