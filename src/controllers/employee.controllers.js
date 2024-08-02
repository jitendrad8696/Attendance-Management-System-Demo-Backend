import { Employee } from "../models/employee.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find(
      {},
      "employeeId name email joiningDate designation phoneNumber department employmentStatus"
    );

    res
      .status(200)
      .json(
        new APIResponse(200, "Employees retrieved successfully", employees)
      );
  } catch (error) {
    console.error("Error: Failed to retrieve employees: ", error);
    next(new APIError(500, "Failed to retrieve employees"));
  }
};

export const getEmployeeData = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json(new APIResponse(404, "Employee not found"));
    }

    res
      .status(200)
      .json(
        new APIResponse(200, "Employee data retrieved successfully", employee)
      );
  } catch (error) {
    console.error("Error: Failed to retrieve employee data: ", error);
    next(new APIError(500, "Failed to retrieve employee data"));
  }
};
