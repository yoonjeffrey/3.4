import db from '../models/index.js';

const { Persona, Tarea, Tag } = db;

export const getAll = async (req, res) => {
  try {
    const personas = await Persona.findAll();
    res.json({ success: true, data: personas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByPk(id, {
      include: {
        model: Tarea,
        through: { attributes: [] }
      }
    });
    if (!persona) return res.status(404).json({ success: false, message: 'Persona not found' });
    res.json({ success: true, data: persona });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const persona = await Persona.create(req.body);
    res.status(201).json({ success: true, data: persona });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Persona.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, message: 'Persona not found' });
    const persona = await Persona.findByPk(id);
    res.json({ success: true, data: persona });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Persona.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Persona not found' });
    res.json({ success: true, message: 'Persona deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Relation: all tasks for a persona
export const getTareas = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await Persona.findByPk(id, {
      include: {
        model: Tarea,
        through: { attributes: [] }
      }
    });
    if (!persona) return res.status(404).json({ success: false, message: 'Persona not found' });
    res.json({ success: true, data: persona.Tareas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Indirect relation: all personas related to a tag
export const getByTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const personas = await Persona.findAll({
      include: [{
        model: Tarea,
        required: true,
        include: [{
          model: Tag,
          where: { id: tagId },
          required: true,
          attributes: []
        }],
        attributes: []
      }]
    });
    res.json({ success: true, data: personas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
