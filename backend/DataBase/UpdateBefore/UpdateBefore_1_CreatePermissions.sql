DELIMITER $$
SELECT 'Executing CreatePermissions' $$


INSERT INTO Permission (Name, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'IsAdmin', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM Permission WHERE Name = 'IsAdmin'
) LIMIT 1;
$$

INSERT INTO Permission (Name, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanCreateTask', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM Permission WHERE Name = 'CanCreateTask'
) LIMIT 1;$$

INSERT INTO Permission (Name, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanEditTask', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT name FROM Permission WHERE Name = 'CanEditTask'
) LIMIT 1;$$
DELIMITER ;