const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const [result] = await pool.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description || null]
    );

    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const [result] = await pool.query(
      `UPDATE tasks
       SET title = ?, description = ?, completed = ?
       WHERE id = ?`,
      [title, description, completed, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// Checking if the script is being run directly or being imported as a module. If it's run directly, start the server.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Exporting the app instance for testing purposes.
module.exports = app;