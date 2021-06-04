module.exports = (userModel) => {
  const express = require("express");
  const router = express.Router();

  router.post("/create", async (req, res) => {
    // TODO: Implement user account creation
    const user = await userModel.createUser(
      req.body.username,
      req.body.password,
      function (err, result) {
        if (err === 401) {
          res.status(err).send({ Error: result });
        } else if (err == 403) {
          res.status(403).send({ Error: result });
        } else {
          res.send({ Message: err });
        }
      }
    );
    // res.status(501).json({ msg: "create new user not implemented" });
  });

  router.patch("/", (req, res) => {
    // TODO: Implement user update (change password, etc).
    res.status(501).json({ msg: "update user not implemented" });
  });

  // This route takes a username and a password and creates an auth token
  // POST /api/users/authenticate
  router.post("/authenticate", async (req, res) => {
    const authenticate = await userModel.authenticate(
      req.body.username,
      req.body.password,
      function (err, result) {
        if (err === 401) {
          res.status(err).json({ Error: result });
        } else if (err == 403) {
          res.status(403).json({ Error: result });
        } else {
          res.json({ Message: err, Token: result });
        }
      }
    );
  });

  return router;
};
