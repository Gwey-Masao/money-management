const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

exports.getData = (req, res) => {
    const mysql = require('mysql');
  
    const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
    });
  
    con.connect((err) => {
      try {
        var err = () => {throw err}
        console.log('Connected!');
      } catch (err) {
        console.log('err')
      }
      
      const sql = 'insert into money_management.m_record (id,Registrationdate,name,money,type,category) values(?,?,?,?,?,?)';
      console.log(req.body);
      con.query(sql,[req.body.id, req.body.Registrationdate, req.body.name, req.body.money, req.body.type, req.body.category], (err, result, fields) => {
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