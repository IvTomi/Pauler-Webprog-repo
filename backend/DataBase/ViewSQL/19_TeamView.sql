SELECT "Creating teamview";
DROP VIEW IF EXISTS teamview;
CREATE VIEW `teamview` AS
    SELECT 
        `team`.`idTeam` AS `idTeam`,
        `team`.`TeamName` AS `TeamName`,
        `team`.`Description` AS `Description`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (`team`
        JOIN `superuser` ON ((`team`.`SuperUser_Hash` = `superuser`.`Hash`)))
    WHERE
        (1 = `team`.`Status`)