DELIMITER $$
SELECT "Creating procedure GetTaskContactsByHash" $$
DROP PROCEDURE IF EXISTS GetTaskContactsByHash $$
CREATE PROCEDURE `GetTaskContactsByHash`(IN taskid INT ,IN contactid INT, IN hash VARCHAR(60))
BEGIN
SELECT * FROM taskcontactsview WHERE taskcontactsview.Task_idTask = taskid AND taskcontactsview.Contact_idContact=contactid AND taskcontactsview.SuperUser_Hash=hash;
END;
$$

DELIMITER ;