import express from "express";
import {
  getEmployeeData,
  getEmployees,
} from "../controllers/employee.controllers.js";

const router = express.Router();

router.get("/getEmployees", getEmployees);

router.get("/getEmployeeData/:employeeId", getEmployeeData);

export default router;
