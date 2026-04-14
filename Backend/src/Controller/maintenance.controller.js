import Maintenance from '../Models/maintenance.model.js';

// Create a new maintenance request
export const createMaintenance = async (req, res) => {
  try {
    const { property, issueDescription, priority, requester, requesterEmail, status, notes } = req.body;

    if (!property || !issueDescription || !requester || !requesterEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: property, issueDescription, requester, requesterEmail' 
      });
    }

    const newMaintenance = new Maintenance({
      property,
      issueDescription,
      priority: priority || 'MEDIUM',
      requester,
      requesterEmail,
      status: status || 'PENDING',
      notes: notes || '',
    });

    const savedMaintenance = await newMaintenance.save();
    res.status(201).json({
      success: true,
      message: 'Maintenance request created successfully',
      maintenance: savedMaintenance,
    });
  } catch (error) {
    console.error('Error creating maintenance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create maintenance request',
      error: error.message,
    });
  }
};

// Get all maintenance requests
export const getMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      maintenance: maintenances,
      count: maintenances.length,
    });
  } catch (error) {
    console.error('Error fetching maintenances:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance requests',
      error: error.message,
    });
  }
};

// Get maintenance by ID
export const getMaintenanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const maintenance = await Maintenance.findById(id);

    if (!maintenance) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance request not found',
      });
    }

    res.status(200).json({
      success: true,
      maintenance: maintenance,
    });
  } catch (error) {
    console.error('Error fetching maintenance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance request',
      error: error.message,
    });
  }
};

// Update maintenance
export const updateMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedMaintenance = await Maintenance.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedMaintenance) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance request not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Maintenance request updated successfully',
      maintenance: updatedMaintenance,
    });
  } catch (error) {
    console.error('Error updating maintenance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update maintenance request',
      error: error.message,
    });
  }
};

// Delete maintenance
export const deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMaintenance = await Maintenance.findByIdAndDelete(id);

    if (!deletedMaintenance) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance request not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Maintenance request deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting maintenance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete maintenance request',
      error: error.message,
    });
  }
};
