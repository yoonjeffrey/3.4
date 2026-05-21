import db from '../models/index.js';

const { User, Tarea, Tag, Persona } = db;

export const searchUsuariosPorEtiquetas = async (req, res) => {
  try {
    const { tags } = req.query; // tag ids separated by commas
    if (!tags) return res.status(400).json({ success: false, message: 'Tags are required' });
    const tagIds = tags.split(',').map(id => parseInt(id, 10));

    const users = await User.findAll({
      include: [
        {
          model: Tarea,
          as: 'tareas',
          required: true,
          include: [
            {
              model: Tag,
              where: { id: tagIds },
              required: true
            }
          ]
        }
      ]
    });
    
    // Remove passwords
    const sanitizedUsers = users.map(u => {
      const uJSON = u.toJSON();
      delete uJSON.password;
      return uJSON;
    });

    res.json({ success: true, data: sanitizedUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchTareasPorEtiquetas = async (req, res) => {
  try {
    const { tags } = req.query;
    if (!tags) return res.status(400).json({ success: false, message: 'Tags are required' });
    const tagIds = tags.split(',').map(id => parseInt(id, 10));

    const tareas = await Tarea.findAll({
      include: [
        {
          model: Tag,
          where: { id: tagIds },
          required: true
        }
      ]
    });

    res.json({ success: true, data: tareas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchEtiquetasPorUsuarios = async (req, res) => {
  try {
    const { users } = req.query; // user ids separated by commas
    if (!users) return res.status(400).json({ success: false, message: 'Users are required' });
    const userIds = users.split(',').map(id => parseInt(id, 10));

    const tags = await Tag.findAll({
      include: [
        {
          model: Tarea,
          required: true,
          where: { userId: userIds }
        }
      ]
    });

    res.json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
