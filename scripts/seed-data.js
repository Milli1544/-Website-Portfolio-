import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import User from "../server/models/user.model.js";
import Contact from "../server/models/Contact.js";
import Project from "../server/models/Project.js";
import Qualification from "../server/models/qualification.js";

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Contact.deleteMany({}),
      Project.deleteMany({}),
      Qualification.deleteMany({})
    ]);
    console.log("🧹 Cleared existing data");

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedAdminPassword = await bcrypt.hash("admin123", salt);
    
    const admin = new User({
      name: "Portfolio Admin",
      email: "admin@portfolio.com",
      password: hashedAdminPassword,
      role: "admin"
    });
    await admin.save();

    // Create regular user
    const hashedUserPassword = await bcrypt.hash("user123", salt);
    const user = new User({
      name: "John Doe",
      email: "user@portfolio.com",
      password: hashedUserPassword,
      role: "user"
    });
    await user.save();

    // Create sample contacts
    const contacts = [
      {
        firstname: "Alice",
        lastname: "Johnson",
        email: "alice.johnson@email.com"
      },
      {
        firstname: "Bob",
        lastname: "Smith",
        email: "bob.smith@email.com"
      },
      {
        firstname: "Carol",
        lastname: "Williams",
        email: "carol.williams@email.com"
      }
    ];
    await Contact.insertMany(contacts);

    // Create sample projects
    const projects = [
      {
        title: "E-commerce Website",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@email.com",
        completion: new Date("2024-01-15"),
        description: "A full-stack e-commerce website built with MERN stack featuring user authentication, shopping cart, and payment integration."
      },
      {
        title: "Task Management App",
        firstname: "Jane",
        lastname: "Smith",
        email: "jane.smith@email.com",
        completion: new Date("2024-02-20"),
        description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking."
      },
      {
        title: "Portfolio Website",
        firstname: "Mike",
        lastname: "Johnson",
        email: "mike.johnson@email.com",
        completion: new Date("2024-03-10"),
        description: "A responsive portfolio website showcasing projects, skills, and experience with modern design and smooth animations."
      }
    ];
    await Project.insertMany(projects);

    // Create sample qualifications
    const qualifications = [
      {
        title: "Bachelor of Computer Science",
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@email.com",
        completion: new Date("2023-06-15"),
        description: "Comprehensive computer science degree covering software engineering, algorithms, data structures, and web development."
      },
      {
        title: "Full Stack Web Development Certification",
        firstname: "Jane",
        lastname: "Smith",
        email: "jane.smith@email.com",
        completion: new Date("2024-01-30"),
        description: "Intensive certification program covering modern web technologies including React, Node.js, MongoDB, and Express.js."
      },
      {
        title: "AWS Cloud Practitioner",
        firstname: "Mike",
        lastname: "Johnson",
        email: "mike.johnson@email.com",
        completion: new Date("2024-02-15"),
        description: "Cloud computing certification demonstrating knowledge of AWS services, architecture, and best practices."
      }
    ];
    await Qualification.insertMany(qualifications);

    console.log("🎉 Sample data created successfully!");
    console.log("\n👤 Admin Credentials:");
    console.log("📧 Email: admin@portfolio.com");
    console.log("🔑 Password: admin123");
    console.log("👑 Role: admin");
    
    console.log("\n👤 User Credentials:");
    console.log("📧 Email: user@portfolio.com");
    console.log("🔑 Password: user123");
    console.log("👤 Role: user");

    console.log("\n📊 Data Summary:");
    console.log(`✅ ${await User.countDocuments()} users created`);
    console.log(`✅ ${await Contact.countDocuments()} contacts created`);
    console.log(`✅ ${await Project.countDocuments()} projects created`);
    console.log(`✅ ${await Qualification.countDocuments()} qualifications created`);

  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

// Run the script
seedData();