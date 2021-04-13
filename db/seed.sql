/* Seeds for SQL table. We haven't discussed this type of file yet */
USE company_db;

INSERT INTO department (id, name) 
VALUES 
(1,'Production'),
(2,'Client Engagement'),
(3,'Operations'),
(4,'Marketing'),
(5,'Finance');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1,'Zoey','Paschka',3,2),
(2,'Eric','Borg',7,0),
(3,'Alan','Bengtson',3,2),
(4,'Jeremy','Krook',6,0),
(5,'Tera','Cunningham',8,0),
(6,'Hunter','VonWald',5,0),
(7,'Ethan','Bellows',4,2),
(8,'Hattie','Leary',2,0),
(9,'Austen','Staydohar',4,2),
(10,'Kristin','Paschka',1,6);

INSERT INTO role (id, title, salary, department_id)
VALUES
(1,'Intern',50000,4),
(2,'Fullstack Developer',200000,2),
(3,'Front End Developer',175000,2),
(4,'Project Manager',150000,2),
(5,'Operations Manager',120000,3),
(6,'Brand Manager',130000,4),
(7,'Account Manager',170000,1),
(8,'Accountant',100000,5);