const express = require("express");
const app = express();
const fs = require("fs");
const hostname = "localhost";
const port = 3000;
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "img/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

//ทำให้สมบูรณ์
app.post("/profilepic", (req, res) => {
  return res.redirect("feed.html");
});

//ทำให้สมบูรณ์
// ถ้าต้องการจะลบ cookie ให้ใช้
// res.clearCookie('username');
app.get("/logout", (req, res) => {
  return res.redirect("index.html");
});

//ทำให้สมบูรณ์
app.get("/readPost", async (req, res) => {
  const obj = await readJson("js/postDB.json");
  res.send(obj);
});

//ทำให้สมบูรณ์
app.post("/writePost", async (req, res) => {
  const read = await readJson("js/postDB.json");
  const obj = await writeJson(req.body, read, "js/postDB.json");
  res.json(obj);
});

//ทำให้สมบูรณ์
app.post("/checkLogin", async (req, res) => {
  var jsonData = await readJson("js/userDB.json");
  var keys = Object.keys(jsonData);
  for (var numberOfKeys = 0; numberOfKeys < keys.length; numberOfKeys++) {
    if (
      req.body.username == jsonData[keys[numberOfKeys]].username &&
      req.body.password == jsonData[keys[numberOfKeys]].password
    ) {
      console.log("login successful");
      res.cookie("username", req.body.username);
      return res.redirect("feed.html");
    } else {
      console.log("login failed");
      return res.redirect("index.html?error=1");
    }
  }
  // ถ้าเช็คแล้ว username และ password ถูกต้อง
  // return res.redirect('feed.html');
  // ถ้าเช็คแล้ว username และ password ไม่ถูกต้อง
  // return res.redirect('index.html?error=1')
});

//ทำให้สมบูรณ์
const readJson = (file_name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file_name, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

//ทำให้สมบูรณ์
const writeJson = (new_msg, data, file_name) => {
  return new Promise((resolve, reject) => {
    var keys = Object.keys(data);
    fs.writeFile(file_name, data, (err) => {
      if (err) reject(err);
      else 
      {
        data = 'post'+keys.length;
        data[post[keys.length]]["user"] = new_msg.user;
        data[post[keys.length]]["message"] = new_msg.message;
        resolve(JSON.stringify(data));
      }
    });
  });
};

//ทำให้สมบูรณ์
const updateImg = async (username, fileimg) => {};

app.listen(port, hostname, () => {
  console.log(`Server running at   http://${hostname}:${port}/`);
});
