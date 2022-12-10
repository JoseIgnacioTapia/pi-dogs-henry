const express = require('express');
const router = express.Router();
const {
  createDog,
  getDogByName,
  getAllDogs,
  getDogById,
} = require('../controllers/controllers');

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
  const dogByName = name != null ? await getDogByName(name) : null;
  console.log(dogByName);
  const allDogs = await getAllDogs();

  if (name) {
    try {
      dogByName.length
        ? res.status(200).json(dogByName)
        : res.status(404).json('El nombre de la raza no fue encontrado');
    } catch (error) {
      res.status(404).send(error.message);
    }
  } else {
    try {
      return res.status(200).json(allDogs);
    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const dog = await getDogById(id);

    return res.status(200).json(dog);
  } catch (error) {
    return res.status(404).send(error);
  }
});

module.exports = router;
