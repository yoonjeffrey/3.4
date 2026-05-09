const { Tarea, Persona, Tag, PersonaTareas, TareaTags } = require('../models');
const { Op } = require('sequelize');

exports.obtenerTodas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json({ success: true, data: tareas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.buscarPorTitulo = async (req, res) => {
  try {
    const query = req.query.q;
    const tareas = await Tarea.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`
        }
      }
    });
    res.json({ success: true, data: tareas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id, {
      include: [
        { model: Persona, through: { attributes: [] } },
        { model: Tag, through: { attributes: [] } }
      ]
    });
    if (!tarea) return res.status(404).json({ success: false, message: 'Tarea not found' });
    res.json({ success: true, data: tarea });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json({ success: true, data: tarea });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarCompleta = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Tarea.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, message: 'Tarea not found' });
    const tarea = await Tarea.findByPk(id);
    res.json({ success: true, data: tarea });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.actualizarParcial = exports.actualizarCompleta;

exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tarea.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Tarea not found' });
    res.json({ success: true, message: 'Tarea deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Relation: associate Persona with Tarea
exports.addPersona = async (req, res) => {
  try {
    const { id, personaId } = req.params;
    const tarea = await Tarea.findByPk(id);
    const persona = await Persona.findByPk(personaId);
    
    if (!tarea || !persona) return res.status(404).json({ success: false, message: 'Tarea or Persona not found' });
    
    await tarea.addPersona(persona);
    res.json({ success: true, message: 'Persona added to Tarea' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Relation: associate Tag with Tarea
exports.addTag = async (req, res) => {
  try {
    const { id, tagId } = req.params;
    const tarea = await Tarea.findByPk(id);
    const tag = await Tag.findByPk(tagId);
    
    if (!tarea || !tag) return res.status(404).json({ success: false, message: 'Tarea or Tag not found' });
    
    await tarea.addTag(tag);
    res.json({ success: true, message: 'Tag added to Tarea' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Relations queries
exports.getTags = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id, {
      include: {
        model: Tag,
        through: { attributes: [] }
      }
    });
    if (!tarea) return res.status(404).json({ success: false, message: 'Tarea not found' });
    res.json({ success: true, data: tarea.Tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPersonas = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id, {
      include: {
        model: Persona,
        through: { attributes: [] }
      }
    });
    if (!tarea) return res.status(404).json({ success: false, message: 'Tarea not found' });
    res.json({ success: true, data: tarea.Personas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
