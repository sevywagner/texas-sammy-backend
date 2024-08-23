const express = require('express');
const bodyParser = require('body-parser');
const { mongoConnect } = require('./util/database');
const cors = require('cors');

const uploadRoutes = require('./routes/uploadRoutes');
const retrieveRoutes = require('./routes/retrieveRoutes');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.use(cors());
app.use(bodyParser.json());

app.use(uploadRoutes);
app.use(retrieveRoutes);

mongoConnect(() => {
    app.listen(process.env.PORT || 8080);
})