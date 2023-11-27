const Evaluate = require('../models/evaluate');

module.exports = {
  addValuate: async (req, res, next) => {
    try {
      if (!req.query.content) {
        return
      }
      const evaluate = new Evaluate(req.query);

      await evaluate.save()
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  getValuate: async (req, res, next) => {
    try {
      const evaluates = await Evaluate.find({ idProduct: req.query.idProduct })
      res.status(200).json({ evaluates })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
}
