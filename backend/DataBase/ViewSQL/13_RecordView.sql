SELECT "Creating recordview";
DROP VIEW IF EXISTS recordview;
CREATE VIEW `recordview` AS
    SELECT 
        `record`.`idRecord` AS `idRecord`,
        `record`.`Date` AS `Date`,
        `record`.`Comment` AS `Comment`,
        `record`.`Minute` AS `Minute`,
        `record`.`Hour` AS `Hour`,
        `user`.`idUser` AS `User_idUser`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        ((`record`
        JOIN `superuser` ON ((`record`.`SuperUser_Hash` = `superuser`.`Hash`)))
        JOIN `user` ON ((`record`.`User_idUser` = `user`.`idUser`)))
    WHERE
        (1 = `record`.`Status`)