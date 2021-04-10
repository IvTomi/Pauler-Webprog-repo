DELIMITER $$
SELECT "Creating procedure GetConfigGroupByHash" $$
DROP PROCEDURE IF EXISTS GetConfigGroupByHash $$
CREATE PROCEDURE `GetConfigGroupByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM configgroupview WHERE id=configgroupview.ConfigGroup_idConfigGroup AND hash=configgroupview.SuperUser_Hash ) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM configgroupview WHERE id=configgroupview.ConfigGroup_idConfigGroup AND hash=configgroupview.SuperUser_Hash ;
END IF;
END;
$$