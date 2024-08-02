import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./config/index.js";
import { APIError } from "./utils/APIError.js";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import routes
import userRoutes from "./routes/user.routes.js";
import employeeRoutes from "./routes/employee.routes.js";

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/employees", employeeRoutes);

// Handle 404 errors
app.use((_, __, next) => {
  next(new APIError(404, "Route not found"));
});

// Error handling middleware
app.use((err, _, res, __) => {
  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: false,
      message: err.message,
      details: err.details || null,
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
      details: err,
    });
  }
});

export { app };
