--sapientId has to be given by user, for getting profile
SELECT name, email, type, designation FROM employee WHERE sapientId="145001";

--for editing profile 
UPDATE employee SET employee.name = "sammed", employee.email ="samravan@publicissapient.com", employee.type="super_admin", employee.designation="SAL1" WHERE sapientId="145001";
--sammed samravan@publicissapient.com 123456 super_admin SAL1

--for getting all questions that are not rejected
SELECT * FROM question_bank where status="pending" OR status="approved";

--for setting status to approve/reject of a question
UPDATE question_bank SET question_bank.status=? WHERE question_bank.qId=?;

--for editing the password
UPDATE employee SET employee.password = ? WHERE sapientId=?; 

--for adding a question
--INSERT INTO question_bank (text,op1,op2,op3,op4,op5,answer,careerStage,difficulty,technology,"approved") values(?,?,?,?,?,?,?,?,?,?);

--for adding a user
INSERT INTO employee (sapientId,name,email,password,type,designation,"approved") values (?,?,?,?,?,?);

--reviewing the users
SELECT * from employee where status="pending" OR status="approved";

--create role
INSERT INTO role (type,permission) values(?,?);


