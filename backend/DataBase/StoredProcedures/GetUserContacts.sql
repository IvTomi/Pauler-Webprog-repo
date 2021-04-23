DELIMITER $$
SELECT "Creating procedure GetUserContacts" $$
DROP PROCEDURE IF EXISTS GetUserContacts $$
CREATE PROCEDURE `GetUserContacts`(IN hash VARCHAR(60))
BEGIN
SELECT * FROM usercontactsview WHERE hash=usercontactsview.SuperUser_Hash;
END;
$$

DELIMITER ;