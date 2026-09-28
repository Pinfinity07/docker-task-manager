const { z } = require("zod");

const taskTitle = z
  .string({
    error: (issue) =>
      issue.input === undefined
        ? "Title is required"
        : "Title must be a string",
  })
  .min(1, "Title is required")
  .max(255, "Title must be 255 characters or less");

const taskDescription = z
  .string()
  .max(5000, "Description must be 5000 characters or less")
  .optional();

const createTaskSchema = z.object({
  title: taskTitle,
  description: taskDescription,
});

const updateTaskSchema = z.object({
  title: taskTitle,
  description: taskDescription,
  completed: z.boolean({
    error: "Completed must be a boolean",
  }),
});

const taskIdSchema = z.coerce.number().int().positive();

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
};