const express = require('express');
const router = express.Router();
const { createDog } = require('../controllers/controllers');

router.post('/', async (req, res) => {
  const {
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    lifeSpan,
    image,
    createdForDb,
    temperaments,
  } = req.body;

  try {
    res
      .status(201)
      .json(
        await createDog(
          name,
          minHeight,
          maxHeight,
          minWeight,
          maxWeight,
          lifeSpan,
          image,
          createdForDb,
          temperaments
        )
      );
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const { name } = req.query;
});

module.exports = router;
