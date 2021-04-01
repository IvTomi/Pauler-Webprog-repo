SELECT "Creating usernotificationsview";
DROP VIEW IF EXISTS usernotificationsview;
CREATE VIEW `usernotificationsview` AS
    SELECT 
        `notificationview`.`idNotification` AS `Notification_idNotification`,
        `notificationview`.`NotificationName` AS `NotificationName`,
        `notificationview`.`SuperUser_Hash` AS `SuperUser_Hash`,
        `notification_has_user`.`User_idUser` AS `User_idUser`
    FROM
        (`notification_has_user`
        JOIN `notificationview` ON ((`notification_has_user`.`Notification_idNotification` = `notificationview`.`idNotification`)))
    WHERE
        (1 = `notification_has_user`.`Status`)