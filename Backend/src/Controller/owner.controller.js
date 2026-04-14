import Owner from '../Models/owner.model.js';

export const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find().sort({ createdAt: -1 });
    return res.status(200).json({ owners });
  } catch (error) {
    console.error('getOwners error:', error);
    return res.status(500).json({ message: 'Failed to fetch owners' });
  }
};

export const createOwner = async (req, res) => {
  try {
    const existing = await Owner.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ message: 'Owner with this email already exists' });
    }
    const owner = await Owner.create(req.body);
    return res.status(201).json({ message: 'Owner created', owner });
  } catch (error) {
    console.error('createOwner error:', error);
    return res.status(500).json({ message: 'Failed to create owner' });
  }
};

export const updateOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!owner) return res.status(404).json({ message: 'Owner not found' });
    return res.status(200).json({ message: 'Owner updated', owner });
  } catch (error) {
    console.error('updateOwner error:', error);
    return res.status(500).json({ message: 'Failed to update owner' });
  }
};

export const deleteOwner = async (req, res) => {
  try {
    const owner = await Owner.findByIdAndDelete(req.params.id);
    if (!owner) return res.status(404).json({ message: 'Owner not found' });
    return res.status(200).json({ message: 'Owner deleted' });
  } catch (error) {
    console.error('deleteOwner error:', error);
    return res.status(500).json({ message: 'Failed to delete owner' });
  }
};
