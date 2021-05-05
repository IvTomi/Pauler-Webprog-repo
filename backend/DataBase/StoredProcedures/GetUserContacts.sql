DELIMITER $$
SELECT "Creating procedure GetUserContacts" $$
DROP PROCEDURE IF EXISTS GetUserContacts $$
CREATE PROCEDURE `GetUserContacts`(IN hash VARCHAR(60),IN userid INT)
BEGIN
SELECT * FROM usercontactsview WHERE hash=usercontactsview.SuperUser_Hash AND User_idUser = userid;
END
$$

DELIMITER ;