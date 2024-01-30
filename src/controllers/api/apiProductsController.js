const db = require("../../database/models");

const apiProductsController = {
  list: async (req, res) => {
    try {
      const products = await db.Product.findAll();
      const count = products.length;
      const categories = await db.Category.findAll({
        include: ["subcategories"],
      });
      const brands = await db.Brand.findAll();

      brands.forEach((brand) => {
        let brandJSON = brand.toJSON();
        const productCount = products.filter(
          (product) => product.brands_id === brand.id
        ).length;
        brandJSON.productCount = productCount;
        brands[brands.indexOf(brand)] = brandJSON;
      });

      const subcategories = await db.Subcategory.findAll();
      const subcategoriesCount = subcategories.length;
      subcategories.forEach((subcategory) => {
        let subcategoryJSON = subcategory.toJSON();
        const productCount = products.filter(
          (product) => product.brands_id === subcategory.id
        ).length;
        subcategoryJSON.productCount = productCount;
        subcategories[subcategories.indexOf(subcategory)] = subcategoryJSON;
      });

      const categoriesDetail = subcategories.map((subcategory) => ({
        id: categories[subcategory.categories_id - 1].id,
        category: categories[subcategory.categories_id - 1].name,
        subcategory_id: subcategory.id,
        name: subcategory.name,
        productCount: subcategory.productCount,
      }));

      const productDetail = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        stock: product.stock,
        category: subcategories[product.subcategories_id - 1].name,
        brand: brands[product.brands_id - 1].name,
        detail: `/api/products/${product.id}`,
      }));

      res.json({
        count,
        subcategoriesCount,
        categoriesDetail,
        productDetail,
        brands,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },

  detail: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await db.Product.findByPk(productId, {
        include: [
          { model: db.Brand, as: "brand" },
          {
            model: db.Subcategory,
            as: "subcategory",
            include: [{ model: db.Category, as: "category" }],
          },
          { model: db.Image, as: "images" },
          {
            model: db.SpecificationDetails,
            as: "specification",
            include: [{ model: db.Specification, as: "specification" }],
          },
        ],
      });

      const specifications = [];
      product.specification.forEach((data) => {
        let index = specifications.findIndex(
          (i) => i.id == data.specification.id
        );
        if (index == -1)
          specifications.push({
            id: data.specification.id,
            title: data.specification.title,
            detail: [data],
          });
        else specifications[index].detail.push(data);
      });

      function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);

        // Obtener las partes de la fecha
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Meses son 0-indexados
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        // Formatear la fecha y hora
        const formattedDateTime = `${hours}:${minutes}:${seconds} hs - ${day}/${month}/${year}`;

        return formattedDateTime;
      }

      const productDetail = {
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        brand: product.brand.name,
        subcategory: product.subcategory.name,
        category: product.subcategory.category.name,
        images: product.images.map((image) => image.url),
        specification: specifications.map((spec) => ({
          id: spec.id,
          title: spec.title,
          detail: spec.detail.map((det) => ({
            id: det.id,
            name: det.name,
            value: det.text,
          })),
        })),
        imageUrl: `/api/products/image/${product.id}`,
        createdAt: formatDateTime(product.createdAt),
        updatedAt: formatDateTime(product.updatedAt),
      };

      res.json(productDetail);
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  },
};

module.exports = apiProductsController;
