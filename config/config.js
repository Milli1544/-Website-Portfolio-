const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://milikifleyesus:AN8eUkNboexicwz7@test.ivz1lib.mongodb.net/portfolio" ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/portfolio",
};

export default config;
