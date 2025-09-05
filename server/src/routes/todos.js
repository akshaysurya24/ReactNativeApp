import { Router } from "express";
import { Todo } from "../models/Todo.js";
import { createTodoSchema, updateTodoSchema, validate } from "../lib/validate.js";

const router = Router();

// GET /todos
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 }).lean();
  res.json(todos);
});

// POST /todos
router.post("/", validate(createTodoSchema), async (req, res) => {
  const todo = await Todo.create({ title: req.valid.title });
  res.status(201).json(todo);
});

// PATCH /todos/:id
router.patch("/:id", validate(updateTodoSchema), async (req, res) => {
  const { id } = req.params;
  const updated = await Todo.findByIdAndUpdate(id, req.valid, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ error: "NotFound" });
  res.json(updated);
});

// DELETE /todos/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const doc = await Todo.findByIdAndDelete(id);
  if (!doc) return res.status(404).json({ error: "NotFound" });
  res.status(204).send();
});

export default router;
