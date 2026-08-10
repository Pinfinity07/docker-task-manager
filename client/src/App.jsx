import { useEffect, useState } from "react";

const API_URL = "http://localhost:5003/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function fetchTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function createTask(event) {
    event.preventDefault();

    if (!title.trim()) return;

    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    setTitle("");
    setDescription("");

    fetchTasks();
  }

  async function toggleTask(task) {
    await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        completed: !task.completed,
      }),
    });

    fetchTasks();
  }

  async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      {tasks.map((task) => (
        <div key={task.id}>
          <h3
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </h3>

          <p>{task.description}</p>

          <button onClick={() => toggleTask(task)}>
            {task.completed ? "Mark incomplete" : "Complete"}
          </button>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;