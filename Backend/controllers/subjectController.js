const subjectService = require('../services/subjectService');
/**
 * Retrieve all students with pagination.
 */
const getSubjects = async (req, res) => {
  try {

    const subjects= await subjectService.getAllSubjects();

    res.status(200).json({ data: subjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getSubjects
};
