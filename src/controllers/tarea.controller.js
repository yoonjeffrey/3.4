import { Op } from 'sequelize';
import db from '../models/index.js';

const { Tarea, Persona, Tag } = db;

const scopeOptions = (req) => {
  const options = {};
  if (req.user && req.user.role !== 'admin') {
    options.userId = req.user.id;
  }
  return options;
};

const buildFilters = (req) => {
  const filters = { ...scopeOptions(req) };
  if (req.query.status) {
    filters.status = req.query.status;
  }
  return filters;
};

export const obtenerTodas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll({ where: buildFilters(req) });
    res.json({ success: true, data: tareas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const buscarPorTitulo = async (req, res) => {
  try {
    const query = req.query.q;
    const tareas = await Tarea.findAll({
      where: {
        ...buildFilters(req),
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

export const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findOne({
      where: { id, ...scopeOptions(req) },
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

export const crear = async (req, res) => {
  try {
    const tareaData = { ...req.body, userId: req.user.id };
    const tarea = await Tarea.create(tareaData);
    res.status(201).json({ success: true, data: tarea });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const actualizarCompleta = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Tarea.update(req.body, { where: { id, ...scopeOptions(req) } });
    if (!updated) return res.status(404).json({ success: false, message: 'Tarea not found' });
    const tarea = await Tarea.findByPk(id);
    res.json({ success: true, data: tarea });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const actualizarParcial = actualizarCompleta;

export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tarea.destroy({ where: { id, ...scopeOptions(req) } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Tarea not found' });
    res.json({ success: true, message: 'Tarea deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Relation: associate Persona with Tarea
export const addPersona = async (req, res) => {
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
export const addTag = async (req, res) => {
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
export const getTags = async (req, res) => {
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

export const getPersonas = async (req, res) => {
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
