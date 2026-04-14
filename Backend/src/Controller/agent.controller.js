import Agent from '../Models/agent.model.js';

export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });
    return res.status(200).json({ agents });
  } catch (error) {
    console.error('getAgents error:', error);
    return res.status(500).json({ message: 'Failed to fetch agents' });
  }
};

export const createAgent = async (req, res) => {
  try {
    const existing = await Agent.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ message: 'Agent with this email already exists' });
    }
    const agent = await Agent.create(req.body);
    return res.status(201).json({ message: 'Agent created', agent });
  } catch (error) {
    console.error('createAgent error:', error);
    return res.status(500).json({ message: 'Failed to create agent' });
  }
};

export const updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    return res.status(200).json({ message: 'Agent updated', agent });
  } catch (error) {
    console.error('updateAgent error:', error);
    return res.status(500).json({ message: 'Failed to update agent' });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    return res.status(200).json({ message: 'Agent deleted' });
  } catch (error) {
    console.error('deleteAgent error:', error);
    return res.status(500).json({ message: 'Failed to delete agent' });
  }
};
