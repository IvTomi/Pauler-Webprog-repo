DELIMITER $$
SELECT "Creating procedure AddContactToUser" $$
DROP PROCEDURE IF EXISTS AddContactToUser $$
CREATE PROCEDURE AddContactToUser (IN adduserid INT, IN contactid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		INSERT INTO contact_has_user (User_idUser,Contact_idContact,LastModifiedBy) VALUES (adduserid,contactid,userid);
	COMMIT;
END;
$$

DELIMITER ;