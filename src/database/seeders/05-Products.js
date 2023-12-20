"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: 'Notebook Dell Inspiron 15" 3000',
          price: 350599,
          discount: 0,
          description:
            "La Inspiron 15 3000 es una laptop de 15.6 pulgadas con una pantalla HD antirreflejo. Viene con un procesador Intel Core i3-1115G4, 8 GB de RAM y un disco duro de 256 GB SSD.",
          stock: 10,
          mainImage: "img-1702986351179-99399.png",
          brands_id: 4,
          subcategories_id: 1,
        },
        {
          name: "Samsung Galaxy Book Pro 360",
          price: 2999999,
          discount: 0,
          description:
            "La Galaxy Book Pro 360 es una laptop de 13.3 pulgadas con una pantalla AMOLED Full HD. Viene con un procesador Intel Core i7-1165G7, 16 GB de RAM y un disco duro de 512 GB SSD.",
          stock: 5,
          mainImage: "img-1702986428237-62689.png",
          brands_id: 6,
          subcategories_id: 1,
        },
        {
          name: "Mouse inalámbrico Logitech G Pro X Superlight",
          price: 230199,
          discount: 10,
          description:
            "El G Pro X Superlight es un mouse inalámbrico ultraligero de 63 gramos con un sensor HERO 25K de alta precisión.",
          stock: 20,
          mainImage: "img-1702986836970-84447.png",
          brands_id: 1,
          subcategories_id: 20,
        },
        {
          name: "AMD Ryzen 9 5950X",
          price: 1090000,
          discount: 5,
          description:
            "El Ryzen 9 5950X es un procesador de 16 núcleos y 32 hilos con una velocidad base de 3.4 GHz y una velocidad de reloj máxima de 4.9 GHz.",
          stock: 20,
          mainImage: "img-1702986934158-32176.png",
          brands_id: 3,
          subcategories_id: 2,
        },
        {
          name: "Corsair Vengeance RGB Pro SL 32GB (2x16GB) DDR4 3200",
          price: 301250,
          discount: 0,
          description:
            "El Vengeance RGB Pro SL es un kit de memoria RAM DDR4 de 32 GB (2x16GB) con una velocidad de 3200 MHz y una iluminación RGB personalizable.",
          stock: 15,
          mainImage: "img-1702986963307-39066.png",
          brands_id: 5,
          subcategories_id: 8,
        },
        {
          name: "NVIDIA GeForce RTX 3080 Ti",
          price: 1340599,
          discount: 10,
          description:
            "La GeForce RTX 3080 Ti es una tarjeta gráfica de alta gama con 12 GB de memoria GDDR6X y una velocidad de reloj de 1665 MHz.",
          stock: 7,
          mainImage: "img-1702986986003-45898.png",
          brands_id: 2,
          subcategories_id: 6,
        },
        {
          name: "Auriculares Inalámbricos SteelSeries Arctis 7P",
          price: 215000,
          discount: 0,
          description:
            "El Arctis 7P es un auricular inalámbrico para juegos con una duración de batería de hasta 24 horas y un micrófono ClearCast con cancelación de ruido.",
          stock: 10,
          mainImage: "img-1702987001991-33196.png",
          brands_id: 7,
          subcategories_id: 18,
        },
        {
          name: "Teclado mecánico Logitech G915 TKL",
          price: 359900,
          discount: 5,
          description:
            "El G915 TKL es un teclado mecánico inalámbrico de perfil bajo con interruptores GL Tactile y una duración de batería de hasta 40 horas.",
          stock: 5,
          mainImage: "img-1702987022702-96736.png",
          brands_id: 1,
          subcategories_id: 19,
        },
        {
          name: "Mouse Pad Corsair MM300",
          price: 28999,
          discount: 10,
          description:
            "El MM300 es un mouse pad de tela de alta calidad con una base antideslizante y un tamaño de 360x300 mm.",
          stock: 12,
          mainImage: "img-1702988163070-96695.png",
          brands_id: 5,
          subcategories_id: 23,
        },
        {
          name: "Cooler Fan Corsair ML120 Pro RGB",
          price: 147500,
          discount: 0,
          description:
            "El ML120 Pro RGB es un cooler fan de 120 mm con iluminación RGB personalizable y una velocidad de rotación de hasta 2000 RPM.",
          stock: 8,
          mainImage: "img-1702988190299-35975.png",
          brands_id: 5,
          subcategories_id: 12,
        },
        {
          name: "Webcam Logitech C270 HD",
          price: 59599,
          discount: 5,
          description:
            "La C270 HD es una cámara web HD con una resolución de 720p/30fps y una corrección automática de iluminación. Viene con un micrófono integrado y un clip universal para laptops y monitores.",
          stock: 20,
          mainImage: "img-1703010291645-70935.png",
          brands_id: 1,
          subcategories_id: 21,
        },
        {
          name: "Samsung Galaxy A52",
          price: 215000,
          discount: 10,
          description:
            "El Galaxy A52 es un smartphone de gama media con una pantalla Super AMOLED de 6.5 pulgadas, un procesador Qualcomm Snapdragon 720G, 6 GB de RAM y un almacenamiento interno de 128 GB.",
          stock: 15,
          mainImage: "img-1703010316586-45355.png",
          brands_id: 6,
          subcategories_id: 36,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("products", null, {});
  },
};
