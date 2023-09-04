const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const eventsRoute = require('./routes/events');
const authRoute = require('./routes/authRoutes')

const app = express();
const port = process.env.PORT || 3291;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/api/events', eventsRoute);

const uri = "mongodb+srv://priyonosyaiful1:hGMLcJJezULxCQDL@bap.7hlanoe.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch(error => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

