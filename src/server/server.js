const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const recordbook = require('./modules/recordbook');
const recordsearch = require('./modules/recordsearch');
const recordsearch001 = require('./modules/recordsearch001');
const recordsearch002 = require('./modules/recordsearch002');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.post('/api/recordbook',(req,res) => {
    recordbook.postData(req,res);
});

app.post('/api/recordsearch',(req,res) => {
    recordsearch.postData(req,res);
});

app.post('/api/recordsearch001',(req,res) => {
    recordsearch001.postData(req,res);
});

app.post('/api/recordsearch002',(req,res) => {
    recordsearch002.postData(req,res);
});

app.listen(port);
console.log('Server listen on port:' + port);