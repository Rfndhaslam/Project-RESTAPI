const StudentModel = require('../models/studentModel');

const getAllStudents = async (req, res) => {
  try {
    const [data] = await StudentModel.getAllStudents();
    res.json({
      message: 'GET all students success',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

// Ambil semua siswa beserta nilai dan grade
const getAllStudentsWithGrades = async (req, res) => {
  try {
    const [data] = await StudentModel.getAllStudentsWithGrades();
    res.json({
      message: 'GET all students with grades success',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

// Ambil 1 siswa beserta nilai dan grade
const getStudentWithGrades = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await StudentModel.getStudentWithGrades(id);
    if (!rows.length) {
      return res.status(404).json({
        message: 'Siswa tidak ditemukan',
        data: null,
      });
    }
    res.json({
      message: 'GET student with grades success',
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

// Filter by kelas
const getStudentsByClass = async (req, res) => {
  const { className } = req.params;
  try {
    const [data] = await StudentModel.getStudentsByClass(className);
    if (!data.length) {
      return res.status(404).json({
        message: `Tidak ada siswa di kelas ${className}`,
        data: null,
      });
    }
    res.json({
      message: `GET students by class ${className} success`,
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const createStudent = async (req, res) => {
  const { body } = req;
  if (!body.name || !body.class || !body.gender) {
    return res.status(400).json({
      message: 'Name, class, dan gender wajib diisi',
      data: null,
    });
  }
  try {
    await StudentModel.createStudent(body);
    res.status(201).json({
      message: 'CREATE student success',
      data: body,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await StudentModel.updateStudent(body, id);
    res.json({
      message: 'UPDATE student success',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await StudentModel.deleteStudent(id);
    res.json({ message: 'DELETE student success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

module.exports = { getAllStudents, getAllStudentsWithGrades, getStudentWithGrades, getStudentsByClass, createStudent, updateStudent, deleteStudent };
