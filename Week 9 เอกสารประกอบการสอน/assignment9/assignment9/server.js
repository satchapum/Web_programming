const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    readMsg().then(editJson).then(writeMsg).then(out => {res.write(out);
        res.end();});
  });

let readMsg = () => {
    return new Promise((resolve,reject) => {
        fs.readFile('cloth1.json','utf8', (err, data) => {
            if (err) 
                reject(err);
            else
            {
                resolve(data);
            }
        });
    })
}

// จำนวนเสื้อผ้าตามที่กำหนด
let editJson = (data) => { 
    return new Promise((resolve) => {
        var data1 = JSON.parse(data);
        var keys = Object.keys(data1);
        console.log(keys);
        const stock = {
            item1: 12,
            item2: 13,
            item3: 50,
            item4: 22,
            item5: 55,
            item6: 87,
            item7: 12,
            item8: 29,
            item9: 10
        }
        for (let i  = 0; i < keys.length; i++){
            data1[keys[i]]["stock"] = stock[keys[i]];
        }
        console.log(data1);
        resolve(JSON.stringify(data1));
    })
}

let writeMsg = (data) =>{
    return new Promise((resolve, reject) => {
        fs.writeFile('new_cloth.json', data, (err) => {
            if (err) 
                reject(err);
            else
                resolve(data)
        });
    })
}

server.listen(port, hostname, () => {
console.log(`Server running at   http://${hostname}:${port}/`);
});