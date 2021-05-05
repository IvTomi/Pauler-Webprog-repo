SELECT "Creating recordview";
DROP VIEW IF EXISTS recordview;
CREATE VIEW `recordview` AS
    SELECT 
        `record`.`idRecord` AS `idRecord`,
         DATE_FORMAT(`record`.`Date`, '%Y.%m.%d') AS `Date`,
        `record`.`Comment` AS `Comment`,
        `record`.`Minute` AS `Minute`,
        `record`.`Hour` AS `Hour`,
        `userview`.`idUser` AS `User_idUser`,
        `taskview`.`idTask` AS `Task_idTask`,
        `superuser`.`Hash` AS `SuperUser_Hash`
    FROM
        (((`record`
        JOIN `superuser` ON ((`record`.`SuperUser_Hash` = `superuser`.`Hash`)))
        JOIN `userview` ON ((`record`.`User_idUser` = `userview`.`idUser`)))
        JOIN `taskview` ON ((`record`.`Task_idTask` = `taskview`.`idTask`)))
    WHERE
        (1 = `record`.`Status`)