import express from 'express';
import { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry, getInquiriesByUser } from '../Controller/inquiry.controller.js';

const router = express.Router();

router.post('/create', createInquiry);
router.get('/', getInquiries);
router.get('/user/:email', getInquiriesByUser);
router.put('/:id', updateInquiryStatus);
router.delete('/:id', deleteInquiry);

export default router;
