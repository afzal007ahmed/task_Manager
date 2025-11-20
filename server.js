require("dotenv").config();

const { app } = require("./app");
const { sequelize, user, task } = require("./model/index");

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
  });
});
