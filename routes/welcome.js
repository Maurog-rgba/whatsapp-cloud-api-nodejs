const express = require("express");
const router = express.Router();
require("dotenv").config();
const { sendMessage, sendTemplate } = require("../handlers/messageHelper");

// Substitua body-parser por express.json() e express.urlencoded()
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Adicione um manipulador de erros para express.json()
router.use(function (err, req, res, next) {
  if (err) {
    console.error(err);
    res.status(500).send("Error parsing JSON");
  } else {
    next();
  }
});

router.post("/", function (req, res, next) {
  const data = sendTemplate(process.env.RECIPIENT_WAID);

  sendMessage(data)
    .then(function (response) {
      res.redirect("/");
      console.log(response.data);
      // res.sendStatus(200);
      return;
    })
    .catch(function (error) {
      console.log(error.message);
      console.log(error.response.data);
      res.sendStatus(500);
      return;
    });
});

module.exports = router;
