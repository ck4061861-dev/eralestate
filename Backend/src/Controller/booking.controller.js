import Booking from '../Models/booking.model.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    let { propertyTitle, property, unit, customerName, customerEmail, customerPhone, agent, visitDate, visitTime, status, notes, createdBy } = req.body;
    
    // Accept either propertyTitle or property field
    const finalPropertyTitle = propertyTitle || property;
    
    if (!finalPropertyTitle || !customerName || !visitDate || !visitTime) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: propertyTitle/property, customerName, visitDate, visitTime',
        received: { propertyTitle, property, customerName, visitDate, visitTime }
      });
    }

    // Normalize email (lowercase)
    const normalizedEmail = customerEmail?.toLowerCase().trim() || 'not-provided@email.com';

    // Don't send property ObjectId if it's just a string
    const bookingData = {
      propertyTitle: finalPropertyTitle,
      unit: unit || '',
      customerName,
      customerEmail: normalizedEmail,
      customerPhone: customerPhone || '',
      agent: agent || 'Unassigned',
      visitDate: new Date(visitDate),
      visitTime,
      status: status || 'PENDING',
      notes: notes || '',
      createdBy: createdBy || 'USER',
    };

    const newBooking = new Booking(bookingData);

    const savedBooking = await newBooking.save();
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: savedBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message,
    });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('property').sort({ visitDate: -1 });
    res.status(200).json({
      success: true,
      bookings: bookings,
      count: bookings.length,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message,
    });
  }
};

// Get bookings by user email
export const getBookingsByUserEmail = async (req, res) => {
  try {
    const emailParam = req.params.email || '';
    const email = emailParam.toLowerCase().trim();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'User email is required',
      });
    }

    const bookings = await Booking.find({ customerEmail: email }).populate('property').sort({ visitDate: -1 });

    res.status(200).json({
      success: true,
      bookings: bookings,
      count: bookings.length,
    });
  } catch (error) {
    console.error('Error fetching bookings by email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings for user',
      error: error.message,
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('property');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      booking: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message,
    });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate('property');

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: error.message,
    });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message,
    });
  }
};
