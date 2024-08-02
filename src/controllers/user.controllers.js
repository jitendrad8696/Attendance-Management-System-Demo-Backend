import { User } from "../models/user.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validations
    if (!email) {
      return next(new APIError(400, "Email is required."));
    }

    if (!password) {
      return next(new APIError(400, "Password is required."));
    }

    // Fetch user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new APIError(404, "User does not exist."));
    }

    // Validate password
    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return next(new APIError(400, "Invalid password."));
    }

    res
      .status(200)
      .json(new APIResponse(200, "User logged in successfully", user));
  } catch (error) {
    console.error("Error: User login failed: ", error);
    next(error);
  }
};
