const controller = {
  index: (req, res) => {
    res.render("login.ejs", {
      styles: [
        "https://fonts.googleapis.com/css2?family=Metrophobic&family=Montserrat:wght@100;200;300;400&display=swap",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "/css/styles.css",
        "/css/login.css",
      ],
    });
  },
};

module.exports = controller;
