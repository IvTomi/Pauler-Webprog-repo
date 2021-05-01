DELIMITER $$
SELECT "Creating procedure TestData" $$
DROP PROCEDURE IF EXISTS TestData $$
CREATE PROCEDURE `TestData`()
BEGIN
DECLARE companyID INT;
DECLARE contacttypeID INT;
DECLARE contactID INT;
DECLARE permissionID INT;
DECLARE permissiongroupID INT;
DECLARE permissiongrouppresetID INT;
DECLARE userIDSuper INT;
DECLARE userID INT;
DECLARE configgroupID INT;
DECLARE statusID INT;
DECLARE taskID INT;
DECLARE teamID INT;
DECLARE hashNumber INT;
START TRANSACTION;
		INSERT INTO company(CompanyName,Status) VALUES('CégNév','1');
		SET companyID = LAST_INSERT_ID();
        SET hashNumber = companyID;
        
        INSERT INTO contacttype(TypeName) VALUES('TípusNév');
		SET contacttypeID = LAST_INSERT_ID();
        
		INSERT INTO contact(Value,Comment,IsPublic,ContactType_idContactType) VALUES('érték','komment','1',contacttypeID);
		SET contactID = LAST_INSERT_ID();
        
        INSERT INTO contact_has_company(Contact_idContact,Company_idCompany) VALUES(contactID,companyID);
        INSERT INTO permission(PermissionName) VALUES('JogosultságNév');
        SET permissionID = LAST_INSERT_ID();
        
        INSERT INTO permissiongroup(Status) VALUES('1');
        SET permissiongroupID = LAST_INSERT_ID();
        
        INSERT INTO permission_has_permissiongroup(Permission_idPermission,PermissionGroup_idPermissionGroup) VALUES(permissionID,permissiongroupID);
		INSERT INTO permissiongrouppreset(PresetName,PermissionGroup_idPermissionGroup) VALUES('PresetName',permissiongroupID);
        SET permissiongrouppresetID = LAST_INSERT_ID();
        
        INSERT INTO status(StatusName) VALUES('StátuszNév');
        SET statusID = LAST_INSERT_ID();
        
        INSERT INTO configgroup(Status) VALUES('1');
        SET configgroupID = LAST_INSERT_ID();
        
        INSERT INTO user(FirstName,LastName,Username,Password,Status,PermissionGroup_idPermissionGroup) VALUES('Pénzes','Péter','Pénzi','jelszo','1',permissiongroupID);
        SET userIDSuper = LAST_INSERT_ID();
        
        INSERT INTO user(FirstName,LastName,Username,Password,Status,PermissionGroup_idPermissionGroup) VALUES('Senki','Hazi','Szemet','Lada','1',permissiongroupID);
		SET userID = LAST_INSERT_ID();
        
		INSERT INTO superuser(User_idUser,Hash,Company_idCompany,Contact_idContact,ConfigGroup_idConfigGroup,ConfirmationCode) VALUES(userIDSuper,hashNumber,companyID,contactID,configgroupID,'VmiKód');
		INSERT INTO record(Date,Comment,Minute,Hour,User_idUser,SuperUser_Hash) VALUES('2000-01-01','komment','6','6',userID,hashNumber);
        INSERT INTO task(TaskName,Description,Deadline,Status_idStatus,SuperUser_Hash) VALUES('FeladatNev','Leiras','2069-4-20',statusID,hashNumber);
		SET taskID = LAST_INSERT_ID();
        
        INSERT INTO contact_has_task(Contact_idContact,Task_idTask) VALUES(contactID,taskID);
        INSERT INTO contact_has_user(Contact_idContact,User_idUser) VALUES(contactID,userIDSuper);
        INSERT INTO contact_has_user(Contact_idContact,User_idUser) VALUES(contactID,userID);
        INSERT INTO team(TeamName,Description,SuperUser_Hash) VALUES('CsapatNév','leiras',hashNumber);
        SET teamID = LAST_INSERT_ID();
        
        INSERT INTO task_has_team(Task_idTask,Team_idTeam) VALUES(taskID,teamID);
        INSERT INTO team_has_user(Team_idTeam,User_idUser,Tag) VALUES(teamID,userIDSuper,'vmi');
        INSERT INTO team_has_user(Team_idTeam,User_idUser,Tag) VALUES(teamID,userID,'igen');
        INSERT INTO task_has_user(Task_idTask,User_idUser) VALUES(taskID,userIDSuper);
        INSERT INTO task_has_user(Task_idTask,User_idUser) VALUES(taskID,userID);
        
		UPDATE contacttype SET SuperUser_Hash = hashNumber WHERE idContactType = contacttypeID;
        UPDATE contact SET SuperUser_Hash = hashNumber WHERE idContact = contactID;
        UPDATE permissiongroup SET SuperUser_Hash = hashNumber WHERE idPermissionGroup = permissiongroupID;
        UPDATE permissiongrouppreset SET SuperUser_Hash = hashNumber WHERE idPermissionGroupPreset = permissiongrouppresetID;
        UPDATE user SET SuperUser_Hash = hashNumber WHERE idUser = userIDSuper AND idUser = userID;
    COMMIT;
END;
$$

DELIMITER ;