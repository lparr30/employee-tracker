INSERT INTO department (name)
VALUES  ("Boss"),
        ("R & D"),
        ("Science"),
        ("HR"),
        ("Reception");

INSERT INTO role (title, salary, department_ID)
VALUES  ("CEO", 370080, 1),
        ("Inventor", 10, 2),
        ("Lab Tech", 542654, 3),
        ("Talent Acquisition", 1030750, 4), 
        ("Receptionist", 30000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Trixie", "Mattel", 1),
        ("Santa", "Claus", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bill", "Nye", 3, 1),
        ("Jenna", "Marbles", 4, 2),
        ("Fran", "Fine", 5, 1);

