DELIMITER $$
SELECT "Creating procedure InitializeConfigGroup" $$
DROP PROCEDURE IF EXISTS InitializeConfigGroup $$
CREATE PROCEDURE InitializeConfigGroup (IN configgroupid INT, IN userid INT)
BEGIN
	START TRANSACTION;

    COMMIT;
END;
$$

DELIMITER ;