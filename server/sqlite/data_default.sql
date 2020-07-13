INSERT INTO "main"."Settings" ("field", "value") VALUES ('server_ip', '192.168.100.3');
INSERT INTO "main"."Settings" ("field", "value") VALUES ('bell_duration', '1000');

INSERT INTO "main"."Users" ("id", "login", "password") VALUES ('1', 'admin', 'admin');

INSERT INTO "main"."Profiles" ("id", "name") VALUES ('1', 'Будни1');

INSERT INTO "main"."Days" ("id", "weekday", "profileId") VALUES ('1', '0', '1');
INSERT INTO "main"."Days" ("id", "weekday", "profileId") VALUES ('2', '1', '1');
INSERT INTO "main"."Days" ("id", "weekday", "profileId") VALUES ('3', '2', '1');
INSERT INTO "main"."Days" ("id", "weekday", "profileId") VALUES ('4', '3', '1');
INSERT INTO "main"."Days" ("id", "weekday", "profileId") VALUES ('5', '4', '1');
INSERT INTO "main"."Days" ("id", "weekday", "profileId") VALUES ('6', '5', null);
INSERT INTO "main"."Days" ("id", "weekday", "profileId") VALUES ('7', '6', null);

INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('1',  '1', '08:30');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('2',  '1', '09:15');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('3',  '1', '09:20');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('4',  '1', '10:05');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('5',  '1', '10:15');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('6',  '1', '11:00');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('7',  '1', '11:05');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('8',  '1', '11:50');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('9',  '1', '12:50');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('10', '1', '13:35');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('11', '1', '13:40');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('12', '1', '14:25');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('13', '1', '14:35');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('14', '1', '15:20');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('15', '1', '15:25');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('16', '1', '16:10');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('17', '1', '16:20');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('18', '1', '17:05');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('19', '1', '17:10');
INSERT INTO "main"."Bells" ("id", "profileId", "ringsAt") VALUES ('20', '1', '17:55');