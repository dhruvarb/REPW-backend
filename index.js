require('dotenv').config();
const express = require('express');
const cors = require('cors');
const propertyRoutes = require('./routes/property');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/properties', propertyRoutes);

app.get('/api/imagekit/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
