// GET request from client
// const express = require('express');
// const app = express();
// const hostname = 'localhost';
// const port = 3000;
// const bodyParser = require('body-parser');

// app.use(express.static(__dirname));

// app.get('/message', (req, res) => {
//     console.log("test");
//     res.send("Hello world!");
//  });
 
//  app.listen(port, hostname, () => {
//         console.log(`Server running at   http://${hostname}:${port}/`);
// });

// POST request from client
const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/message',(req,res) => {
    console.log(req.body)
    const outMsg = req.body
    outMsg["lastname"] = "Doe";
    console.log(outMsg);
    res.json(outMsg);
})
 
//  app.listen(port, hostname, () => {
//         console.log(`Server running at   http://${hostname}:${port}/`);
// });

// async and await (read-write files)
// create promise
const fs = require('fs');
const readData = () => {
    return new Promise((resolve,reject) => {
        fs.readFile('jfile.json','utf8', (err, data) => {
            if (err) 
                reject(err);
            else
            {
                console.log(data);
                resolve(data);
            }
                
        });
    })
}

const writeData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('new_jfile.json', data , (err) => {
            if (err) 
                reject(err);
            else
                resolve("saved!")
        });
    })
}

const callFun = async () => {
    let data_r  = await readData();
    let text_w = await writeData(data_r);
    console.log(data_r);
    console.log(text_w);
}
callFun();