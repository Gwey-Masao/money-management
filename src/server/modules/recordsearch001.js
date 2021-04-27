const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

exports.postData = (req, res) => {
    const mysql = require('mysql');
  
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
      
      const sql = 'select M1.type from m_record M1';
      // console.log(sql);
      con.query(sql, (err, result, fields) => {
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