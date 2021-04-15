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
DELIMITER ;