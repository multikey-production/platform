const Model = require('../model');

module.exports = async (req, res) => {
  const filter = JSON.parse(req.query.filter || "{}");

  const item = await Model.findByPk(req.params.id, filter);

  if (!item) {
    res.status(404).send({
      message: 'Not found!'
    });
    return;
  }

  res.status(200).send(item);
}
