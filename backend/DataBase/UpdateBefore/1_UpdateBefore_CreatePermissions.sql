DELIMITER $$
SELECT 'Executing CreatePermissions' $$


INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'IsAdmin', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'IsAdmin'
) LIMIT 1;
$$

INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanEditTask', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'CanEditTask'
) LIMIT 1;$$

INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanEditTeam', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'CanEditTeam'
) LIMIT 1;$$

INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanEditUser', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'CanEditUser'
) LIMIT 1;$$

INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanEditPermission', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'CanEditPermission'
) LIMIT 1;$$

INSERT INTO Permission (PermissionName, LastModifiedAt, LastModifiedBy)
SELECT * FROM (SELECT 'CanEditRecord', CURRENT_TIMESTAMP(), -1) AS tmp
WHERE NOT EXISTS (
    SELECT PermissionName FROM Permission WHERE PermissionName = 'CanEditRecord'
) LIMIT 1;$$
DELIMITER ;