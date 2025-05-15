const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('static'));
app.use('/', routes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Server started on port ${PORT}`));
