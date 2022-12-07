const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    'dog',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minHeight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxHeight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minWeight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maxWeight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lifeSpan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdForDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
