SELECT "Creating userview";
DROP VIEW IF EXISTS userview;
CREATE VIEW `userview` AS
    SELECT 
        `user`.`idUser` AS `idUser`,
        `user`.`FirstName` AS `FirstName`,
        `user`.`LastName` AS `LastName`,
        `user`.`Username` AS `Username`,
        `user`.`Password` AS `Password`,
        `permissiongroupview`.`PermissionGroup_idPermissionGroup` AS `PermissionGroup_idPermissionGroup`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        ((`user`
        JOIN `superuser` ON ((`user`.`SuperUser_Hash` = `superuser`.`Hash`)))
        JOIN `permissiongroupview` ON ((`user`.`PermissionGroup_idPermissionGroup` = `permissiongroupview`.`PermissionGroup_idPermissionGroup`)))
    WHERE
        (1 = `user`.`Status`)