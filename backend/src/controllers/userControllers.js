const models = require("../models");

const getAllUsers = (req, res) => {
  models.user
    .findAll()
    .then(([users]) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const loginUser = (req, res) => {
  const {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
  } = req.body;

  models.user
    .findByDetails(firstName, lastName, phoneNumber)
    .then(async ([users]) => {
      if (users.length > 0) {
        const user = users[0];

        const hasResults = await models.result.checkIfUserHasResponded(user.id);

        res.send({ success: true, user, hasResult: hasResults });
      } else {
        res.status(401).send({ success: false, message: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error while attempting to login");
    });
};

module.exports = {
  getAllUsers,
  loginUser,
};
