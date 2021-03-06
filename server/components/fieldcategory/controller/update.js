const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_category_update) {
    res.status(403).send({
      message: 'Access denied!'
    });
    return;
  }

  const item = await Model.findByPk(req.body.id);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  const updateItem = req.body;
  delete updateItem.id;

  const updatedItem = await Model.update(updateItem);

  res.status(200).send(updatedItem);
}
