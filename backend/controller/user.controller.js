import User from "../models/user.models.js";
import bcrypt from "bcrypt";

// register controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // hashing Password
    const hashPassword = await bcrypt.hash(password, 10).catch((err) => {
      return res.status(500).json({
        success: false,
        data: err.message,
      });
    });

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    // save user
    const user = await newUser.save();
    // user.password = undefined;
    res.status(201).json({
      success: true,
      // data: user,
      message: "Account created successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal server error.",
    });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not registered. Please sign up.",
      });
    }

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password.",
      });
    }

    // const {password, ...others} = user._doc;
    user.password = undefined;
    res.status(200).json({
      success: true,
      data: user,
      message: "Login successful.",
    });
  } catch (err) {
    console.log(err),
      res.status(500).json({
        success: false,
        data: err.message,
        message: "Internal server error.",
      });
  }
};
