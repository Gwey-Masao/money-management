const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const mysql = require('mysql');

exports.getData = (req, res) => {
    const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'money-management'
    });
  
    con.connect((err) => {
      try {
        var err = () => {throw err}
        console.log('Connected!');
      } catch (err) {
        console.log('err')
      }
      
      const sql = 'SELECT * FROM money_management.m_record WHERE id =' +req
      console.log(req.body);
      con.query(sql,(err, result, fields) => {
        try {
          var err = () => {throw err}
          console.log('Connected!');
        } catch (err) {
          console.log('err')
        }
        res.json(result);
      });
    });
  }