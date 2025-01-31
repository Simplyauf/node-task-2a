"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Analytic extends Model {
    static associate(models) {
      // define associations here if needed
    }
  }

  Analytic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      widget_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      browser_type: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: "Analytic",
      tableName: "analytic",
      timestamps: false,
    }
  );

  return Analytic;
};
