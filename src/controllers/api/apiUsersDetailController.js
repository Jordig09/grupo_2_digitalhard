const db = require("../../database/models");

module.exports = {
  list: async (req, res) => {
    try {
      const users = await db.User.findAll({
        attributes: { exclude: ["password"] },
      });
      const userList = users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.roles_id === 1 ? "Administrador" : "Usuario",
        detail: `/api/users/${user.id}`,
      }));
      res.json({
        count: userList.length,
        data: userList,
        status: 200,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  detail: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await db.User.findByPk(userId, {
        attributes: { exclude: ["password", "roles_id"] },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ data: user, status: 200 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
