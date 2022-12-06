const express = require('express');
const router = express.Router();
const { getTemperaments } = require('../controllers/controllers.js');

router.get('/', async (req, res) => {
  try {
    const allTemperaments = await getTemperaments();
    return res.status(200).json(allTemperaments);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
