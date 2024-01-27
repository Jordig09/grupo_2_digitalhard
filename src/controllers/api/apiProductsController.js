const db = require("../../database/models");

const apiProductsController = {
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll();
            const count = products.length;
            const countByCategory = products.reduce((acc, product) => {
                const category = product.subcategories_id;
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});

            const formattedProducts = products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                categories: [product.subcategories_id], 
                detail: `/api/products/${product.id}`,
            }));

            res.json({
                count,
                countByCategory,
                products: formattedProducts,
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
                    { model: db.Brand, as: 'brand' },
                    { model: db.Subcategory, as: 'subcategory', include: [{ model: db.Category, as: 'category' }] },
                    { model: db.Image, as: 'images' },
                    { model: db.SpecificationDetails, as: 'specification', include: [{ model: db.Specification, as: 'specification' }] },
                ]
            });

            const productDetail = {
                id: product.id,
                name: product.name,
                description: product.description,
                brand: product.brand.name,
                subcategory: product.subcategory.name,
                category: product.subcategory.category.name,
                images: product.images.map(image => image.url),
                specification: product.specification.map(spec => ({
                    name: spec.name,
                    text: spec.text,
                })),
                imageUrl: `/api/products/image/${product.id}`,
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
