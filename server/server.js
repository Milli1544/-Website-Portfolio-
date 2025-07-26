import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import educationRoutes from "./routes/education.routes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin.routes.js";
import { handleDBError } from "./middleware/dbCheck.js";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : [
            "http://localhost:5173", // Vite dev server
            "http://localhost:5174", // Vite dev server (alternative port)
            "http://localhost:3000", // Compatibility
            "http://localhost:4173", // Vite preview
          ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from client build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

// MongoDB connection with graceful error handling
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || config.mongoUri;
    console.log("Attempting to connect to MongoDB...");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB database: Portfolio");
    await createDefaultAdmin();
    return true;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("⚠️  Server will continue without database connection");
    console.log("📝 To fix this, whitelist your IP in MongoDB Atlas:");
    console.log("   1. Go to https://cloud.mongodb.com/");
    console.log("   2. Navigate to Network Access");
    console.log("   3. Click 'Add IP Address'");
    console.log("   4. Choose 'Allow Access from Anywhere' (0.0.0.0/0)");
    return false;
  }
};

// Create default admin user
const createDefaultAdmin = async () => {
  try {
    const User = (await import("./models/user.model.js")).default;
    const bcrypt = (await import("bcryptjs")).default;

    const adminExists = await User.findOne({ email: "admin@portfolio.com" });

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      const admin = new User({
        name: "Portfolio Admin",
        email: "admin@portfolio.com",
        password: hashedPassword,
        role: "admin",
      });

      await admin.save();
      console.log("✅ Default admin user created");
      console.log("📧 Email: admin@portfolio.com");
      console.log("🔑 Password: admin123");
    }
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  }
};

// Initialize database connection
connectDB();

// API Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: dbStatus,
    message: "Server is running",
  });
});

// Database error handling middleware
app.use(handleDBError);

// Root route
app.get("/", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "✅ Connected" : "❌ Disconnected";

  res.send(`
    <h1>Portfolio Backend API</h1>
    <p>Server is running successfully</p>
    <p><strong>Database Status:</strong> ${dbStatus}</p>
    <h3>Available Endpoints:</h3>
    <ul>
      <li>POST /api/auth/signup - Register new user</li>
      <li>POST /api/auth/signin - Login user</li>
      <li>GET /api/auth/signout - Logout user</li>
      <li>GET /api/auth/me - Get current user (protected)</li>
      <li>GET /api/contacts - Get all contacts</li>
      <li>GET /api/projects - Get all projects</li>
      <li>GET /api/educations - Get all educations</li>
      <li>GET /api/users - Get all users (admin only)</li>
      <li>GET /api/admin/* - Admin routes (admin only)</li>
    </ul>
    ${
      dbStatus.includes("❌")
        ? `
      <div style="background: #ffebee; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h4>⚠️ Database Connection Issue</h4>
        <p>Please check your MongoDB connection string and network access.</p>
      </div>
    `
        : ""
    }
  `);
});

// Catch all handler for production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

export default app;
