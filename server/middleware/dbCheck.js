import mongoose from "mongoose";

// Middleware to check if database is connected
export const checkDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database connection is not available. Please try again later.",
      error: "Database disconnected",
    });
  }
  next();
};

// Middleware to handle database errors gracefully
export const handleDBError = (error, req, res, next) => {
  if (
    error.name === "MongooseServerSelectionError" ||
    error.name === "MongoNetworkError" ||
    error.name === "MongoTimeoutError"
  ) {
    return res.status(503).json({
      success: false,
      message: "Database connection error. Please try again later.",
      error: "Database unavailable",
    });
  }
  next(error);
};
