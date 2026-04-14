import { Router } from 'express';
import { getOwners, createOwner, updateOwner, deleteOwner } from '../Controller/owner.controller.js';

const router = Router();

router.get('/', getOwners);
router.post('/', createOwner);
router.put('/:id', updateOwner);
router.delete('/:id', deleteOwner);

export default router;
