const request = require("supertest");
const app = require("../../index");
const pool = require("../../db");

describe("Tasks API", () => {
  beforeEach(async () => {
    // Clear the tasks table before each test
    await pool.query("DELETE FROM tasks");
  });

  test("GET /api/tasks should return an array of tasks", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/tasks should create a task", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Test task",
      description: "Created during integration testing",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test task");
    expect(response.body.description).toBe(
      "Created during integration testing",
    );
    expect(response.body.completed).toBe(0);
  });

  test("POST /api/tasks should return 400 when title is missing", async () => {
    const response = await request(app).post("/api/tasks").send({
      description: "This task has no title",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Title is required",
    });
  });

  test("POST /api/tasks should reject an empty title", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "",
      description: "This task has an empty title",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Title is required",
    });
  });

  test("POST /api/tasks should reject a title longer than 255 characters", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        title: "a".repeat(256),
        description: "This task has a title that is too long",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Title must be 255 characters or less",
    });
  });

  test("POST /api/tasks should reject a description longer than 5000 characters", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({
        title: "Test task",
        description: "a".repeat(5001),
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Description must be 5000 characters or less",
    });
  });

  test("PATCH /api/tasks/:id should update a task", async () => {
    const createResponse = await request(app).post("/api/tasks").send({
      title: "Original task",
      description: "Original description",
    });

    const taskId = createResponse.body.id;

    const response = await request(app).patch(`/api/tasks/${taskId}`).send({
      title: "Updated task",
      description: "Updated description",
      completed: true,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(taskId);
    expect(response.body.title).toBe("Updated task");
    expect(response.body.description).toBe("Updated description");
    expect(response.body.completed).toBe(1);
  });

  test("PATCH /api/tasks/:id should return 404 for a nonexistent task", async () => {
    const response = await request(app).patch("/api/tasks/999999").send({
      title: "Updated task",
      description: "Updated description",
      completed: true,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      error: "Task not found",
    });
  });

  test("PATCH /api/tasks/:id should reject an invalid task ID", async () => {
    const response = await request(app).patch("/api/tasks/abc").send({
      title: "Updated task",
      description: "Updated description",
      completed: true,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid task ID",
    });
  });

  test("PATCH /api/tasks/:id should reject a non-boolean completed value", async () => {
    const createResponse = await request(app).post("/api/tasks").send({
      title: "Original task",
      description: "Original description",
    });

    const taskId = createResponse.body.id;

    const response = await request(app).patch(`/api/tasks/${taskId}`).send({
      title: "Updated task",
      description: "Updated description",
      completed: "true",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Completed must be a boolean",
    });
  });

  test("DELETE /api/tasks/:id should delete a task", async () => {
    const createResponse = await request(app).post("/api/tasks").send({
      title: "Task to delete",
      description: "This task should be deleted",
    });

    const taskId = createResponse.body.id;

    const response = await request(app).delete(`/api/tasks/${taskId}`);

    expect(response.statusCode).toBe(204);

    const getResponse = await request(app).get("/api/tasks");

    expect(getResponse.body).toEqual([]);
  });

  test("DELETE /api/tasks/:id should return 404 for a nonexistent task", async () => {
    const response = await request(app).delete("/api/tasks/999999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      error: "Task not found",
    });
  });

  test("DELETE /api/tasks/:id should reject an invalid task ID", async () => {
    const response = await request(app).delete("/api/tasks/abc");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid task ID",
    });
  });
});
