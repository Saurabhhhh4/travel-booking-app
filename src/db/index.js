const { Sequelize } = require("sequelize");
const configs = require("../config/config");
const env = process.env.NODE_ENV || "development";
const cfg = configs[env];

const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);

const User = require("../models/user")(sequelize);
const Destination = require("../models/destination")(sequelize);
const Booking = require("../models/booking")(sequelize);
const BookingItem = require("../models/bookingItem")(sequelize);

// Associations
User.hasMany(Booking, { foreignKey: "user_id" });
Booking.belongsTo(User, { foreignKey: "user_id" });

Booking.belongsToMany(Destination, {
  through: BookingItem,
  foreignKey: "booking_id",
});
Destination.belongsToMany(Booking, {
  through: BookingItem,
  foreignKey: "destination_id",
});

module.exports = {
  sequelize,
  models: { User, Destination, Booking, BookingItem },
};
