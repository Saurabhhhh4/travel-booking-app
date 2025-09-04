const { models } = require("../db");

async function list(req, res, next) {
  try {
    const items = await models.Destination.findAll();
    res.json(items);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const { title, description, price, available_slots, location } = req.body;
    if (!title || price == null || !location)
      return res.status(400).json({ error: "title, price, location required" });
    const d = await models.Destination.create({
      title,
      description,
      price,
      available_slots: available_slots || 0,
      location,
    });
    res.status(201).json(d);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const item = await models.Destination.findByPk(id);
    if (!item) return res.status(404).json({ error: "Not found" });
    await item.update(req.body);
    res.json(item);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const item = await models.Destination.findByPk(id);
    if (!item) return res.status(404).json({ error: "Not found" });
    await item.destroy();
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
}

module.exports = { list, create, update, remove };
