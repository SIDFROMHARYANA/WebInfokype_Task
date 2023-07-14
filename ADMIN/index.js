const express = require('express');
const app = express();

var bodyParser = require('body-parser');

const route = require('./routes/route')

const mysql = require("mysql");

  // create databse connection

    const connection =  mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password : '123456',  
        database : 'blog',       
  });

  connection.connect((err)=>
   {
    if(err) {
         throw err;
    }
   
      console.log('DB connected successfully')
})

 



app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
