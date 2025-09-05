import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1).max(200),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  completed: z.boolean().optional(),
});

export function validate(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "ValidationError", details: parsed.error.flatten() });
    }
    req.valid = parsed.data;
    next();
  };
}
