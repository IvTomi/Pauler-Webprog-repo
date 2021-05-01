DELIMITER $$
SELECT "Creating procedure GetAllTasks" $$
DROP PROCEDURE IF EXISTS GetAllTasks $$
CREATE PROCEDURE `GetAllTasks`(IN hash VARCHAR(60))
BEGIN
SELECT * FROM taskview WHERE taskview.SuperUser_Hash=hash;
END;
$$

DELIMITER ;