const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

router.get('/student/:student_id', gradeController.getGradesByStudentId);
router.get('/top/:subject', gradeController.getTopScoreBySubject);
router.post('/', gradeController.createGrade);
router.put('/:id', gradeController.updateGrade);
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;
