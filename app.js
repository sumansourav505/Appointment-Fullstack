const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Database config
const userRoutes = require('./routes/userRoutes'); // Routes

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder
app.use('/api/users', userRoutes);

// Connect to database and start the server
sequelize.sync().then(() => {
  app.listen(4000, () => console.log('Server running on http://localhost:4000'));
});
