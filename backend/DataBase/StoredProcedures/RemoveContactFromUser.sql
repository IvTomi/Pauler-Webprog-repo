DELIMITER $$
SELECT "Creating procedure RemoveContactFromUser" $$
DROP PROCEDURE IF EXISTS RemoveContactFromUser $$
CREATE PROCEDURE `RemoveContactFromUser`(IN iduser INT, IN idcontact INT, IN userid INT)
BEGIN
START TRANSACTION;
	UPDATE contact_has_user SET Status=2, LastModifiedBy = userid WHERE contact_has_user.User_idUser = iduser AND contact_has_user.Contact_idContact = idcontact;
COMMIT;
END;
$$

DELIMITER ;