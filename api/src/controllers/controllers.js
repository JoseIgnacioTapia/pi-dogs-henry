'use strict';
const { Op } = require('sequelize');
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

  getAllDogs: async function () {
    const dogsDb = await Dog.findAll({
      include: Temperament,
    });

    const newDogsDb = dogsDb?.map(d => ({
      id: d.id,
      name: d.name,
      image: d.image,
      weight: `${d.minWeight} - ${d.maxWeight}`,
      temperament: d.temperaments.map(t => t.name).toString(),
    }));

    const response = await fetch('https://api.thedogapi.com/v1/breeds');
    const dogsApi = await response.json();

    const newDogApi = dogsApi?.map(d => ({
      id: d.id,
      name: d.name,
      image: d.image.url,
      weight: d.weight.metric,
      temperament: d.temperament,
    }));

    if (!dogsDb || !dogsApi) throw new Error('Hubo un error en la petición');

    return newDogsDb.concat(newDogApi);
  },

  getDogByName: async function (name) {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds`);
    const dogsApi = await response.json();
    const dogsApiFound = dogsApi.filter(d =>
      d.name.toLowerCase().includes(name)
    );

    const newDogsApi = dogsApiFound?.map(d => ({
      id: d.id,
      name: d.name,
      image: d.image.url,
      weight: d.weight.metric,
      temperament: d.temperament,
    }));

    const dogsDbFound = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Temperament,
    });

    const newDogsDb = dogsDbFound?.map(d => ({
      id: d.id,
      name: d.name,
      image: d.image,
      weight: `${d.minWeight} - ${d.maxWeight}`,
      temperament: d.temperaments.map(t => t.name).toString(),
      createdForDb: d.createdForDb,
    }));

    return newDogsApi.concat(newDogsDb);
  },

  getDogById: async function (id) {
    const response = await fetch('https://api.thedogapi.com/v1/breeds');
    const dogsApi = await response.json();
    const dogsApiFound = dogsApi.filter(d => d.id == id);

    const detailsDogsApi = dogsApiFound?.map(d => ({
      id: d.id,
      name: d.name,
      image: d.image.url,
      weight: d.weight.metric,
      temperament: d.temperament,
      height: d.height.metric,
      lifeSpan: d.life_span,
    }));

    if (!dogsApiFound.length) {
      const dogsDbFound = await Dog.findByPk(id, {
        include: Temperament,
      });

      const detailsDogsDb = {
        id: dogsDbFound.id,
        name: dogsDbFound.name,
        image: dogsDbFound.image,
        weight: `${dogsDbFound.minWeight} - ${dogsDbFound.maxWeight}`,
        temperament: dogsDbFound.temperaments.map(t => t.name).toString(),
        height: `${dogsDbFound.minHeight} - ${dogsDbFound.maxHeight}`,
        lifeSpan: dogsDbFound.lifeSpan,
        createdForDb: dogsDbFound.createdForDb,
      };

      return detailsDogsDb;
    }

    return detailsDogsApi;
  },
};
