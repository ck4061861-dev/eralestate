import express from 'express';
import {
  createMaintenance,
  getMaintenances,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
} from '../Controller/maintenance.controller.js';

const router = express.Router();

// Create maintenance request
router.post('/', createMaintenance);
router.post('/create', createMaintenance);

// Get all maintenance requests
router.get('/', getMaintenances);

// Get specific maintenance request
router.get('/:id', getMaintenanceById);

// Update maintenance request
router.put('/:id', updateMaintenance);

// Delete maintenance request
router.delete('/:id', deleteMaintenance);

export default router;
