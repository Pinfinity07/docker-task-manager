const request = require("supertest");
const app = require("../index");

describe("GET /api/health", () => {
  test("should return API health status", async () => {
    const response = await request(app)
      .get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});