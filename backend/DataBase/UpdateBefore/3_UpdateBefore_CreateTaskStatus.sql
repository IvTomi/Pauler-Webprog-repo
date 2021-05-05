DELIMITER $$
SELECT 'Executing CreatingTaskStatus' $$
	INSERT INTO Status (StatusName, LastModifiedAt, LastModifiedBy)
	SELECT * FROM (SELECT 'Default', CURRENT_TIMESTAMP(), -1) AS tmp
	WHERE NOT EXISTS (
		SELECT StatusName FROM Status WHERE StatusName = 'Default'
	) LIMIT 1;
	$$
    
DELIMITER ;