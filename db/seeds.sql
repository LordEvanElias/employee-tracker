use tracker;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 45000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 80000, 2),
    ('Account Manager', 100000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Aaron', 'Rogers', 1, NULL),
    ('Betty', 'White', 2, 1),
    ('Michael', 'Jackson', 3, NULL),
    ('Derek', 'Jeter', 4, 3),
    ('Yukina', 'Yamaguchi', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Antonio', 'Bianchi', 7, NULL),
    ('Tom', 'Allen', 8, 7);