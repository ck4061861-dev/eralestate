import { Router } from 'express';
import { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty, getPropertyImage, getPropertyTypes } from '../Controller/property.controller.js';

const router = Router();

router.post('/', createProperty);
router.get('/types', getPropertyTypes);
router.get('/', getProperties);
router.get('/images/:id', getPropertyImage);
router.get('/:id', getPropertyById);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;
