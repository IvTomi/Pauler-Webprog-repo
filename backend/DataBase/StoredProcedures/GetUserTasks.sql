DELIMITER $$
SELECT "Creating procedure GetUserTasks" $$
DROP PROCEDURE IF EXISTS GetUserTasks $$
CREATE PROCEDURE `GetUserTasks`(IN userid INT)
BEGIN
SELECT * FROM usertasksview t WHERE t.User_idUser = userid;
END;
$$

DELIMITER ;