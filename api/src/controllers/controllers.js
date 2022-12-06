'use strict';
const { Dog, Temperament } = require('../db.js');

module.exports = {
  getTemperaments: async function () {
    const temperaments = await Temperament.findAll();
    if (!temperaments) throw new Error('Hubo un error en la petición');

    return temperaments;
  },

  createDog: async function (
    name,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    lifeSpan,
    image,
    createdForDb,
    temperaments
  ) {
    if (
      !name ||
      !minHeight ||
      !maxHeight ||
      !minWeight ||
      !maxWeight ||
      !image ||
      !temperaments
    )
      throw new Error('No fueron enviados todos los datos!');

    const nameLow = name.toLowerCase();

    const dogFound = await Dog.findOne({
      where: {
        name: nameLow,
      },
    });

    let dogCreated;

    if (dogFound === null) {
      dogCreated = await Dog.create({
        name: nameLow,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        lifeSpan,
        createdForDb,
        image,
      });
    } else {
      return 'La raza ya existe';
    }

    const temperamentDb = await Temperament.findAll({
      where: {
        name: temperaments,
      },
    });
    console.log(temperamentDb);
    await dogCreated.addTemperament(temperamentDb);

    return 'Se ha creado la raza';
  },
};
