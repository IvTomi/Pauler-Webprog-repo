DELIMITER $$
SELECT "Creating procedure GetUserRecords" $$
DROP PROCEDURE IF EXISTS GetUserRecords $$
CREATE PROCEDURE `GetUserRecords`(IN userid INT)
BEGIN
SELECT * FROM recordview WHERE recordview.User_idUser = userid;
END;
$$

DELIMITER ;