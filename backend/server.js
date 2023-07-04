//REST API demo in Node.js
const express = require("express"); // requre the express framework
const fs = require("fs"); //require file system object
const bodyParser = require("body-parser");
 

const app = express();

const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const fileName = __dirname + "/" + "db/users.json";

// Endpoint to Get a list of users
app.get("/users", function (req, res) {
  fs.readFile(fileName, "utf8", function (err, data) {
    res.send(data);
  });
});

//Endpoint to get a single user by id
app.get("/users/:id", function (req, res) {
  // First retrieve existing user list
  fs.readFile(fileName, "utf8", function (err, data) {
    const dataList = JSON.parse(data);
    const users = dataList.users;
    const user = users.filter((user) => 
      user.id === req.params.id
    );

    res.send(user);
  });
});

app.delete("/users/:id", function (req, res) {
  fs.readFile(fileName, function (err, data) {
    const dataList = JSON.parse(data);
    const users = dataList.users;
    const filteredList = users.filter((user) => 
      user.id !== req.params.id
    );

    dataList.users = filteredList;

    fs.writeFile(fileName, JSON.stringify(dataList), function (err, result) {
      if (err) console.log("error", err);

      res.send(dataList);
    });
  });
});

//The addUser endpoint
app.post("/users", function (req, res) {
  const newUser = req.body;

    fs.readFile(fileName, function (err, data) {
      const dataList = JSON.parse(data);

      const userList = dataList.users;
      userList.push(newUser);

      fs.writeFile(fileName, JSON.stringify(dataList), function (err, result) {
        if (err) console.log("error", err);

        res.send(newUser);
      });
    });
});

// Create a server to listen at port 5000
let server = app.listen(5000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});
