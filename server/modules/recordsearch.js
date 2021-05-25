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
      
      const sql = 'select M1.id, M1.Registrationdate, M1.name, M1.money, M1.type, T1.id,T1.category from money_management.m_record M1 left join money_management.t_category T1 ON M1.category=T1.category';
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