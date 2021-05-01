DELIMITER $$
SELECT "Creating procedure GetUserContactsByHash" $$
DROP PROCEDURE IF EXISTS GetUserContactsByHash $$
CREATE PROCEDURE `GetUserContactsByHash`(IN userid INT ,IN contactid INT, IN hash VARCHAR(60))
BEGIN
SELECT * FROM usercontactsview WHERE  usercontactsview.User_idUser=userid AND usercontactsview.Contact_idContact = contactid AND usercontactsview.SuperUser_Hash=hash;
END;
$$

DELIMITER ;