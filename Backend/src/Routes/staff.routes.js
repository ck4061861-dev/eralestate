import { Router } from 'express';
import { getStaff, createStaff, updateStaff, deleteStaff } from '../Controller/staff.controller.js';
import upload from '../config/multer.js';

const router = Router();

router.get('/', getStaff);
router.post('/', upload.single('image'), createStaff);
router.put('/:id', upload.single('image'), updateStaff);
router.delete('/:id', deleteStaff);

export default router;
