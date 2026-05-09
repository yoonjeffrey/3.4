const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password });
    
    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (!user.active) return res.status(403).json({ success: false, message: 'User is deactivated' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'mi_secreto_super_seguro_para_jwt_2024', { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Hook will hash it

    await user.save();
    
    const userResponse = user.toJSON();
    delete userResponse.password;
    res.json({ success: true, data: userResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePhysical = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User physically deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.activate = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    user.active = true;
    await user.save();
    res.json({ success: true, message: 'User activated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deactivate = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    user.active = false;
    await user.save();
    res.json({ success: true, message: 'User deactivated (Logical Delete)' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
