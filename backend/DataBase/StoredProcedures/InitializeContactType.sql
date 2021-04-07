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
$$