import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { updateStudent } from '../services/api';

const EditStudentModal = ({ show, onHide, student, refreshStudents }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
      setAge(student.age);

      // Initialize marks from the student object
      if (student.marks) {
        setMarks(student.marks.map((mark) => ({ ...mark })));
      }
    }
  }, [student]);

  const handleMarksChange = (index, value) => {
    const updatedMarks = [...marks];
    updatedMarks[index].mark = value === '' ? '' : parseInt(value, 10);
    setMarks(updatedMarks);
  };

  const handleSubmit = async () => {
    try {
      if (!name || !email || !age) {
        Swal.fire('Error!', 'All fields are required.', 'error');
        return;
      }

      const updatedData = {
        name,
        email,
        age,
        subject_marks: marks.map((mark) => ({
          subject_id: mark.subject_id,
          mark: mark.mark,
        })),
      };

      await updateStudent(student.id, updatedData);
      Swal.fire('Success!', 'Student updated successfully.', 'success');
      refreshStudents();
      onHide();
    } catch (error) {
      Swal.fire('Error!', 'Failed to update student.', 'error');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <h4 className="mt-4">Update Marks</h4>
          {marks.map((mark, index) => (
            <Row key={index} className="align-items-center mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{mark.subject}</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder={`Enter mark for ${mark.subject}`}
                    value={mark.mark}
                    onChange={(e) => handleMarksChange(index, e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStudentModal;
