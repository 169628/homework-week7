var express = require('express');
var router = express.Router();

const usercontroller = require("../controllers/userController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/post",usercontroller.post)

module.exports = router;
