const db = require('../config/database');

// Ambil semua nilai berdasarkan student_id
const getGradesByStudentId = (student_id) =>
  db.query(
    `
    SELECT 
        g.*,
        s.name AS student_name
    FROM grades g
    JOIN students s ON g.student_id = s.id
    WHERE g.student_id = ?
`,
    [student_id],
  );

// Ambil nilai tertinggi per mata pelajaran
const getTopScoreBySubject = (subject) =>
  db.query(
    `
    SELECT 
        s.name AS student_name,
        s.class,
        g.subject,
        g.score
    FROM grades g
    JOIN students s ON g.student_id = s.id
    WHERE g.subject = ?
    ORDER BY g.score DESC
`,
    [subject],
  );

const createGrade = (body) => db.query('INSERT INTO grades (student_id, subject, score) VALUES (?, ?, ?)', [body.student_id, body.subject, body.score]);

const updateGrade = (body, id) => db.query('UPDATE grades SET subject = ?, score = ? WHERE id = ?', [body.subject, body.score, id]);

const deleteGrade = (id) => db.query('DELETE FROM grades WHERE id = ?', [id]);

module.exports = { getGradesByStudentId, getTopScoreBySubject, createGrade, updateGrade, deleteGrade };
