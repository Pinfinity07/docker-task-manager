const request = require("supertest");
const app = require("../../index");
const pool = require("../../db");

describe("API error handling", () => {
  test("GET /api/tasks should return a generic error when the database fails", async () => {
    const originalQuery = pool.query;
    const originalConsoleError = console.error;

    pool.query = jest.fn().mockRejectedValue(
      new Error("Database connection failed"),
    );

    console.error = jest.fn();

    try {
      const response = await request(app).get("/api/tasks");

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        error: "Failed to fetch tasks",
      });

      expect(response.body).not.toHaveProperty("stack");
      expect(response.body).not.toHaveProperty("message");

      expect(console.error).toHaveBeenCalled();
    } finally {
      pool.query = originalQuery;
      console.error = originalConsoleError;
    }
  });
});
