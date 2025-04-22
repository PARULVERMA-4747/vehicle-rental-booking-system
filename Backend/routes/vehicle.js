const express = require('express');
const router = express.Router();
const { VehicleType, Vehicle } = require('../models');

router.get('/vehicles', async(req, res) => {
    try {
        console.log('Fetching vehicle types and vehicles...');
        const vehicleTypes = await VehicleType.findAll({
            include: [{
                model: Vehicle,
                as: 'vehicles' // 🔥 important alias name
            }]
        });
        res.json(vehicleTypes);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Failed to retrieve vehicle data' });
    }
});

module.exports = router;