import Inquiry from '../Models/inquiry.model.js';

export const createInquiry = async (req, res) => {
  try {
    const { clientName, email, phone, subject, message, propertyId, propertyTitle, amount } = req.body;

    if (!clientName || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const newInquiry = new Inquiry({
      clientName,
      email,
      phone,
      subject,
      message,
      propertyId,
      propertyTitle,
      amount,
      status: 'NEW',
    });

    await newInquiry.save();
    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Inquiry.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInquiriesByUser = async (req, res) => {
  try {
    const { email } = req.params;
    const inquiries = await Inquiry.find({ email }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
