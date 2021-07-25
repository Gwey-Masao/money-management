const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const recordbook = require('./modules/recordbook.js');
const recordsearch = require('./modules/recordsearch.js');
const recordsearch001 = require('./modules/recordsearch001.js');
const recordsearch002 = require('./modules/recordsearch002.js');
const recordadd = require('./modules/recordadd.js');
const recordadd001 = require('./modules/recordadd001.js');
const recordadd002 = require('./modules/recordadd002.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.get('/api/recordbook/:condition',(req,res) => {
    recordbook.getData(req.params.condition,res);
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

app.post('/api/recordadd',(req,res)=>{
    recordadd.postData(req,res);
});

app.get('/api/recordadd001',(req,res)=>{
    recordadd001.getData(req,res);
});

app.get('/api/recordadd002',(req,res)=>{
    recordadd002.getData(req,res);
});

app.listen(port);
console.log('Server listen on port:' + port);