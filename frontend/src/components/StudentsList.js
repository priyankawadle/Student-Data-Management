import React, { useEffect, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import { getStudents, deleteStudent } from "../services/api";
import AddStudentModal from "./AddStudentModal";
import EditStudentModal from "./EditStudentModal";
import ViewStudentModal from "./ViewStudentModal";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const fetchStudents = async (page) => {
    try {
      const response = await getStudents(page, 5);
      setStudents(response.data.data);
      setTotalPages(Math.ceil(response.data.metadata.totalRecords / 5));
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteStudent(id);
        Swal.fire("Deleted!", "Student record has been deleted.", "success");
        fetchStudents(currentPage);
      } catch (error) {
        Swal.fire("Error!", "Failed to delete student.", "error");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>All Students</h2>
        <Button
          variant="primary"
          className="add-student-btn"
          onClick={() => setShowAddModal(true)}
        >
          Add New Student
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowViewModal(true);
                    }}
                  >
                    View
                  </Button>{" "}
                  <Button
                    variant="warning"
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item
            key={page + 1}
            active={page + 1 === currentPage}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modals */}
      {showAddModal && (
        <AddStudentModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          refreshStudents={() => fetchStudents(currentPage)}
        />
      )}
      {showEditModal && selectedStudent && (
        <EditStudentModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          student={selectedStudent}
          refreshStudents={() => fetchStudents(currentPage)}
        />
      )}
      {showViewModal && selectedStudent && (
        <ViewStudentModal
          show={showViewModal}
          onHide={() => setShowViewModal(false)}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default StudentsList;
