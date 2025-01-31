module.exports = (sequelize, DataTypes) => {
  const Upload = sequelize.define(
    "Upload",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      filename: DataTypes.STRING,
      path: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "uploads",
      timestamps: false,
    }
  );

  return Upload;
};
