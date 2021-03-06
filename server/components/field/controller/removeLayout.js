const Model = require('../model');

module.exports = async (req, res) => {
  if (!req.rules.is_field_update) {
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

  for await (layout of req.body.layouts) {
    await item.removeLayout(layout);
  }

  const updatedItem = await Model.findByPk(req.body.id, {
    include: ['layouts']
  });

  res.status(200).send(updatedItem);
}
