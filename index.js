const inquirer = require('inquirer');


function viewDepartments(){
  console.log("Viewing Departments")
}



inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'choice',
      choices:[{name:'View all departments', value:"VIEW_DEPARTMENTS"}]
    },
  ]);
  
  .then((response) =>
  console.log(response.choice)

  if (response.choice === "VIEW_DEPARTMENTS"){
    viewDepartments()
  }
  );