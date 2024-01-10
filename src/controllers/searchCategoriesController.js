const { Op } = require("sequelize");
const { Category, Subcategory } = require("../database/models");

const controller = {
  index: async (req, res) => {
    let searchValue = req.query.q;
    let categories = await Category.findAll({
      include: [
        {
          model: Subcategory,
          as: "subcategories",
          where: {
            name: {
              [Op.like]: "%" + searchValue + "%",
            },
          },
        },
      ],
    });
    res.json(categories);
  },
};

module.exports = controller;
