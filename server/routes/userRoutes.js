import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Routes for /api/users
router
  .route("/")
  .get(getUsers) // GET /api/users - get all users
  .post(createUser) // POST /api/users - add new user
  .delete(deleteAllUsers); // DELETE /api/users - remove all users

// Routes for /api/users/:id
router
  .route("/:id")
  .get(getUserById) // GET /api/users/:id - get user by id
  .put(updateUser) // PUT /api/users/:id - update user by id
  .delete(deleteUser); // DELETE /api/users/:id - remove user by id

export default router;
