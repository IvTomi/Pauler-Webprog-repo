SELECT "Creating configview";
DROP VIEW IF EXISTS configview;
CREATE VIEW `configview` AS
    SELECT 
        `config`.`idConfig` AS `Config_idConfig`,
        `config`.`ConfigKey` AS `ConfigKey`,
        `config`.`DefaultValue` AS `DefaultValue`
    FROM
        `config`
    WHERE
        (1 = `config`.`Status`);

SELECT "Creating configgroupview";
DROP VIEW IF EXISTS configgroupview;
CREATE VIEW `configgroupview` AS
    SELECT 
        `configgroup`.`idConfigGroup` AS `ConfigGroup_idConfigGroup`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`configgroup`
        JOIN `superuser` ON ((`configgroup`.`idConfigGroup` = `superuser`.`ConfigGroup_idConfigGroup`)))
    WHERE
        (1 = `configgroup`.`Status`);

SELECT "Creating configgroupconfigsview";
DROP VIEW IF EXISTS configgroupconfigsview;
CREATE VIEW `configgroupconfigsview` AS
    SELECT 
        `configgroup_has_config`.`ConfigValue` AS `ConfigValue`,
        `configgroupview`.`ConfigGroup_idConfigGroup` AS `ConfigGroup_idConfigGroup`,
        `configgroupview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `configview`.`Config_idConfig` AS `Config_idConfig`,
        `configview`.`ConfigKey` AS `ConfigKey`,
        `configview`.`DefaultValue` AS `DefaultValue`
    FROM
        ((`configgroup_has_config`
        JOIN `configview` ON ((`configgroup_has_config`.`Config_idConfig` = `configview`.`Config_idConfig`)))
        JOIN `configgroupview` ON ((`configgroup_has_config`.`ConfigGroup_idConfigGroup` = `configgroupview`.`ConfigGroup_idConfigGroup`)))
    WHERE
        (1 = `configgroup_has_config`.`Status`);

SELECT "Creating companyview";
DROP VIEW IF EXISTS companyview;
CREATE VIEW `companyview` AS
    SELECT 
        `company`.`idCompany` AS `idCompany`,
        `company`.`CompanyName` AS `CompanyName`
    FROM
        `company`
    WHERE
        (1 = `company`.`Status`);

SELECT "Creating contacttypeview";
DROP VIEW IF EXISTS contacttypeview;
CREATE VIEW `contacttypeview` AS
    SELECT 
        `contacttype`.`idContactType` AS `idContactType`,
        `contacttype`.`TypeName` AS `TypeName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`contacttype`
        LEFT JOIN `superuser` ON ((`contacttype`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `contacttype`.`Status`);

SELECT "Creating contactview";
DROP VIEW IF EXISTS contactview;
CREATE VIEW `contactview` AS
    SELECT 
        `contact`.`idContact` AS `idContact`,
        `contact`.`Value` AS `Value`,
        `contact`.`Comment` AS `Comment`,
        `contact`.`IsPublic` AS `IsPublic`,
        `contacttypeview`.`idContactType` AS `ContactType_idContactType`,
        `contacttypeview`.`TypeName` AS `TypeName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        ((`contact`
        JOIN `superuser` ON ((`contact`.`SuperUser_Hash` = `superuser`.`Hash`)))
        JOIN `contacttypeview` ON ((`contact`.`ContactType_idContactType` = `contacttypeview`.`idContactType`)))
    WHERE
        (1 = `contact`.`Status`);

SELECT "Creating companycontactsview";
DROP VIEW IF EXISTS companycontactsview;
CREATE VIEW `companycontactsview` AS
    SELECT 
        `contactview`.`idContact` AS `Contact_idContact`,
        `contactview`.`Value` AS `Value`,
        `contactview`.`Comment` AS `Comment`,
        `contactview`.`IsPublic` AS `IsPublic`,
        `contactview`.`ContactType_idContactType` AS `ContactType_idContactType`,
        `contactview`.`TypeName` AS `TypeName`,
        `contactview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `contact_has_company`.`Company_idCompany` AS `Company_idCompany`
    FROM
        (`contact_has_company`
        JOIN `contactview` ON ((`contact_has_company`.`Contact_idContact` = `contactview`.`idContact`)))
    WHERE
        (1 = `contact_has_company`.`Status`);

SELECT "Creating notificationview";
DROP VIEW IF EXISTS notificationview;
CREATE VIEW `notificationview` AS
    SELECT 
        `notification`.`idNotification` AS `idNotification`,
        `notification`.`NotificationName` AS `NotificationName`
    FROM
        `notification`
    WHERE
        (1 = `notification`.`Status`);

SELECT "Creating permissionview";
DROP VIEW IF EXISTS permissionview;
CREATE VIEW `permissionview` AS
    SELECT 
        `permission`.`idPermission` AS `Permission_idPermission`,
        `permission`.`PermissionName` AS `PermissionName`
    FROM
        `permission`
    WHERE
        (1 = `permission`.`Status`);

SELECT "Creating permissiongroupview";
DROP VIEW IF EXISTS permissiongroupview;
CREATE VIEW `permissiongroupview` AS
    SELECT 
        `permissiongroup`.`idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`permissiongroup`
        JOIN `superuser` ON ((`permissiongroup`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `permissiongroup`.`Status`);

SELECT "Creating permissiongrouppermissionsview";
DROP VIEW IF EXISTS permissiongrouppermissionsview;
CREATE VIEW `permissiongrouppermissionsview` AS
    SELECT 
        `permission_has_permissiongroup`.`IsEnabled` AS `IsEnabled`,
        `permissionview`.`Permission_idPermission` AS `Permission_idPermission`,
        `permissionview`.`PermissionName` AS `PermissionName`,
        `permissiongroupview`.`PermissionGroup_idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `permissiongroupview`.`SuperUser_Hash` AS `SuperUser_Hash`
    FROM
        ((`permission_has_permissiongroup`
        JOIN `permissionview` ON ((`permission_has_permissiongroup`.`Permission_idPermission` = `permissionview`.`Permission_idPermission`)))
        JOIN `permissiongroupview` ON ((`permission_has_permissiongroup`.`PermissionGroup_idPermissionGroup` = `permissiongroupview`.`PermissionGroup_idPermissionGroup`)))
    WHERE
        (1 = `permission_has_permissiongroup`.`Status`);

SELECT "Creating permissiongrouppresetview";
DROP VIEW IF EXISTS permissiongrouppresetview;
CREATE VIEW `permissiongrouppresetview` AS
    SELECT 
        `permissiongrouppreset`.`idPermissionGroupPreset` AS `idPermissionGroupPreset`,
        `permissiongrouppreset`.`PresetName` AS `PresetName`,
        `permissiongrouppreset`.`PermissionGroup_idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`permissiongrouppreset`
        JOIN `superuser` ON ((`permissiongrouppreset`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `permissiongrouppreset`.`Status`);

SELECT "Creating recordview";
DROP VIEW IF EXISTS recordview;
CREATE VIEW `recordview` AS
    SELECT 
        `record`.`idRecord` AS `idRecord`,
        `record`.`Date` AS `Date`,
        `record`.`Comment` AS `Comment`,
        `record`.`Minute` AS `Minute`,
        `record`.`Hour` AS `Hour`,
        `user`.`idUser` AS `User_idUser`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        ((`record`
        JOIN `superuser` ON ((`record`.`SuperUser_Hash` = `superuser`.`Hash`)))
        JOIN `user` ON ((`record`.`User_idUser` = `user`.`idUser`)))
    WHERE
        (1 = `record`.`Status`);

SELECT "Creating statusview";
DROP VIEW IF EXISTS statusview;
CREATE VIEW `statusview` AS
    SELECT 
        `status`.`idStatus` AS `idStatus`,
        `status`.`StatusName` AS `StatusName`
    FROM
        `status`
    WHERE
        (1 = `status`.`Status`);

SELECT "Creating userview";
DROP VIEW IF EXISTS userview;
CREATE VIEW `userview` AS
    SELECT 
        `user`.`idUser` AS `idUser`,
        `user`.`FirstName` AS `FirstName`,
        `user`.`LastName` AS `LastName`,
        `user`.`Username` AS `Username`,
        `user`.`Password` AS `Password`,
        `permissiongroup`.`idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        ((`user`
        JOIN `superuser` ON ((`user`.`SuperUser_Hash` = `superuser`.`Hash`)))
        JOIN `permissiongroup` ON ((`user`.`PermissionGroup_idPermissionGroup` = `permissiongroup`.`idPermissionGroup`)))
    WHERE
        (1 = `user`.`Status`);

SELECT "Creating superuserview";
DROP VIEW IF EXISTS superuserview;
CREATE VIEW `superuserview` AS
    SELECT 
        `superuser`.`idSuperUser` AS `idSuperUser`,
        `superuser`.`Hash` AS `Hash`,
        `superuser`.`IsEmailConfirmed` AS `IsEmailConfirmed`,
        `superuser`.`ConfirmationCode` AS `ConfirmationCode`,
        `userview`.`idUser` AS `User_idUser`,
        `companyview`.`idCompany` AS `Company_idCompany`,
        `companyview`.`CompanyName` AS `CompanyName`,
        `contactview`.`idContact` AS `Contact_idContact`,
        `contactview`.`Value` AS `Value`,
        `contactview`.`Comment` AS `Comment`,
        `contactview`.`TypeName` AS `TypeName`,
		`contactview`.`ContactType_idContactType` AS `ContactType_idContactType`
    FROM
        (((`superuser`
        LEFT JOIN `userview` ON ((`userview`.`idUser` = `superuser`.`User_idUser`)))
        LEFT JOIN `companyview` ON ((`companyview`.`idCompany` = `superuser`.`Company_idCompany`)))
        LEFT JOIN `contactview` ON ((`contactview`.`idContact` = `superuser`.`Contact_idContact`)))
    WHERE
        (1 = `superuser`.`Status`);

SELECT "Creating taskview";
DROP VIEW IF EXISTS taskview;
CREATE VIEW `taskview` AS
    SELECT 
        `task`.`idTask` AS `idTask`,
        `task`.`TaskName` AS `TaskName`,
        `task`.`Description` AS `Description`,
        `task`.`Deadline` AS `Deadline`,
        `statusview`.`idStatus` AS `Status_idStatus`,
        `statusview`.`StatusName` AS `StatusName`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        ((`task`
        LEFT JOIN `statusview` ON ((`statusview`.`idStatus` = `task`.`Status_idStatus`)))
        JOIN `superuser` ON ((`task`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `task`.`Status`);

SELECT "Creating taskcontactsview";
DROP VIEW IF EXISTS taskcontactsview;
CREATE VIEW `taskcontactsview` AS
    SELECT 
        `contactview`.`idContact` AS `Contact_idContact`,
        `contactview`.`Value` AS `Value`,
        `contactview`.`Comment` AS `Comment`,
        `contactview`.`IsPublic` AS `IsPublic`,
        `contactview`.`ContactType_idContactType` AS `ContactType_idContactType`,
        `contactview`.`TypeName` AS `TypeName`,
        `contactview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `contact_has_task`.`Task_idTask` AS `Task_idTask`
    FROM
        (`contact_has_task`
        JOIN `contactview` ON ((`contact_has_task`.`Contact_idContact` = `contactview`.`idContact`)))
    WHERE
        (1 = `contact_has_task`.`Status`);

SELECT "Creating teamview";
DROP VIEW IF EXISTS teamview;
CREATE VIEW `teamview` AS
    SELECT 
        `team`.`idTeam` AS `idTeam`,
        `team`.`TeamName` AS `TeamName`,
        `team`.`Description` AS `Description`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`team`
        JOIN `superuser` ON ((`team`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `team`.`Status`);

SELECT "Creating teamtasksview";
DROP VIEW IF EXISTS teamtasksview;
CREATE VIEW `teamtasksview` AS
    SELECT 
        `taskview`.`idTask` AS `Task_idTask`,
        `taskview`.`TaskName` AS `TaskName`,
        `taskview`.`Description` AS `Description`,
        `taskview`.`Deadline` AS `Deadline`,
        `taskview`.`Status_idStatus` AS `Status_idStatus`,
        `taskview`.`StatusName` AS `StatusName`,
        `taskview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `task_has_team`.`Team_idTeam` AS `Team_idTeam`
    FROM
        (`task_has_team`
        JOIN `taskview` ON ((`task_has_team`.`Task_idTask` = `taskview`.`idTask`)))
    WHERE
        (1 = `task_has_team`.`Status`);

SELECT "Creating teamusersview";
DROP VIEW IF EXISTS teamusersview;
CREATE VIEW `teamusersview` AS
    SELECT 
        `team_has_user`.`Tag` AS `Tag`,
        `userview`.`idUser` AS `User_idUser`,
        `userview`.`FirstName` AS `FirstName`,
        `userview`.`LastName` AS `LastName`,
        `userview`.`Username` AS `Username`,
        `userview`.`Password` AS `Password`,
        `userview`.`PermissionGroup_idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `userview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `team_has_user`.`Team_idTeam` AS `Team_idTeam`
    FROM
        (`team_has_user`
        JOIN `userview` ON ((`team_has_user`.`User_idUser` = `userview`.`idUser`)))
    WHERE
        (1 = `team_has_user`.`Status`);

SELECT "Creating usercontactsview";
DROP VIEW IF EXISTS usercontactsview;
CREATE VIEW `usercontactsview` AS
    SELECT 
        `contactview`.`idContact` AS `Contact_idContact`,
        `contactview`.`Value` AS `Value`,
        `contactview`.`Comment` AS `Comment`,
        `contactview`.`IsPublic` AS `IsPublic`,
		`contactview`.`ContactType_idContactType` AS `ContactType_idContactType`,
        `contactview`.`TypeName` AS `TypeName`,
        `contactview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `contact_has_user`.`User_idUser` AS `User_idUser`
    FROM
        (`contact_has_user`
        JOIN `contactview` ON ((`contact_has_user`.`Contact_idContact` = `contactview`.`idContact`)))
    WHERE
        (1 = `contact_has_user`.`Status`);

SELECT "Creating usernotificationsview";
DROP VIEW IF EXISTS usernotificationsview;
CREATE VIEW `usernotificationsview` AS
    SELECT 
        `notificationview`.`idNotification` AS `Notification_idNotification`,
        `notificationview`.`NotificationName` AS `NotificationName`,
        `notification_has_user`.`User_idUser` AS `User_idUser`,
		`notification_has_user`.`IsRead` AS `IsRead`
    FROM
        (`notification_has_user`
        JOIN `notificationview` ON ((`notification_has_user`.`Notification_idNotification` = `notificationview`.`idNotification`)))
    WHERE
        (1 = `notification_has_user`.`Status`);

SELECT "Creating usertasksview";
DROP VIEW IF EXISTS usertasksview;
CREATE VIEW `usertasksview` AS
    SELECT 
        `taskview`.`idTask` AS `Task_idTask`,
        `taskview`.`TaskName` AS `TaskName`,
        `taskview`.`Description` AS `Description`,
        `taskview`.`Deadline` AS `Deadline`,
        `taskview`.`Status_idStatus` AS `Status_idStatus`,
        `taskview`.`StatusName` AS `StatusName`,
        `taskview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `task_has_user`.`User_idUser` AS `User_idUser`
    FROM
        (`task_has_user`
        JOIN `taskview` ON ((`task_has_user`.`Task_idTask` = `taskview`.`idTask`)))
    WHERE
        (1 = `task_has_user`.`Status`);

DELIMITER $$
SELECT 'Executing CreatePermissions' $$


INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'IsAdmin', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'IsAdmin'
) LIMIT 1;
$$

INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanCreateTask', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'CanCreateTask'
) LIMIT 1;$$

INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanEditTask', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'CanEditTask'
) LIMIT 1;$$
DELIMITER ;;

DELIMITER $$
SELECT "Executing CreateConfigs" $$

INSERT INTO config (ConfigKey, DefaultValue, LastModifiedBy)
SELECT * FROM (SELECT 'Language', 'HU', -1) AS tmp
WHERE NOT EXISTS (
    SELECT ConfigKey FROM configview WHERE ConfigKey = 'Language'
) LIMIT 1;
$$

INSERT INTO config (ConfigKey, DefaultValue, LastModifiedBy)
SELECT * FROM (SELECT 'Theme', 'Dark', -1) AS tmp
WHERE NOT EXISTS (
    SELECT ConfigKey FROM configview WHERE ConfigKey = 'Theme'
) LIMIT 1;
$$

INSERT INTO config (ConfigKey, DefaultValue, LastModifiedBy)
SELECT * FROM (SELECT 'AdminLoginProhinited', 'False', -1) AS tmp
WHERE NOT EXISTS (
    SELECT ConfigKey FROM configview WHERE ConfigKey = 'AdminLoginProhinited'
) LIMIT 1;
$$

DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure GetSuperUserByHash" $$
DROP PROCEDURE IF EXISTS GetSuperUserByHash $$
CREATE PROCEDURE `GetSuperUserByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM superuserview WHERE id=superuserview.idSuperUser AND hash=superuserview.Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM superuserview WHERE id=superuserview.idSuperUser AND hash=superuserview.Hash;
END IF;
END;
$$;

DELIMITER $$
SELECT "Creating procedure GetTaskByHash" $$
DROP PROCEDURE IF EXISTS GetTaskByHash $$
CREATE PROCEDURE `GetTaskByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM taskview WHERE id=taskview.idTask AND hash=taskview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM taskview WHERE id=taskview.idTask AND hash=taskview.SuperUser_Hash;
END IF;
END;
$$;

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

DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure GetContactByHash" $$
DROP PROCEDURE IF EXISTS GetContactByHash $$
CREATE PROCEDURE `GetContactByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM contactview WHERE id=contactview.idContact AND hash=contactview.SuperUser_Hash ) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM contactview WHERE id=contactview.idContact AND hash=contactview.SuperUser_Hash;
END IF;
END;
$$;

DELIMITER $$
SELECT "Creating procedure CreateContact" $$
DROP PROCEDURE IF EXISTS CreateContact $$
CREATE PROCEDURE CreateContact (IN type VARCHAR(45), IN value VARCHAR(100), IN comment TEXT,IN userid INT, IN ispublic TINYINT, IN hash VARCHAR(60))
BEGIN
	DECLARE contactId INT;
    DECLARE typeId INT;
	START TRANSACTION;
		CALL InitializeContactType(type,userid,hash,typeId);
		IF(hash = '') THEN
			BEGIN
				INSERT INTO contact (ContactType_idContactType,Value,Comment,IsPublic,LastModifiedBy) VALUES (typeId,value,comment,ispublic,userid);
			END;
		ELSE
			BEGIN
				INSERT INTO contact (ContactType_idContactType,Value,Comment,IsPublic,LastModifiedBy,SuperUser_Hash) VALUES (typeId,value,comment,ispublic,userid,hash);
			END;
		END IF;
		SET contactId = LAST_INSERT_ID();
	COMMIT;
	SELECT contactId as Id;
END
$$
DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure CreateUser" $$
DROP PROCEDURE IF EXISTS CreateUser $$
CREATE PROCEDURE CreateUser (IN username VARCHAR(45), IN password TINYBLOB, IN firstname VARCHAR(45), IN lastname VARCHAR(90), IN hash VARCHAR(60), IN userid INT, IN allprivileges TINYINT)
BEGIN
	DECLARE userId INT;
    DECLARE permissionGroupId INT;
	START TRANSACTION;		
		IF(hash = '') THEN
			BEGIN
				CALL CreatePermissionGroup (hash, userid);
				SET permissionGroupId = LAST_INSERT_ID();
				INSERT INTO user (FirstName,LastName,Username,Password,LastModifiedBy,PermissionGroup_idPermissionGroup) VALUES (firstname,lastname,username,password,userid,permissionGroupId);
			END;
		ELSE
			BEGIN
				IF EXISTS (SELECT * FROM userview u WHERE u.Username = username AND u.SuperUser_Hash = hash) THEN
					SIGNAL SQLSTATE '45000'
						SET MESSAGE_TEXT = 'Username exists';
				END IF;
                CALL CreatePermissionGroup (hash, userid);
				SET permissionGroupId = LAST_INSERT_ID();
				INSERT INTO user (FirstName,LastName,Username,Password,LastModifiedBy,PermissionGroup_idPermissionGroup,SuperUser_Hash)
                VALUES (firstname,lastname,username,password,userid,permissionGroupId,hash);
			END;
		END IF;
		SET userId = LAST_INSERT_ID();
        IF (userid = 0) THEN
        BEGIN
        UPDATE permissiongroup SET LastModifiedBy = userId WHERE permissiongroup.idPermissionGroup = permissionGroupId;
        END;
        END IF;
		CALL InitializePermissionGroup(permissionGroupId,allprivileges,userId);
	COMMIT;
	SELECT userId as Id;
END;
$$

DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure GetPermissionGroupByHash" $$
DROP PROCEDURE IF EXISTS GetPermissionGroupByHash $$
CREATE PROCEDURE `GetPermissionGroupByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM permissiongroupview WHERE id=permissiongroupview.PermissionGroup_idPermissionGroup AND hash=permissiongroupview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM permissiongroupview WHERE id=permissiongroupview.PermissionGroup_idPermissionGroup AND hash=permissiongroupview.SuperUser_Hash ;
END IF;
END;
$$;

DELIMITER $$
SELECT "Creating procedure ModifyUser" $$
DROP PROCEDURE IF EXISTS ModifyUser $$
CREATE PROCEDURE ModifyUser (IN password TINYBLOB, IN firstname VARCHAR(45), IN lastname VARCHAR(90), IN userid INT)
BEGIN
	START TRANSACTION;
		IF(password != "") THEN
		UPDATE user SET password = password, LastModifiedBy = userid;
        ELSE
        UPDATE user SET FirstName = firstname, LastName = lastname,LastModifiedBy = userid;
        END IF;
	COMMIT;
END;
$$

DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure GetPermissionGroupPresetByHash" $$
DROP PROCEDURE IF EXISTS GetPermissionGroupPresetByHash $$
CREATE PROCEDURE `GetPermissionGroupPresetByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM permissiongrouppresetview WHERE id=permissiongrouppresetview.idPermissionGroupPreset AND hash=permissiongrouppresetview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM permissiongrouppresetview WHERE id=permissiongrouppresetview.idPermissionGroupPreset AND hash=permissiongrouppresetview.SuperUser_Hash;
END IF;
END;
$$;

DELIMITER $$
SELECT "Creating procedure CreatePermissionGroup" $$
DROP PROCEDURE IF EXISTS CreatePermissionGroup $$
CREATE PROCEDURE CreatePermissionGroup (in hash VARCHAR(60), IN userid INT)
BEGIN
    DECLARE permissionGroupId INT;
	START TRANSACTION;
		IF (hash != '')THEN
			INSERT INTO permissiongroup (LastModifiedBy,SuperUser_Hash) VALUES (userid,hash);
        ELSE
			INSERT INTO permissiongroup (LastModifiedBy) VALUES (userid);
        END IF;
        SET permissionGroupId = LAST_INSERT_ID();
	COMMIT;
	SELECT permissionGroupId as Id;
END;
$$;

DELIMITER $$
SELECT "Creating procedure GetUserByHash" $$
DROP PROCEDURE IF EXISTS GetUserByHash $$
CREATE PROCEDURE `GetUserByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM userview WHERE id=userview.idUser AND hash=userview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM userview WHERE id=userview.idUser AND hash=userview.SuperUser_Hash;
END IF;
END;
$$;

DELIMITER $$
SELECT "Creating procedure InitializePermissionGroup" $$
DROP PROCEDURE IF EXISTS InitializePermissionGroup $$
CREATE PROCEDURE InitializePermissionGroup (IN permissiongroupid INT, IN allprivileges TINYINT, IN userid INT)
BEGIN
	START TRANSACTION;
		INSERT INTO permission_has_permissiongroup (Permission_idPermission,PermissionGroup_idPermissionGroup,IsEnabled,LastModifiedBy)
        SELECT p.idPermission, permissiongroupid, allprivileges,userid FROM permission p WHERE p.idPermission 
        NOT IN (SELECT php.Permission_idPermission FROM permission_has_permissiongroup php WHERE php.Permission_idPermission = p.idPermission AND 
        php.PermissionGroup_idPermissionGroup = permissiongroupid);
    COMMIT; 
END;
$$

DELIMITER ;;

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
$$;

DELIMITER $$
SELECT "Creating procedure InitializeContactType" $$
DROP PROCEDURE IF EXISTS InitializeContactType $$
CREATE PROCEDURE InitializeContactType (in type VARCHAR(45), IN userid INT, IN hash VARCHAR(60), OUT contacttypeid INT)
BEGIN
	DECLARE typeId INT;
	START TRANSACTION;
		IF (hash = '')THEN
			BEGIN
				IF NOT EXISTS (SELECT contacttype.idContactType FROM contacttype WHERE contacttype.TypeName = type AND contacttype.SuperUser_Hash IS NULL)THEN
					INSERT INTO contacttype (TypeName,LastModifiedBy) VALUES (type,userid);
				END IF;
				SELECT contacttype.idContactType INTO typeId FROM contacttype WHERE contacttype.TypeName = type AND contacttype.SuperUser_Hash IS NULL LIMIT 1;
            END;
        ELSE
			BEGIN
				IF NOT EXISTS (SELECT contacttype.idContactType FROM contacttype WHERE contacttype.TypeName = type AND contacttype.SuperUser_Hash IS NULL)THEN
					BEGIN
						IF NOT EXISTS (SELECT contacttype.idContactType FROM contacttype WHERE contacttype.TypeName = type AND contacttype.SuperUser_Hash = hash)THEN
							INSERT INTO contacttype (TypeName,LastModifiedBy,SuperUser_Hash) VALUES (type,userid,hash);
						END IF;
						SELECT contacttype.idContactType INTO typeId FROM contacttype WHERE contacttype.TypeName = type AND contacttype.SuperUser_Hash = hash LIMIT 1;
					END;
                ELSE
					SELECT contacttype.idContactType INTO typeId FROM contacttype WHERE contacttype.TypeName = type AND contacttype.SuperUser_Hash IS NULL LIMIT 1;
                END IF;
            END;
        END IF;
	COMMIT;
    SET contacttypeid = typeId;
END;
$$;

DELIMITER $$
SELECT "Creating procedure GetRecordByHash" $$
DROP PROCEDURE IF EXISTS GetRecordByHash $$
CREATE PROCEDURE `GetRecordByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM recordview WHERE id=recordview.idRecord AND hash=recordview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM recordview WHERE id=recordview.idRecord AND hash=recordview.SuperUser_Hash;
END IF;
END;
$$;

DELIMITER $$
SELECT "Creating procedure RegisterSuperUser" $$
DROP PROCEDURE IF EXISTS RegisterSuperUser $$
CREATE PROCEDURE RegisterSuperUser (IN username VARCHAR(45),IN password TINYBLOB,IN email VARCHAR(100),IN company VARCHAR(45))
BEGIN
	DECLARE contactId INT;
	DECLARE hash VARCHAR(60);
	DECLARE configGroupId INT;
	DECLARE userId INT;
	DECLARE companyId INT;
    
	START TRANSACTION;
		IF EXISTS (SELECT * FROM superuserview s WHERE s.Value = email) THEN
			SIGNAL SQLSTATE '45000'
				SET MESSAGE_TEXT = 'Email exists';
        END IF;
		
		SET hash = TO_BASE64(RANDOM_BYTES(40));
		WHILE EXISTS (SELECT * FROM superuserview WHERE superuserview.Hash = hash) DO
			SET hash = TO_BASE64(RANDOM_BYTES(40));
		END WHILE;		
        CALL CreateUser(username,password,'','','',0,1);
        SET userId = LAST_INSERT_ID();
        CALL CreateContact('Email',email,'Registration email',userId,1,'');
        SET contactId = LAST_INSERT_ID();
        INSERT INTO company (CompanyName,LastModifiedBy) VALUES (company,userId);
        SET companyId = LAST_INSERT_ID();
        INSERT INTO configgroup (LastModifiedBy) VALUES (userId);
        SET configGroupId = LAST_INSERT_ID();
        CALL InitializeConfigGroup(configGroupId,userId);
        INSERT INTO superuser (User_idUser,Hash,Company_idCompany,Contact_idContact,ConfigGroup_idConfigGroup,LastModifiedBy,IsEmailConfirmed,ConfirmationCode)
        VALUES (userId,hash,companyId,contactId,configGroupId,userId,1,'');
        UPDATE user SET LastModifiedBy = userId, SuperUser_Hash = hash WHERE user.idUser = userId;
		UPDATE contact SET SuperUser_Hash = hash WHERE contact.idContact = contactId;
        UPDATE permissiongroup SET SuperUser_Hash = hash WHERE permissiongroup.idPermissionGroup = (SELECT PermissionGroup_idPermissionGroup FROM user WHERE user.idUser = userId LIMIT 1);
	COMMIT;
	SELECT hash AS 'Hash';
END;
$$

DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure AddContactToUser" $$
DROP PROCEDURE IF EXISTS AddContactToUser $$
CREATE PROCEDURE AddContactToUser (IN adduserid INT, IN contactid INT, IN userid INT)
BEGIN
	START TRANSACTION;
		INSERT INTO contact_has_user (User_idUser,Contact_idContact,LastModifiedBy) VALUES (adduserid,contactid,userid);
	COMMIT;
END;
$$

DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure GetContactTypeByHash" $$
DROP PROCEDURE IF EXISTS GetContactTypeByHash $$
CREATE PROCEDURE `GetContactTypeByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM contacttypeview WHERE id=contacttypeview.idContactType AND hash=contacttypeview.SuperUser_Hash ) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM contacttypeview WHERE id=contacttypeview.idContactType AND hash=contacttypeview.SuperUser_Hash;
END IF;
END;
$$;

DELIMITER $$
SELECT "Creating procedure AuthenticateUser" $$
DROP PROCEDURE IF EXISTS AuthenticateUser $$
CREATE PROCEDURE AuthenticateUser (IN username VARCHAR(45), IN hash VARCHAR(60))
BEGIN
	DECLARE pwd TINYBLOB;
    DECLARE userid INT;
	START TRANSACTION;
		IF EXISTS (SELECT * FROM userview w WHERE w.UserName = username AND w.Password = password AND w.SuperUser_Hash = hash) THEN
			SELECT w.idUser,w.Password INTO  userid,pwd FROM userview w WHERE w.UserName = username AND w.SuperUser_Hash = hash;
        ELSE
        SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Invalid credentials';
        END IF;
	COMMIT;
	SELECT userid as Id,TO_BASE64(pwd) as Cypher;
END;
$$

DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure ModifyPermissionGroupPermission" $$
DROP PROCEDURE IF EXISTS ModifyPermissionGroupPermission $$
CREATE PROCEDURE ModifyPermissionGroupPermission (IN permissiongroupid INT, IN permissionid INT,IN isenabled TINYINT, IN userid INT)
BEGIN
	START TRANSACTION;
		IF NOT EXISTS(SELECT * FROM permission_has_permissiongroup php WHERE php.Permission_idPermission = permissionid 
        AND php.PermissionGroup_idPermissionGroup = permissiongroupid) THEN
			INSERT INTO permission_has_permissiongroup (Permission_idPermission,PermissionGroup_idPermissionGroup,IsEnabled,LastModifiedBy)
            VALUES (permissionid,permissiongroupid,isenabled,userid);
        ELSE
			UPDATE permission_has_permissiongroup SET IsEnabled = isenabled, LastModifiedBy = userid WHERE Permission_idPermission = permissionid
            AND PermissionGroup_idPermissionGroup = permissiongroupid AND Status = 1;
        END IF;
    COMMIT; 
END;
$$

DELIMITER ;;

DELIMITER $$
SELECT "Creating procedure GetTeamByHash" $$
DROP PROCEDURE IF EXISTS GetTeamByHash $$
CREATE PROCEDURE `GetTeamByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM teamview WHERE id=teamview.idTeam AND hash=teamview.SuperUser_Hash) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM teamview WHERE id=teamview.idTeam AND hash=teamview.SuperUser_Hash;
END IF;
END;
$$;

