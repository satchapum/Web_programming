var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

var fs = require('fs');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// read from file to user
//ทำให้สมบูรณ์
app.get('/inmsg', async (req, res) => {
  const obk = await readMsg(req.body, res);
  res.send(obk);
})

//from user, write data to file
//ทำให้สมบูรณ์
app.post('/outmsg', async (req, res) => {
  console.log(req, res);
  updateMsg(req,res)
  res.json(outMsg);
})

// read json data from file
//ทำให้สมบูรณ์
const readMsg = () => {
  return new Promise((resolve, reject) => {
      fs.readFile('log.json', 'utf8', (err, data) => {
          if (err) 
              reject(err);
          else
              resolve(data);
      })
  })
}

// update json data
//ทำให้สมบูรณ์
const updateMsg = (new_msg, data1) => {
  return new Promise((resolve) => {  
    var data2 = JSON.parse(data1);
    data2.push({
      time:new_msg.time,
      user:new_msg.user,
      message:new_msg.message,
    })
    resolve(writeMsg(JSON.stringify(data2)));
  });
}

// write json data to file
//ทำให้สมบูรณ์
const writeMsg = (data) => {
  return new Promise((resolve,reject) => {
    fs.writeFile('new_log.json', data , (err) => {
      if (err) 
          reject(err);
      else
          resolve("saved!")
  });
})};

var server = http.listen(3001, () => {
  console.log('server is running on port http://localhost:'+ server.address().port);
});