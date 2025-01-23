import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import '../styles/ViewStudentModal.css'; // Custom CSS file for styling

const ViewStudentModal = ({ show, onHide, student }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-4">Student Details</h5>
        <Table bordered>
          <tbody>
            <tr>
              <td className="detail-label"><strong>ID</strong></td>
              <td>{student.id}</td>
            </tr>
            <tr>
              <td className="detail-label"><strong>Name</strong></td>
              <td>{student.name}</td>
            </tr>
            <tr>
              <td className="detail-label"><strong>Email</strong></td>
              <td>{student.email}</td>
            </tr>
            <tr>
              <td className="detail-label"><strong>Age</strong></td>
              <td>{student.age}</td>
            </tr>
          </tbody>
        </Table>

        {/* Marks Section */}
        {student.marks && student.marks.length > 0 ? (
          <Table bordered>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {student.marks.map((mark, index) => (
                <tr key={index}>
                  <td>{mark.subject}</td>
                  <td>
                    {mark.mark === 0 ? 'Mark is not available' : mark.mark}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No marks available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewStudentModal;
