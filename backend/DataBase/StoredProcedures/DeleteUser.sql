DELIMITER $$
SELECT "Creating procedure DeleteUser" $$
DROP PROCEDURE IF EXISTS DeleteUser $$
CREATE PROCEDURE `DeleteUser`(IN id INT, in userid INT)
BEGIN
START TRANSACTION;
IF NOT EXISTS(SELECT*FROM superuserview WHERE superuserview.User_idUser = id) THEN
	UPDATE user SET Status = 2, LastModifiedBy = userid WHERE user.idUser=id;
	UPDATE task_has_user u SET Status = 2, LastModifiedBy = userid WHERE u.User_idUser=id;
	UPDATE team_has_user u SET Status = 2, LastModifiedBy = userid WHERE u.User_idUser=id;
	UPDATE notification_has_user u SET Status = 2, LastModifiedBy = userid WHERE u.User_idUser=id;
	UPDATE contact_has_user u SET Status = 2, LastModifiedBy = userid WHERE u.User_idUser=id;
ELSE
	SIGNAL SQLSTATE '45000' 
	SET MESSAGE_TEXT = 'You cant delete a superuser!';
END IF;
COMMIT;
END;
$$

DELIMITER ;