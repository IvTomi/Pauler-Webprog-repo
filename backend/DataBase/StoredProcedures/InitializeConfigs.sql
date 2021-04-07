DELIMITER $$
SELECT "Creating procedure InitializeConfigs" $$
DROP PROCEDURE IF EXISTS InitializeConfigs $$
CREATE PROCEDURE InitializeConfigs ()
BEGIN
	START TRANSACTION;
    IF NOT EXISTS (SELECT * FROM config WHERE config.ConfigKey = 'Language') THEN
		INSERT INTO config (ConfigKey,DefaultValue,LastModifiedBy) VALUES ('Language','HU',0);
    END IF;
    
    IF NOT EXISTS (SELECT * FROM config WHERE config.ConfigKey = 'Theme') THEN
		INSERT INTO config (ConfigKey,DefaultValue,LastModifiedBy) VALUES ('Theme','Dark',0);
    END IF;
    
    COMMIT;
END;
$$

DELIMITER ;