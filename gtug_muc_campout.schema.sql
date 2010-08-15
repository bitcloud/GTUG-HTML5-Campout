-- phpMyAdmin SQL Dump
-- version 2.11.8.1deb5+lenny4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 15. August 2010 um 19:00
-- Server Version: 5.0.51
-- PHP-Version: 5.2.13


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `gtug_muc_campout`
--

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `lines`
--
CREATE TABLE `lines` (
`user_name` varchar(35)
,`game_id` int(11)
,`line` geometry
);
-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `lines2`
--
CREATE TABLE `lines2` (
`user_name` varchar(35)
,`game_id` int(11)
,`line` geometry
);
-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `nodes`
--

CREATE TABLE "nodes" (
  "id" int(11) NOT NULL,
  "long" double(10,7) NOT NULL,
  "lat" double(10,7) NOT NULL,
  "user_name" varchar(35) character set latin1 NOT NULL,
  "game_id" int(11) NOT NULL,
  "heading" tinyint(4) NOT NULL,
  "speed" int(11) NOT NULL,
  "insert" timestamp NOT NULL default CURRENT_TIMESTAMP,
  "location" point default NULL
);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE "user" (
  "name" varchar(35) NOT NULL,
  "email" varchar(255) NOT NULL,
  "joined" timestamp NOT NULL default CURRENT_TIMESTAMP
);

-- --------------------------------------------------------

--
-- Struktur des Views `lines`
--
DROP TABLE IF EXISTS `lines`;

CREATE VIEW "gtug_muc_campout"."lines" AS select "gtug_muc_campout"."nodes"."user_name" AS "user_name","gtug_muc_campout"."nodes"."game_id" AS "game_id",geometryfromtext(concat(_utf8'LineString(',group_concat(concat(x("gtug_muc_campout"."nodes"."location"),_utf8' ',y("gtug_muc_campout"."nodes"."location")) separator ', '),_utf8')')) AS "line" from "gtug_muc_campout"."nodes" group by "gtug_muc_campout"."nodes"."user_name","gtug_muc_campout"."nodes"."game_id";

-- --------------------------------------------------------

--
-- Struktur des Views `lines2`
--
DROP TABLE IF EXISTS `lines2`;

CREATE VIEW "gtug_muc_campout"."lines2" AS select "n"."user_name" AS "user_name","n"."game_id" AS "game_id",geometryfromtext(concat(_utf8'LineString(',group_concat(concat("n"."lat",_utf8' ',"n"."long") separator ', '),_utf8')')) AS "line" from "gtug_muc_campout"."nodes" "n" group by "n"."user_name","n"."game_id";
