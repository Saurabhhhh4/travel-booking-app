const { sequelize, models } = require("../db");

async function createBooking(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const { items } = req.body; // [{ destinationId, quantity }]
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: "items required" });

    const destIds = items.map((i) => i.destinationId);
    const destinations = await models.Destination.findAll({
      where: { id: destIds },
      transaction: t,
    });

    if (destinations.length !== destIds.length) {
      await t.rollback();
      return res.status(400).json({ error: "Invalid destination in items" });
    }

    // check slots and compute total
    let total = 0;
    for (const it of items) {
      const d = destinations.find((dd) => dd.id === it.destinationId);
      if (d.available_slots < it.quantity) {
        await t.rollback();
        return res
          .status(400)
          .json({ error: `Insufficient slots for ${d.title}` });
      }
      total += Number(d.price) * it.quantity;
    }

    const booking = await models.Booking.create(
      { user_id: req.user.sub, total },
      { transaction: t }
    );

    for (const it of items) {
      const d = destinations.find((dd) => dd.id === it.destinationId);
      await models.BookingItem.create(
        {
          booking_id: booking.id,
          destination_id: d.id,
          quantity: it.quantity,
          price: d.price,
        },
        { transaction: t }
      );
      // decrement available_slots
      await d.update(
        { available_slots: d.available_slots - it.quantity },
        { transaction: t }
      );
    }

    await t.commit();
    res.status(201).json({ id: booking.id, total });
  } catch (e) {
    await t.rollback();
    next(e);
  }
}

async function listMyBookings(req, res, next) {
  try {
    const bookings = await models.Booking.findAll({
      where: { user_id: req.user.sub },
      include: [{ model: models.Destination }],
    });
    res.json(bookings);
  } catch (e) {
    next(e);
  }
}

module.exports = { createBooking, listMyBookings };
