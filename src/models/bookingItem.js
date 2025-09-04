const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("booking_items", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    booking_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    destination_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  });
};
