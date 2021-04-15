DELIMITER $$
SELECT "Creating procedure InitializeConfigGroup" $$
DROP PROCEDURE IF EXISTS InitializeConfigGroup $$
CREATE PROCEDURE InitializeConfigGroup (IN configgroupid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		INSERT INTO configgroup_has_config (ConfigGroup_idConfigGroup,Config_idConfig,ConfigValue,LastModifiedBy)
        SELECT configgroupid, c.idConfig, c.DefaultValue,userid FROM config c WHERE c.idConfig 
        NOT IN (SELECT chc.Config_idConfig FROM configgroup_has_config chc WHERE chc.Config_idConfig = c.idConfig AND 
        chc.ConfigGroup_idConfigGroup = configgroupid);
    COMMIT; 
END;
$$

DELIMITER ;