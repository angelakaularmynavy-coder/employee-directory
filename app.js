import express from "express";
import employees from "#db/employees";

const app = express();

app.use(express.json());

// GET /
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

// GET /employees/random
// Must be defined BEFORE /employees/:id, or Express will treat
// "random" as the :id parameter and this route will never run.
let lastRandomId = null;

app.get("/employees/random",(req, res) => {
    let randomIndex = Math.floor(Math.random() * employees.length);
    let employee = employees[randomIndex];

    while (employee.id === lastRandomId && employees.length > 1) {
    randomIndex = Math.floor(Math.random() * employees.length);
    employee = employees[randomIndex];
  }

   lastRandomId = employee.id;
  res.json(employee);
});

// GET /employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// GET /employees/:id
app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.json(employee);
});

export default app;
