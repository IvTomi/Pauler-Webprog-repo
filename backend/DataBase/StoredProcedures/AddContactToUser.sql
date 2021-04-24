DELIMITER $$
SELECT "Creating procedure AddContactToUser" $$
DROP PROCEDURE IF EXISTS AddContactToUser $$
CREATE PROCEDURE `AddContactToUser`(IN adduserid INT, IN contactid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		IF NOT EXISTS (SELECT * FROM contact_has_user WHERE Contact_idContact = contactid AND User_idUser = adduserid)THEN
			INSERT INTO contact_has_user (User_idUser,Contact_idContact,LastModifiedBy) VALUES (adduserid,contactid,userid);
		ELSE
        IF NOT EXISTS (SELECT * FROM usercontactsview WHERE  Contact_idContact = contactid AND User_idUser = adduserid)THEN
				UPDATE contact_has_user SET Status = 1 WHERE  Contact_idContact = contactid AND User_idUser = adduserid;
            ELSE
				SIGNAL SQLSTATE '45000' 
				SET MESSAGE_TEXT = 'Contact already added';
            END IF;
        END IF;
	COMMIT;
END;
$$

DELIMITER ;