DELIMITER $$
SELECT "Creating procedure ModifyContact" $$
DROP PROCEDURE IF EXISTS ModifyContact $$
CREATE PROCEDURE `ModifyContact`(IN id INT, IN value VARCHAR(100), IN comment TEXT, IN isPublic TINYINT, IN userid INT)
BEGIN
START TRANSACTION;
	IF NOT EXISTS(SELECT*FROM superuserview WHERE superuserview.Contact_idContact = id) THEN
		UPDATE contact SET Value = value, Comment = comment, IsPublic = isPublic, LastModifiedBy = userid WHERE contact.idContact=id ;
    ELSE
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'You cant modify a superuser contact!';
	END IF;
COMMIT;
END;
$$

DELIMITER ;