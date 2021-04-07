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
		SET hash = TO_BASE64(RANDOM_BYTES(40));
		WHILE EXISTS (SELECT * FROM superuser WHERE superuser.Hash = hash) DO
			SET hash = TO_BASE64(RANDOM_BYTES(40));
		END WHILE;		
        CALL CreateUser(username,password,'','','',0);
        SET userId = LAST_INSERT_ID();
        CALL AddContact('Email',email,'Registration email',userId,1,'');
        SET contactId = LAST_INSERT_ID();
        INSERT INTO company (CompanyName,LastModifiedBy) VALUES (company,userId);
        SET companyId = LAST_INSERT_ID();
        INSERT INTO configgroup (LastModifiedBy) VALUES (userId);
        SET configGroupId = LAST_INSERT_ID();
        INSERT INTO superuser (User_idUser,Hash,Company_idCompany,Contact_idContact,ConfigGroup_idConfigGroup,LastModifiedBy,IsEmailConfirmed,ConfirmationCode)
        VALUES (userId,hash,companyId,contactId,configGroupId,userId,1,'');
        UPDATE user SET LastModifiedBy = userId, SuperUser_Hash = hash WHERE user.idUser = userId;
		UPDATE company SET SuperUser_Hash = hash WHERE company.idCompany = companyId;
		UPDATE contact SET SuperUser_Hash = hash WHERE contact.idContact = contactId;
        UPDATE permissiongroup SET SuperUser_Hash = hash WHERE permissiongroup.idPermissionGroup = (SELECT PermissionGroup_idPermissionGroup FROM user WHERE user.idUser = userId LIMIT 1);
	COMMIT;
	SELECT hash AS 'Hash';
END;
$$

DELIMITER ;