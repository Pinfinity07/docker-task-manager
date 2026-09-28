const {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} = require("../../validation/taskSchemas");

describe("Task validation schemas", () => {
  describe("createTaskSchema", () => {
    test("should accept a valid task", () => {
      const result = createTaskSchema.safeParse({
        title: "Test task",
        description: "A valid description",
      });

      expect(result.success).toBe(true);
    });

    test("should reject a missing title", () => {
      const result = createTaskSchema.safeParse({
        description: "This task has no title",
      });

      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toBe("Title is required");
    });

    test("should reject an empty title", () => {
      const result = createTaskSchema.safeParse({
        title: "",
      });

      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toBe("Title is required");
    });

    test("should reject a title longer than 255 characters", () => {
      const result = createTaskSchema.safeParse({
        title: "a".repeat(256),
      });

      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toBe(
        "Title must be 255 characters or less",
      );
    });

    test("should reject a description longer than 5000 characters", () => {
      const result = createTaskSchema.safeParse({
        title: "Test task",
        description: "a".repeat(5001),
      });

      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toBe(
        "Description must be 5000 characters or less",
      );
    });
  });

  describe("updateTaskSchema", () => {
    test("should accept a valid task update", () => {
      const result = updateTaskSchema.safeParse({
        title: "Updated task",
        description: "Updated description",
        completed: true,
      });

      expect(result.success).toBe(true);
    });

    test("should reject a non-boolean completed value", () => {
      const result = updateTaskSchema.safeParse({
        title: "Updated task",
        description: "Updated description",
        completed: "true",
      });

      expect(result.success).toBe(false);
    });

    test("should reject an update without a title", () => {
      const result = updateTaskSchema.safeParse({
        description: "Updated description",
        completed: true,
      });

      expect(result.success).toBe(false);
      expect(result.error.issues[0].message).toBe("Title is required");
    });
  });

  describe("taskIdSchema", () => {
    test("should accept a positive integer", () => {
      const result = taskIdSchema.safeParse("123");

      expect(result.success).toBe(true);
      expect(result.data).toBe(123);
    });

    test("should reject zero", () => {
      const result = taskIdSchema.safeParse("0");

      expect(result.success).toBe(false);
    });

    test("should reject a negative number", () => {
      const result = taskIdSchema.safeParse("-1");

      expect(result.success).toBe(false);
    });

    test("should reject a non-numeric ID", () => {
      const result = taskIdSchema.safeParse("abc");

      expect(result.success).toBe(false);
    });
  });
});