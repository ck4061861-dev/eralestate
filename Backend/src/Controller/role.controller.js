import Role from '../Models/role.model.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 });
    return res.status(200).json({ roles });
  } catch (error) {
    console.error('getRoles error:', error);
    return res.status(500).json({ message: 'Failed to fetch roles' });
  }
};

export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    return res.status(201).json({ message: 'Role created', role });
  } catch (error) {
    console.error('createRole error:', error);
    return res.status(500).json({ message: 'Failed to create role' });
  }
};

export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    return res.status(200).json({ message: 'Role updated', role });
  } catch (error) {
    console.error('updateRole error:', error);
    return res.status(500).json({ message: 'Failed to update role' });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    return res.status(200).json({ message: 'Role deleted' });
  } catch (error) {
    console.error('deleteRole error:', error);
    return res.status(500).json({ message: 'Failed to delete role' });
  }
};
