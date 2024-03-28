import { config } from "dotenv";
import { Router, json, urlencoded } from "express";
import MessageHelper from "../handlers/messageHelper.js";

const messageHelper = new MessageHelper();
const router = Router();

config();
// Substitua body-parser por express.json() e express.urlencoded()
router.use(json());
router.use(urlencoded({ extended: false }));

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
  const data = messageHelper.sendTemplate(process.env.RECIPIENT_WAID);

  messageHelper.sendMessage(data)
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

export default router;
