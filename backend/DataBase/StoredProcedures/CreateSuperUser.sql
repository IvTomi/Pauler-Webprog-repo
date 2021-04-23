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

DELIMITER ;