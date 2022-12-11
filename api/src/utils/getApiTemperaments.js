const { Temperament } = require('../db.js');
const axios = require('axios');

const URL = 'https://api.thedogapi.com/v1/breeds';

const getApiTemperaments = async () => {
  try {
    const response = await axios.get(URL);
    const arr = response.data
      .map(data => data.temperament)
      .join(', ')
      .split(', ');

    const arrTemperaments = [...new Set(arr)];

    arrTemperaments.forEach(
      el =>
        el.trim() !== '' &&
        Temperament.bulkCreate([
          {
            name: el,
          },
        ])
    );
  } catch (error) {
    let message = error.response.statusText || 'Ocurrió un error';
    console.error(`Error ${error.response.status}: ${message}`);
  }
};

module.exports = { getApiTemperaments };
