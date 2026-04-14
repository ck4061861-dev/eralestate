import Payment from '../Models/payment.model.js';

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { invoiceNumber, clientName, clientEmail, property, unit, paymentType, amount, received, date, status } = req.body;

    if (!invoiceNumber || !clientName || !clientEmail || !property || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: invoiceNumber, clientName, clientEmail, property, amount',
      });
    }

    const paymentData = {
      invoiceNumber,
      clientName,
      clientEmail,
      property,
      unit: unit || '',
      paymentType: paymentType || 'RENT',
      amount,
      received: received || 0,
      date: date || new Date().toLocaleDateString(),
      status: status || 'PENDING',
    };

    const newPayment = new Payment(paymentData);
    const savedPayment = await newPayment.save();

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      payment: savedPayment,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment',
      error: error.message,
    });
  }
};

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      payments: payments,
      count: payments.length,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payments',
      error: error.message,
    });
  }
};

// Get payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment',
      error: error.message,
    });
  }
};

// Update payment
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const payment = await Payment.findByIdAndUpdate(id, updateData, { new: true });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment updated successfully',
      payment,
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment',
      error: error.message,
    });
  }
};

// Delete payment
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment deleted successfully',
      payment,
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete payment',
      error: error.message,
    });
  }
};
