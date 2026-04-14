import express from 'express';
import { createContract, getContracts, getContractById, getContractsByUser, updateContract, deleteContract, downloadDocument, deleteDocument, downloadContractPDF } from '../Controller/contract.controller.js';

const router = express.Router();

router.post('/create', createContract);
router.get('/', getContracts);
router.get('/user/:userId', getContractsByUser); // Specific routes first!
router.get('/:id/pdf', downloadContractPDF); // PDF download route
router.get('/:id', getContractById);
router.put('/:id', updateContract);
router.delete('/:id', deleteContract);
router.get('/:contractId/download/:docIndex', downloadDocument);
router.delete('/:contractId/document/:docIndex', deleteDocument);

export default router;
