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
app.post("/profilepic", async (req, res) => {
  const read = await readJson("js/userDB.json");
  let upload = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');
  upload(req, res, (err) => {

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }
    updateImg(req.cookies.username, req.file.filename, read, "js/userDB.json");
    res.cookie("img", req.file.filename);
    return res.redirect("feed.html");
  });
})

//ทำให้สมบูรณ์
// ถ้าต้องการจะลบ cookie ให้ใช้
// res.clearCookie('username');
app.get("/logout", (req, res) => {
  res.clearCookie('username');
  res.clearCookie('img');
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
  const obj = await updateMsg(req.body, read, "js/postDB.json");
  res.json(obj);
});

//ทำให้สมบูรณ์
app.post("/checkLogin", async (req, res) => {
  var jsonData = await readJson("js/userDB.json");
  var keys = Object.keys(jsonData);
  var IsCorrect = false;
  for (var numberOfKeys = 0; numberOfKeys < keys.length; numberOfKeys++) {
    if (
      req.body.username == jsonData[keys[numberOfKeys]].username &&
      req.body.password == jsonData[keys[numberOfKeys]].password
    ) {
      console.log("login successful");
      res.cookie("username", jsonData[keys[numberOfKeys]].username);
      res.cookie("img", jsonData[keys[numberOfKeys]].img);
      IsCorrect = true;
      return res.redirect("feed.html");
    }
  }
  if (IsCorrect == false) {
    IsCorrect = false;
    console.log("login failed");
    return res.redirect("index.html?error=1");
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

const updateMsg = (new_msg, data, file_name) => {
  return new Promise((resolve) => {
    var keys = Object.keys(data);
    data["post" + [keys.length + 1]] = {
      user: new_msg.user,
      message: new_msg.message,
    };
    //console.log(data);
    resolve(writeJson(JSON.stringify(data), file_name));
  });
};

//ทำให้สมบูรณ์
const writeJson = (data, file_name) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file_name, data, (err) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

//ทำให้สมบูรณ์
const updateImg = async (username, fileimg, data, file_name) => {
  return new Promise((resolve) => {
    var keys = Object.keys(data);
    for (var numberOfKeys = 0; numberOfKeys < keys.length; numberOfKeys++) {
      //console.log(data[keys[numberOfKeys]].username + "//" + username);
      if (
        data[keys[numberOfKeys]].username == username
      ) {
        data[keys[numberOfKeys]].img = fileimg;
        break;
      }
    }
    resolve(writeJson(JSON.stringify(data), file_name));
    
  });
};

app.listen(port, hostname, () => {
  console.log(`Server running at   http://${hostname}:${port}/`);
});
