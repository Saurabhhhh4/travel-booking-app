const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: { type: DataTypes.STRING(200), allowNull: false },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  });

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return User;
};
