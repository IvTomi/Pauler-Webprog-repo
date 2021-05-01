DELIMITER $$
SELECT "Creating procedure DeleteRecord" $$
DROP PROCEDURE IF EXISTS DeleteRecord $$
CREATE PROCEDURE `DeleteRecord`(IN recordid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		UPDATE record SET Status = 2, LastModifiedBy = userid WHERE record.idRecord = recordid;
	COMMIT;
END;
$$

DELIMITER ;