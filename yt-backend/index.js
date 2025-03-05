const express = require('express');
const cors = require('cors')
const mainRouter = require('./routes/video')
const app = express();
app.use(cors());

app.use('/api/video', mainRouter)

app.listen(3000)