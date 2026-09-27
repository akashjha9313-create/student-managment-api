const express = require('express');
const router = express.Router();
let students = require('../data/students');

// 1. GET ALL STUDENTS (200 OK)
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    total: students.length,
    data: students
  });
});

// 2. GET SINGLE STUDENT BY ID (200 OK ya 404 Not Found)
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${studentId} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// 3. POST - CREATE STUDENT (201 Created ya 400 Bad Request)
router.post('/', (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: 'Name and course both are required'
    });
  }

  const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  const newStudent = {
    id: newId,
    name: name,
    course: course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student added successfully',
    data: newStudent
  });
});

// 4. PUT - UPDATE STUDENT (200 OK, 400 Bad Request, ya 404 Not Found)
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, course } = req.body;

  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${studentId} not found`
    });
  }

  if (!name && !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name or course to update'
    });
  }

  if (name) students[index].name = name;
  if (course) students[index].course = course;

  res.status(200).json({
    success: true,
    message: 'Student updated successfully',
    data: students[index]
  });
});

// 5. DELETE - REMOVE STUDENT (200 OK ya 404 Not Found)
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${studentId} not found`
    });
  }

  const removedStudent = students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: removedStudent[0]
  });
});

module.exports = router;