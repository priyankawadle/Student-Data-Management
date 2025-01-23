import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { addStudent, getSubjects } from '../services/api';
import '../styles/AddStudentModal.css';

const AddStudentModal = ({ show, onHide, refreshStudents }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        setSubjects(response.data.data.subjects);
        const initialMarks = {};
        response.data.data.subjects.forEach((subject) => {
          initialMarks[subject.id] = 0;
        });
        setMarks(initialMarks);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
        Swal.fire('Error!', 'Failed to load subjects.', 'error');
      }
    };

    fetchSubjects();
  }, []);

  const handleMarksChange = (subjectId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [subjectId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const subjectMarksArray = Object.keys(marks).map((subjectId) => ({
        subject_id: parseInt(subjectId, 10),
        mark: parseInt(marks[subjectId], 10),
      }));

      await addStudent({ name, email, age, subject_marks: subjectMarksArray });
      Swal.fire('Success!', 'Student added successfully.', 'success');
      refreshStudents();
      onHide();
    } catch (error) {
      Swal.fire('Error!', 'Failed to add student.', 'error');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Add New Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="add-student-form">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="form-label">Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="form-input"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="subject-marks-row">
            {subjects.map((subject, index) => (
              <Col md={6} key={subject.id} className="mb-4">
                <Form.Group>
                  <Form.Label className="form-label">{subject.name}</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={`Enter Marks`}
                    value={marks[subject.id] || ''}
                    onChange={(e) =>
                      handleMarksChange(subject.id, e.target.value)
                    }
                    className="form-input"
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} className="submit-button">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStudentModal;
