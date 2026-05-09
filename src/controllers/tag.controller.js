const { Tag, Tarea, Persona } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: {
        model: Tarea,
        through: { attributes: [] }
      }
    });
    if (!tag) return res.status(404).json({ success: false, message: 'Tag not found' });
    res.json({ success: true, data: tag });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Tag.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ success: false, message: 'Tag not found' });
    const tag = await Tag.findByPk(id);
    res.json({ success: true, data: tag });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tag.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Tag not found' });
    res.json({ success: true, message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Relation: all tasks for a tag
exports.getTareas = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: {
        model: Tarea,
        through: { attributes: [] }
      }
    });
    if (!tag) return res.status(404).json({ success: false, message: 'Tag not found' });
    res.json({ success: true, data: tag.Tareas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Indirect relation: all tags related to a persona
exports.getByPersona = async (req, res) => {
  try {
    const { personaId } = req.params;
    const tags = await Tag.findAll({
      include: [{
        model: Tarea,
        required: true,
        include: [{
          model: Persona,
          where: { id: personaId },
          required: true,
          attributes: []
        }],
        attributes: []
      }]
    });
    res.json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
