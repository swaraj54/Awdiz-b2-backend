import express from "express";

const app = express();

// inbuilt middleware - .use()
app.use(express.json());

let todos = [];
let counter = 1;

app.get("/", (req, res) => {
  res.send("Hello from Server 2");
});
// get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});
// get single todo by id
app.get("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const foundTodo = todos.filter((todo) => todo.id == todoId);
  res.send(foundTodo);
});

// create todo
app.post("/todos", (req, res) => {
  const { todo } = req.body;
  todos.push({ todo :todo, id: counter });
  counter++;
  res.status(201).send("Todo created successfully.");
});

// update todo
app.put("/todos/:todoId", (req, res) => {



  res.send("PUT request to update todo");
});

// delete todo
app.delete("/todos/:todoId", (req, res) => {


  res.send("DELETE request to delete todo");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
