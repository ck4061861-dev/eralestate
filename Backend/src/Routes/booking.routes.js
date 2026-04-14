import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingsByUserEmail,
  getBookingById,
  updateBooking,
  deleteBooking,
} from '../Controller/booking.controller.js';

const router = Router();

router.post('/', createBooking);
router.post('/create', createBooking); // Alternative POST endpoint for compatibility
router.get('/', getBookings);
router.get('/user/:email', getBookingsByUserEmail);
router.get('/:id', getBookingById);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
