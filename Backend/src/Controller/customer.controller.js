import Customer from '../Models/customer.model.js';

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    return res.status(200).json({ customers });
  } catch (error) {
    console.error('getCustomers error:', error);
    return res.status(500).json({ message: 'Failed to fetch customers' });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const existing = await Customer.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: 'Customer with this email already exists' });

    const customer = await Customer.create(req.body);
    return res.status(201).json({ message: 'Customer created', customer });
  } catch (error) {
    console.error('createCustomer error:', error);
    return res.status(500).json({ message: 'Failed to create customer' });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    return res.status(200).json({ message: 'Customer updated', customer });
  } catch (error) {
    console.error('updateCustomer error:', error);
    return res.status(500).json({ message: 'Failed to update customer' });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    return res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    console.error('deleteCustomer error:', error);
    return res.status(500).json({ message: 'Failed to delete customer' });
  }
};
