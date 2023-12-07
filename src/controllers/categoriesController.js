const db = require("../database/models");

const controller = {
  getSubcategories: async (req, res) => {
    try {
      const subcategories = await db.Subcategory.findAll({
        where: {
          category_id: req.body.category_id,
        },
      });
      res.send({ subcategories });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = controller;
