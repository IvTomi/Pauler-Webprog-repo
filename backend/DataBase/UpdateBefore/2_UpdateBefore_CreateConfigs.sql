DELIMITER $$
SELECT "Executing CreateConfigs" $$

INSERT INTO config (ConfigKey, DefaultValue, LastModifiedBy)
SELECT * FROM (SELECT 'Language', 'HU', -1) AS tmp
WHERE NOT EXISTS (
    SELECT ConfigKey FROM configview WHERE ConfigKey = 'Language'
) LIMIT 1;
$$

INSERT INTO config (ConfigKey, DefaultValue, LastModifiedBy)
SELECT * FROM (SELECT 'Theme', 'Dark', -1) AS tmp
WHERE NOT EXISTS (
    SELECT ConfigKey FROM configview WHERE ConfigKey = 'Theme'
) LIMIT 1;
$$

INSERT INTO config (ConfigKey, DefaultValue, LastModifiedBy)
SELECT * FROM (SELECT 'AdminLoginProhinited', 'False', -1) AS tmp
WHERE NOT EXISTS (
    SELECT ConfigKey FROM configview WHERE ConfigKey = 'AdminLoginProhinited'
) LIMIT 1;
$$

DELIMITER ;