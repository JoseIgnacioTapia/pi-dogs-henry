const { DataTypes } = require('sequelize');

module.exports = seguelize => {
  const { DataTypes } = require('sequelize');
  seguelize.define(
    'temperament',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
