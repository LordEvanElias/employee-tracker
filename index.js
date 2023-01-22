const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "root",
    database: "tracker",
  },

  console.log(`Connected to the tracker database.`)
);

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
  console.log("Success!");
}

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        { name: "View all departments", value: "VIEW_DEPARTMENTS" },
        { name: "View all roles", value: "VIEW_ROLES" },
      ],
    },
  ])

  .then((response) => {
    console.log(response.choice);

    if (response.choice === "VIEW_DEPARTMENTS") {
      viewDepartments();
    }
  });
