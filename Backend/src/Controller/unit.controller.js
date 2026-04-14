import Unit from '../Models/unit.model.js';

// Create a new unit
export async function createUnit(req, res) {
  try {
    const { parentProperty, unitNumber, block, floorLevel, unitType, currentStatus, price, areaSize, bedrooms, bathrooms, windows } = req.body;

    if (!parentProperty || !unitNumber || !price || !areaSize) {
      return res.status(400).json({ message: 'Missing required fields: parentProperty, unitNumber, price, areaSize' });
    }

    const unit = await Unit.create({
      parentProperty,
      unitNumber,
      block,
      floorLevel,
      unitType,
      currentStatus,
      price,
      areaSize,
      bedrooms,
      bathrooms,
      windows,
    });

    return res.status(201).json({ message: 'Unit created successfully', unit });
  } catch (error) {
    console.error('createUnit error:', error);
    return res.status(400).json({ message: error.message });
  }
}

// Get all units (with optional property filter)
export async function getUnits(req, res) {
  try {
    const { propertyId } = req.query;
    
    let query = {};
    if (propertyId) {
      query.parentProperty = propertyId;
    }

    const units = await Unit.find(query).populate('parentProperty', 'title location').sort({ createdAt: -1 }).lean();

    return res.status(200).json({ units });
  } catch (error) {
    console.error('getUnits error:', error);
    return res.status(500).json({ message: 'Failed to fetch units' });
  }
}

// Get a single unit by ID
export async function getUnitById(req, res) {
  try {
    const unit = await Unit.findById(req.params.id).populate('parentProperty', 'title location').lean();

    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    return res.status(200).json({ unit });
  } catch (error) {
    console.error('getUnitById error:', error);
    return res.status(500).json({ message: 'Failed to fetch unit' });
  }
}

// Update a unit
export async function updateUnit(req, res) {
  try {
    const { block, floorLevel, unitNumber, unitType, currentStatus, price, areaSize, bedrooms, bathrooms, windows } = req.body;

    const unit = await Unit.findByIdAndUpdate(
      req.params.id,
      {
        block,
        floorLevel,
        unitNumber,
        unitType,
        currentStatus,
        price,
        areaSize,
        bedrooms,
        bathrooms,
        windows,
      },
      { new: true, runValidators: true }
    );

    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    return res.status(200).json({ message: 'Unit updated successfully', unit });
  } catch (error) {
    console.error('updateUnit error:', error);
    return res.status(400).json({ message: error.message });
  }
}

// Delete a unit
export async function deleteUnit(req, res) {
  try {
    const unit = await Unit.findByIdAndDelete(req.params.id);

    if (!unit) {
      return res.status(404).json({ message: 'Unit not found' });
    }

    return res.status(200).json({ message: 'Unit deleted successfully' });
  } catch (error) {
    console.error('deleteUnit error:', error);
    return res.status(500).json({ message: 'Failed to delete unit' });
  }
}
