DELIMITER $$
SELECT "Creating procedure DeleteContact" $$
DROP PROCEDURE IF EXISTS DeleteContact $$
CREATE PROCEDURE `DeleteContact`(IN id INT, IN userid INT)
BEGIN
START TRANSACTION;
IF NOT EXISTS(SELECT*FROM superuserview WHERE superuserview.Contact_idContact = id) THEN
		UPDATE contact SET Status=2, LastModifiedBy = userid WHERE contact.idContact= id;
        UPDATE contact_has_company c SET Status=2, LastModifiedBy = userid WHERE c.Contact_idContact=id;
        UPDATE contact_has_task c SET Status=2, LastModifiedBy = userid WHERE c.Contact_idContact=id;
        UPDATE contact_has_user c SET Status=2, LastModifiedBy = userid WHERE c.Contact_idContact=id;
	 ELSE
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = 'You cant delete superuser contact!';
	END IF;
COMMIT;
END;
$$

DELIMITER ;