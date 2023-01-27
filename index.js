const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: process.env.PW,
    database: process.env.DB,
  },

  console.log(`Connected to the tracker database.`)
);

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    anotherOne();
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    anotherOne();
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    anotherOne();
  });
}

function anotherOne() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do?",
        name: "choice",
        choices: [
          {
            name: "main menu",
            value: "main menu",
          },
          {
            name: "exit",
            value: "exit",
          },
        ],
      },
    ])
    .then((response) => {
      if (response.choice === "main menu") {
        init();
      }
      if (response.choice === "exit") {
        process.exit();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        message: "What is the department name?",
        name: "name",
      },
    ])

    .then((response) => {
      db.query("INSERT INTO department SET ?", response, function (err, results) {
        console.log("Department added.");
        console.log(err);
        anotherOne();
      });
    });
}

function addRole() {
  db.query("SELECT * FROM department", function (err, results) {
    const departments = results.map((department) => ({ name: department.name, value: department.id }));
    inquirer
      .prompt([
        {
          message: "What title of this role?",
          name: "title",
        },
        {
          message: "What is the salary for this role?",
          name: "salary",
        },
        {
          type: "list",
          message: "What is the department for this role?",
          name: "department_id",
          choices: departments,
        },
      ])
      .then((answer) => {
        db.query("INSERT INTO role SET ?", answer, function (err, results) {
          console.table(results);
          console.log("Role successfully added");
          anotherOne();
        });
      });
  });
}

function addEmployee() {
  db.query("SELECT * FROM role", function (err, results) {
    const roles = results.map((role) => ({ name: role.title, value: role.id }));
    db.query("SELECT * FROM employee", function (err, results) {
      const managers = results.map((manager) => ({ name: manager.last_name, value: manager.id }));
      inquirer
        .prompt([
          {
            message: "What is the employee's first name?",
            name: "first_name",
          },
          {
            message: "What is the employee's last name?",
            name: "last_name",
          },
          {
            type: "list",
            message: "What is the employees role?",
            name: "role_id",
            choices: roles,
          },
          {
            type: "list",
            message: "Who is their manager?",
            name: "manager_id",
            choices: managers,
          },
        ])
        .then((answer) => {
          db.query("INSERT INTO employee SET ?", answer, function (err, results) {
            console.table(results);
            console.log("Employee successfully added");
            anotherOne();
          });
        });
    });
  });
}

function updateEmployeeRole() {
  db.query("SELECT * FROM employee", function (err, results) {
    const employees = results.map((employee) => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));
    db.query("SELECT * FROM role", function (err, results) {
      const roles = results.map((role) => ({ name: role.title, value: role.id }));
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee do you want to update?",
            name: "id",
            choices: employees,
          },

          {
            type: "list",
            message: "What role do you want to assign the employee?",
            name: "role_id",
            choices: roles,
          },
        ])
        .then((answer) => {
          db.query("UPDATE employee SET role_ID = ? WHERE id = ?", [answer.role_id, answer.id], function (err, results) {
            console.table(results);
            console.log("Employee role successfully updated");
            anotherOne();
          });
        });
    });
  });
}

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          { name: "View all departments", value: "VIEW_DEPARTMENTS" },
          { name: "View all roles", value: "VIEW_ROLES" },
          { name: "View all employees", value: "VIEW_EMPLOYEES" },
          { name: "Add a department", value: "ADD_DEPARTMENT" },
          { name: "Add a role", value: "ADD_ROLE" },
          { name: "Add an employee", value: "ADD_EMPLOYEE" },
          { name: "Update an employee role", value: "UPDATE_EMPLOYEE_ROLE" },
        ],
      },
    ])

    .then((response) => {
      console.log(response.choice);

      if (response.choice === "VIEW_DEPARTMENTS") {
        viewDepartments();
      } else if (response.choice === "VIEW_ROLES") {
        viewRoles();
      } else if (response.choice === "VIEW_EMPLOYEES") {
        viewEmployees();
      } else if (response.choice === "ADD_DEPARTMENT") {
        addDepartment();
      } else if (response.choice === "ADD_ROLE") {
        addRole();
      } else if (response.choice === "ADD_EMPLOYEE") {
        addEmployee();
      } else if (response.choice === "UPDATE_EMPLOYEE_ROLE") {
        updateEmployeeRole();
      }
    });
}

init();
