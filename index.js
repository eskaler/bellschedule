const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());

require('./server/routes')(app);

const PORT = 3456;
app.listen(PORT,() => {
    console.log(`Server is listening to port ${PORT}`)
})