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
        (1 = `team_has_user`.`Status`)