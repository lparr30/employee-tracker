INSERT INTO department (name)
VALUES  ("Boss"),
        ("R & D"),
        ("Science"),
        ("HR"),
        ("Reception");

INSERT INTO role (title, salary)
VALUES  ("CEO", 370,080),
        ("Inventor", 10),
        ("Lab Tech", 542,654),
        ("Talent Acquisition", 1,030,750), 
        ("Receptionist", 30,000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bill", "Nye", 3),
        ("Jenna", "Marbles", 4),
        ("Trixie", "Mattel", 1),
        ("Santa", "Claus", 2),
        ("Fran", "Fine", 5);
