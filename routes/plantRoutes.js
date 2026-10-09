const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// 1. Get all plants OR filter by search term, category, or plant type
router.get('/', async (req, res) => {
  try {
    const { search, category, type } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { commonName: { $regex: search, $options: 'i' } },
        { botanicalName: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.ayushCategory = category;
    }

    if (type) {
      query.type = type;
    }

    const plants = await Plant.find(query);
    res.status(200).json({ success: true, count: plants.length, data: plants });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// 2. Health Advisor Route: Search plants by health symptoms or uses
router.get('/health-advisor', async (req, res) => {
  try {
    const { symptom } = req.query;
    if (!symptom) {
      return res.status(400).json({ success: false, message: 'Please provide a symptom parameter' });
    }

    const matchingPlants = await Plant.find({
      medicinalUses: { $regex: symptom, $options: 'i' }
    });

    res.status(200).json({ success: true, count: matchingPlants.length, data: matchingPlants });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// 3. Get single plant details by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ success: false, message: 'Plant not found' });
    }
    res.status(200).json({ success: true, data: plant });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// 4. Admin route: Add new plant entry
router.post('/', async (req, res) => {
  try {
    const newPlant = await Plant.create(req.body);
    res.status(201).json({ success: true, data: newPlant });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create plant entry', error: error.message });
  }
});

module.exports = router;