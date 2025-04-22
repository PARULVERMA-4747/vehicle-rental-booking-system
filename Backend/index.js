const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');



const vehicleRoutes = require('./routes/vehicle');
const bookingRoutes = require('./routes/booking');
app.use(bodyParser.json());
app.use(cors()); // ← Enable CORS
app.use(express.json());

app.use('/api', vehicleRoutes);
app.use('/api', bookingRoutes); // /api/book

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});