const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const recordbook = require('./modules/recordbook');
const recordsearch = require('./modules/recordsearch');
const recordsearch001 = require('./modules/recordsearch001');
const recordsearch002 = require('./modules/recordsearch002');
const recordadd = require('./modules/recordadd');
const recordadd001 = require('./modules/recordadd001');
const recordadd002 = require('./modules/recordadd002');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.get('/api/recordbook',(req,res) => {
    recordbook.getData(req,res);
});

app.get('/api/recordsearch',(req,res) => {
    recordsearch.getData(req,res);
});

app.get('/api/recordsearch001',(req,res) => {
    recordsearch001.getData(req,res);
});

app.get('/api/recordsearch002',(req,res) => {
    recordsearch002.getData(req,res);
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