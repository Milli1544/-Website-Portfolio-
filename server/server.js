import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qualificationRoutes from "./routes/qualificationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { handleDBError } from "./middleware/dbCheck.js";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client build
app.use(express.static(path.join(__dirname, "../client/dist")));

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

// Initialize database connection
connectDB();

// Routes - tell server what to do for different URLs
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Database error handling middleware
app.use(handleDBError);

// Root route - what happens when someone visits just "/"
app.get("/", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "✅ Connected" : "❌ Disconnected";

  res.send(`
        <h1>Welcome to My Portfolio Backend API</h1>
        <p>Server is running successfully on port ${PORT}</p>
        <p><strong>Database Status:</strong> ${dbStatus}</p>
        <h3>Available Endpoints:</h3>
        <ul>
            <li>GET /api/contacts - Get all contacts</li>
            <li>GET /api/projects - Get all projects</li>
            <li>GET /api/qualifications - Get all qualifications</li>
            <li>GET /api/users - Get all users</li>
            <li>POST /api/auth/signup - Register new user</li>
            <li>POST /api/auth/signin - Login user</li>
            <li>GET /api/auth/signout - Logout user</li>
            <li>GET /api/auth/me - Get current user (protected)</li>
        </ul>
        ${
          dbStatus.includes("❌")
            ? `
        <div style="background: #ffebee; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h4>⚠️ Database Connection Issue</h4>
            <p>To fix this, whitelist your IP in MongoDB Atlas:</p>
            <ol>
                <li>Go to <a href="https://cloud.mongodb.com/" target="_blank">MongoDB Atlas</a></li>
                <li>Navigate to Network Access</li>
                <li>Click "Add IP Address"</li>
                <li>Choose "Allow Access from Anywhere" (0.0.0.0/0)</li>
                <li>Click "Confirm"</li>
            </ol>
        </div>
        `
            : ""
        }
    `);
});

export default app;
