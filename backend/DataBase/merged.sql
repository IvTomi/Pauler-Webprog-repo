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

