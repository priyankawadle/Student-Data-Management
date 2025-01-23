import axios from 'axios';


export const getStudents = (page, limit) =>
  axios.get(`/students?page=${page}&limit=${limit}`);

export const getStudentById = (id) =>
  axios.get(`/students/${id}`);

export const addStudent = (data) =>
  axios.post(`/students`, data);

export const updateStudent = (id, data) =>
  axios.put(`/students/${id}`, data);

export const deleteStudent = (id) =>
  axios.delete(`/students/${id}`);
