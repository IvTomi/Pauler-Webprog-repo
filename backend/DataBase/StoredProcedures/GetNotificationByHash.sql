DELIMITER $$
SELECT "Creating procedure GetNotificationByHash" $$
DROP PROCEDURE IF EXISTS GetNotificationByHash $$
CREATE PROCEDURE `GetNotificationByHash`(IN id INT, IN hash VARCHAR(60))
BEGIN
IF NOT EXISTS (SELECT * FROM notificationview WHERE id=notificationview.idNotification AND hash=notificationview.SuperUser_Hash ) THEN
 SIGNAL SQLSTATE '45000' 
 SET MESSAGE_TEXT = 'Invalid credentials';
ELSE SELECT * FROM notificationview WHERE id=notificationview.idNotification AND hash=notificationview.SuperUser_Hash ;
END IF;
END;
$$