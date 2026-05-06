const db = require('../config/database');

const getAllStudents = () => db.query('SELECT * FROM students');

const getStudentById = (id) => db.query('SELECT * FROM students WHERE id = ?', [id]);

// Ambil siswa beserta rata-rata nilai dan grade
const getStudentWithGrades = (id) =>
  db.query(
    `
    SELECT 
        s.*,
        ROUND(AVG(g.score), 2) AS average_score,
        CASE
            WHEN AVG(g.score) >= 90 THEN 'A'
            WHEN AVG(g.score) >= 80 THEN 'B'
            WHEN AVG(g.score) >= 70 THEN 'C'
            WHEN AVG(g.score) >= 60 THEN 'D'
            ELSE 'E'
        END AS grade
    FROM students s
    LEFT JOIN grades g ON s.id = g.student_id
    WHERE s.id = ?
    GROUP BY s.id
`,
    [id],
  );

// Ambil semua siswa beserta rata-rata nilai dan grade
const getAllStudentsWithGrades = () =>
  db.query(`
    SELECT 
        s.*,
        ROUND(AVG(g.score), 2) AS average_score,
        CASE
            WHEN AVG(g.score) >= 90 THEN 'A'
            WHEN AVG(g.score) >= 80 THEN 'B'
            WHEN AVG(g.score) >= 70 THEN 'C'
            WHEN AVG(g.score) >= 60 THEN 'D'
            ELSE 'E'
        END AS grade
    FROM students s
    LEFT JOIN grades g ON s.id = g.student_id
    GROUP BY s.id
`);

// Filter siswa berdasarkan kelas
const getStudentsByClass = (className) => db.query('SELECT * FROM students WHERE class = ?', [className]);

const createStudent = (body) => db.query('INSERT INTO students (name, class, gender) VALUES (?, ?, ?)', [body.name, body.class, body.gender]);

const updateStudent = (body, id) => db.query('UPDATE students SET name = ?, class = ?, gender = ? WHERE id = ?', [body.name, body.class, body.gender, id]);

const deleteStudent = (id) => db.query('DELETE FROM students WHERE id = ?', [id]);

module.exports = { getAllStudents, getStudentById, getStudentWithGrades, getAllStudentsWithGrades, getStudentsByClass, createStudent, updateStudent, deleteStudent };
