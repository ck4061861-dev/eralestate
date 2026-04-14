import Staff from '../Models/staff.model.js';
import fs from 'fs';
import path from 'path';

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    return res.status(200).json({ staff });
  } catch (error) {
    console.error('getStaff error:', error);
    return res.status(500).json({ message: 'Failed to fetch staff members' });
  }
};

export const createStaff = async (req, res) => {
  try {
    const existing = await Staff.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: 'Staff member already exists with this email' });

    const staffData = {
      ...req.body,
      expertise: typeof req.body.expertise === 'string' ? JSON.parse(req.body.expertise) : req.body.expertise || [],
    };

    // If file uploaded, store the image path
    if (req.file) {
      staffData.image = `/uploads/staff/${req.file.filename}`;
    }

    const staff = await Staff.create(staffData);
    return res.status(201).json({ message: 'Staff created', staff });
  } catch (error) {
    // Delete uploaded file if staff creation fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete file:', err);
      });
    }
    console.error('createStaff error:', error);
    return res.status(500).json({ message: 'Failed to create staff member' });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff member not found' });

    const updateData = {
      ...req.body,
      expertise: typeof req.body.expertise === 'string' ? JSON.parse(req.body.expertise) : req.body.expertise || [],
    };

    // If new file uploaded, delete old image if it exists
    if (req.file) {
      if (staff.image && staff.image.startsWith('/uploads/')) {
        const oldImagePath = `.${staff.image}`;
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error('Failed to delete old image:', err);
        });
      }
      updateData.image = `/uploads/staff/${req.file.filename}`;
    }

    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    return res.status(200).json({ message: 'Staff updated', staff: updatedStaff });
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete file:', err);
      });
    }
    console.error('updateStaff error:', error);
    return res.status(500).json({ message: 'Failed to update staff member' });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff member not found' });

    // Delete image file if it exists
    if (staff.image && staff.image.startsWith('/uploads/')) {
      const imagePath = `.${staff.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Failed to delete image:', err);
      });
    }

    return res.status(200).json({ message: 'Staff deleted' });
  } catch (error) {
    console.error('deleteStaff error:', error);
    return res.status(500).json({ message: 'Failed to delete staff member' });
  }
};
