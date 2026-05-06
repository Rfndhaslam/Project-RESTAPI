const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.get('/grades', studentController.getAllStudentsWithGrades);
router.get('/class/:className', studentController.getStudentsByClass);
router.get('/:id', studentController.getStudentWithGrades);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
