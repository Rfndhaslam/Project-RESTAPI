const GradeModel = require('../models/gradeModel');

const getGradesByStudentId = async (req, res) => {
  const { student_id } = req.params;
  try {
    const [data] = await GradeModel.getGradesByStudentId(student_id);
    if (!data.length) {
      return res.status(404).json({
        message: 'Nilai tidak ditemukan',
        data: null,
      });
    }
    res.json({
      message: 'GET grades success',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

// Nilai tertinggi per mata pelajaran
const getTopScoreBySubject = async (req, res) => {
  const { subject } = req.params;
  try {
    const [data] = await GradeModel.getTopScoreBySubject(subject);
    if (!data.length) {
      return res.status(404).json({
        message: `Tidak ada nilai untuk mata pelajaran ${subject}`,
        data: null,
      });
    }
    res.json({
      message: `GET top score by subject ${subject} success`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const createGrade = async (req, res) => {
  const { body } = req;
  if (!body.student_id || !body.subject || !body.score) {
    return res.status(400).json({
      message: 'student_id, subject, dan score wajib diisi',
      data: null,
    });
  }
  try {
    await GradeModel.createGrade(body);
    res.status(201).json({
      message: 'CREATE grade success',
      data: body,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const updateGrade = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await GradeModel.updateGrade(body, id);
    res.json({
      message: 'UPDATE grade success',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const deleteGrade = async (req, res) => {
  const { id } = req.params;
  try {
    await GradeModel.deleteGrade(id);
    res.json({ message: 'DELETE grade success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

module.exports = { getGradesByStudentId, getTopScoreBySubject, createGrade, updateGrade, deleteGrade };
