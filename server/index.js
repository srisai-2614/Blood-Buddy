const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios'); // Global axios instance
const app = express();
const port = 4000;
const mysql=require('mysql2');

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'db4free.net',
  user: 'USER_Name',
  password: 'Password',
  database: 'dbname',
  connectTimeout: 60000
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM Users';
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err.message);
      return res.json(err);
    }
    connection.query(sql, (queryErr, results) => {
      connection.release();
      if (queryErr) {
        console.error('Error executing MySQL query:', queryErr.message);
        return res.json(queryErr);
      }
      return res.json(results);
    });
  });
});

app.post('/login', async(req,res)=>{
  const {email,password}=req.body;
  const sql='SELECT * FROM Users WHERE Email= ?';

  pool.getConnection((err,connection)=>{
    if(err){
      console.log('Error While connecting')
      return res.status(500).json(err);
    }
    connection.query(sql,[email],async(queErr,result)=>{
      connection.release();

      if(queErr){
        console.error('Error while running query:',queErr)
        return res.status(500).json(queErr)
      }
      const user=result[0];

      if(user){
        const passwordMatch=await bcrypt.compare(password,user.Password) || password==user.Password
        if (passwordMatch){
          res.json({message: 'Login successful!',user})
        }
        else{
          console.log('Password not same');
          res.status(401).json({ message: 'Invalid  password' });
        }
      }
      else{
        console.log("no user");
        res.status(401).json({ message: 'user not found' });
      }
    })
  })
})

app.post('/', async (req, res) => {
  const { name, phoneNo, email, bloodGroup, region, password, confirmPassword } = req.body;
  const checkEmailSql = 'SELECT * FROM Users WHERE Email = ?';
  const insertUserSql = 'INSERT INTO Users (Name, Phone, Email, Password, Blood_Group, Region) VALUES (?, ?, ?, ?, ?, ?)';
  pool.query(checkEmailSql, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking email:', checkErr.message);
      return res.status(500).json(checkErr);
    }
    if (checkResult.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    pool.query(insertUserSql, [name, phoneNo, email, password, bloodGroup, region], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error executing MySQL query:', insertErr.message);
        return res.status(500).json(insertErr);
      }
      console.log('Data inserted');
      res.json({ message: 'User registered successfully!' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


