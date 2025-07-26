import app from "./server/server.js";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Admin credentials: admin@portfolio.com / admin123`);
  console.log(`🌐 Frontend URL: http://localhost:5173`);
});
