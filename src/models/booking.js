const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("bookings", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  });
};
