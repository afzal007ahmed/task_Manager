const { user } = require("../model/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  registerUser: async (req, res) => {
    try {
      console.log(req.body);
      if (
        req.body.name.length === 0 ||
        req.body.password.length === 0 ||
        req.body.email.length === 0
      ) {
        return res.status(400).send({
          success: false,
          data: null,
          error: "Invalid Values.",
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const response = await user.create({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      res.send({
        success: true,
        data: response,
        error: null,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        data: null,
        error: error.message || "Something went wrong!",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { password, email } = req.body;
      if (password.length === 0 || email.length === 0) {
        return res.status(400).send({
          success: false,
          data: null,
          error: "Invalid Credentials.",
        });
      }
      const userDetails = await user.findOne({
        email: email,
      });
      console.log( userDetails ) ;
      if (await bcrypt.compare(password, userDetails.password)) {
        const obj = {
          id: userDetails.id,
          name: userDetails.username,
          email: userDetails.email,
        };
        const token = jwt.sign(obj, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.send({
          success: true,
          data: obj,
          error: null,
        });
      } else {
        return res.status(400).send("Invalid Password.");
      }
    } catch (err) {
        res.status(500).send({
            success : false ,
            data : null ,
            error : err.message || "Something went wrong."
        })
    }
  },
};

module.exports = {
  userController,
};
