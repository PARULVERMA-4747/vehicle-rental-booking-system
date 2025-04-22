const express = require('express');
const router = express.Router();
const { Booking } = require('../models');
const { Op } = require('sequelize');

router.post('/book', async(req, res) => {
    console.log("Incoming request:", req.body);

    const { vehicleId, vehicleTypeId, wheels, startDate, endDate, customerName } = req.body;

    if (!vehicleId || !vehicleTypeId || !wheels || !startDate || !endDate || !customerName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const existingBooking = await Booking.findOne({
            where: {
                vehicleId,
                [Op.or]: [{
                        startDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        endDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        [Op.and]: [{
                                startDate: {
                                    [Op.lte]: startDate
                                }
                            },
                            {
                                endDate: {
                                    [Op.gte]: endDate
                                }
                            }
                        ]
                    }
                ]
            }
        });

        if (existingBooking) {
            return res.status(409).json({ error: 'Vehicle already booked for the selected date range' });
        }

        const booking = await Booking.create({
            vehicleId,
            vehicleTypeId,
            wheels,
            startDate,
            endDate,
            customerName
        });

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error('Booking failed:', error.message);
        res.status(500).json({ error: 'Booking failed', details: error.message });
    }
});



module.exports = router;