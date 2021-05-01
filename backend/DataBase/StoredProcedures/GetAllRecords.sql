DELIMITER $$
SELECT "Creating procedure GetAllRecords" $$
DROP PROCEDURE IF EXISTS GetAllRecords $$
CREATE PROCEDURE `GetAllRecords`(IN hash VARCHAR(60))
BEGIN
SELECT * FROM recordview WHERE recordview.SuperUser_Hash=hash;
END;
$$

DELIMITER ;