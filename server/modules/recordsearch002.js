const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

exports.getData = (req, res) => {
  
    const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database:'money_management'
    });
  
    con.connect((err) => {
      try {
        var err = () => {throw err}
        console.log('Connected!');
      } catch (err) {
        console.log('err')
      }
      
      const sql = 'select * from money_management.t_category';
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