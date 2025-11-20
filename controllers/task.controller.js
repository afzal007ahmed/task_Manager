const { task, user } = require("../model/index");

const taskController = {
  all: async (req, res) => {
    try {
      const { filterBy, name, order, sort } = req.query;
      const query = {
        include: {
          model: user,
          attributes: [],
        },
      };
      if (filterBy && filterBy?.length != 0 && name && name?.length != 0) {
        query.where = { [filterBy]: name };
      }
      if (order && order?.length != 0 && ["asc", "desc"].includes(sort)) {
        query.order = [[order, sort]];
      } else {
        query.order = [["id", "asc"]];
      }
      console.log(order, sort);
      const response = await task.findAll(query);

      res.send({
        success: true,
        data: response,
        error: null,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        data: null,
        error: err.message,
      });
    }
  },
  createTask: async (req, res) => {
    try {
      const { title, description, priority, dueDate, status, userId } =
        req.body;
      if (
        title.length === 0 ||
        !["high", "low", "medium"].includes(priority) ||
        dueDate.length === 0 ||
        !["pending", "completed"].includes(status) ||
        !userId
      ) {
        return res.status(400).send("Please provide valid details.");
      }
      const response = await task.create({
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
        status: status,
        userId: userId,
      });
      res.send({
        success: true,
        error: null,
      });
    } catch (error) {
      res.send(500).send({
        success: false,
        error: error.message || "Something went wrong.",
      });
    }
  },
  getTask: async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).send({
          success: false,
          data: null,
          error: "Please provide a valid id.",
        });
      }
      const response = await task.findOne({ where: { id: id } });
      res.send({
        success: true,
        data: response,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        data: null,
        error: error.message || "Something went wrong",
      });
    }
  },
  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).send({
          success: false,
          error: "Please provide a valid id.",
        });
      }

      const response = await task.update(req.body, { where: { id: id } });
      res.send({
        success: true,
        error: null,
      });
    } catch (error) {
      res.send({
        success: false,
        error: error.message,
      });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        res.send({
          success: false,
          error: "Please provide a valid id.",
        });
      }

      const response = await task.destroy({
        where: { id: id },
      });

      res.send(
        res.send({
          success: true,
          error: null,
        })
      );
    } catch (error) {
      res.send({
        success: false,
        error: error.message,
      });
    }
  },
};

module.exports = { taskController };
