const models = require("../models");

const getAllResults = (req, res) => {
  models.result
    .getAllUserGuesses()
    .then(([results]) => {
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const addResults = (req, res) => {
  const resultData = req.body;

  models.result.deleteByUserId(resultData.user_id).then(() => {
    models.result
      .insert(resultData)
      .then(([insertedResult]) => {
        res.location(`/result/${insertedResult.insertId}`).sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  });
};

// ... rest of the code

const updateResults = (req, res) => {
  const { userId } = req.params;
  const result = req.body;

  models.result
    .updateByUserId(userId, result)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteResults = (req, res) => {
  const { userId } = req.params;

  models.result
    .deleteByUserId(userId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAllResults,
  addResults,
  updateResults,
  deleteResults,
};
