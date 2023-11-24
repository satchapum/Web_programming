const express = require("express");
const app = express();
const fs = require("fs");
const hostname = "localhost";
const port = 3000;
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");
const { userInfo } = require("os");
const { constrainedMemory } = require("process");
const { debug } = require("console");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "QuizData",
});

con.connect((err) => {
    if (err) throw err;
    else {
        console.log("MySQL connected");
    }
});

const queryDB = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result, fields) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

app.post("/regisDB", async (req, res) => {
    let sql =
        "CREATE TABLE IF NOT EXISTS userInfo (username VARCHAR(255),password VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `INSERT INTO userInfo (username,password) VALUES ("${req.body.username}","${req.body.password}")`;
    result = await queryDB(sql);
    return res.redirect("index.html");
});


app.post("/Updatedata", async (req, res) => {
    let sql = `SELECT username, password FROM userInfo`;
    let result = await queryDB(sql);
    sql = `UPDATE userInfo SET password = '${req.body.password}' WHERE username = '${req.body.username}'`;
    result = await queryDB(sql);
    res.redirect("Index.html/updatesuccess");
});

app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/index.html`);
});