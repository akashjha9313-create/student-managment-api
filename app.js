const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 3000;

// Body parser middleware (JSON data accept karne ke liye)
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Routes
app.use('/students', studentRoutes);

// Server listen
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});