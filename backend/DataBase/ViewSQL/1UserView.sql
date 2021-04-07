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
        (1 = `user`.`Status`)