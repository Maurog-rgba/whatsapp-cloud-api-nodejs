import { config } from "dotenv";
import { Router, json, urlencoded } from "express";
import MessageHelper from "../handlers/messageHelper.js";

const messageHelper = new MessageHelper();
const router = Router();

config();

router.use(json());
router.use(urlencoded({ extended: false }));

router.use(function (err, req, res, next) {
  if (err) {
    console.error(err);
    res.status(500).send("Error parsing JSON");
  } else {
    next();
  }
});

router.post("/", function (req, res, next) {
  const requestBody = req.body;
  console.log('name:', requestBody.name);
  console.log('email:', requestBody.phone);
  const data = messageHelper.sendTemplate(process.env.RECIPIENT_WAID, requestBody.name, requestBody.phone);

  messageHelper.sendMessage(data)
    .then(function (response) {
      res.redirect("/");
      console.log(response.data);
      return;
    })
    .catch(function (error) {
      console.log(error.message);
      return;
    });
});

export default router;
