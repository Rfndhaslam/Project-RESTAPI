const UserModel = require('../models/userModel'); // sesuaikan path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { body } = req;
  if (!body.name || !body.email || !body.password) {
    return res.status(400).json({
      message: 'Name, email, dan password wajib diisi',
      data: null,
    });
  }
  try {
    const existingUser = await UserModel.getUserByEmail(body.email);

    // Tambah pengecekan agar aman
    if (existingUser && existingUser.length) {
      return res.status(400).json({
        message: 'Email sudah terdaftar',
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    await UserModel.createUser({ ...body, password: hashedPassword });

    res.status(201).json({
      message: 'REGISTER success',
      data: { name: body.name, email: body.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

const login = async (req, res) => {
  const { body } = req;
  if (!body.email || !body.password) {
    return res.status(400).json({
      message: 'Email dan password wajib diisi',
      data: null,
    });
  }
  try {
    const rows = await UserModel.getUserByEmail(body.email);

    // Tambah pengecekan agar aman
    if (!rows || !rows.length) {
      return res.status(404).json({
        message: 'Email tidak ditemukan',
        data: null,
      });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Password salah',
        data: null,
      });
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'LOGIN success',
      token: token,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

module.exports = { register, login };
