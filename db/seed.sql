/* Seeds for SQL table. We haven't discussed this type of file yet */
USE company_db;

INSERT INTO department (id, name) 
VALUES 
(1,'Production'),
(2,'Research and Development'),
(3,'Operations'),
(4,'Marketing'),
(5,'Finance');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1,'Erin','Teel',3,2),
(2,'Cheri','Linton',7,0),
(3,'April','Armstrong',3,2),
(4,'Veva','Aaron',6,0),
(5,'Derek','Daubney',8,0),
(6,'Noah','Freeman',5,0),
(7,'Mica','Sadler',4,2),
(8,'Dawn','Aiken',2,0),
(9,'Rosalind','Walton',4,2),
(10,'Cohen','Sempers',1,6);

INSERT INTO role (id, title, salary, department_id)
VALUES
(1,'Intern',50000,4),
(2,'Lead Engineer',200000,2),
(3,'Software Engineer',175000,2),
(4,'Quality Engineer',150000,2),
(5,'Operations Manager',120000,3),
(6,'Brand Manager',130000,4),
(7,'Producer',170000,1),
(8,'Accountant',100000,5);