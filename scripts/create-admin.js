import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config.js";

// User schema (inline for this script)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    console.log("✅ Connected to MongoDB");

    // Admin credentials (hardcoded as required)
    const adminData = {
      name: "Portfolio Admin",
      email: "admin@portfolio.com",
      password: "admin123",
      role: "admin",
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists!");
      console.log("Email:", adminData.email);
      console.log("Password: admin123");
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Create admin user
    const admin = new User({
      ...adminData,
      password: hashedPassword,
    });

    await admin.save();

    console.log("🎉 Admin user created successfully!");
    console.log("📧 Email:", adminData.email);
    console.log("🔑 Password:", adminData.password);
    console.log("👑 Role: admin");
    console.log("");
    console.log("You can now sign in with these credentials.");
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Run the script
createAdminUser();
