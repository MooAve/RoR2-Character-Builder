Risk of Rain 2 Character Builder
By Avery Moore

Web app written in ReactJS using an Express API and MongoDB.
Used to view real-time stat and effect changes for characters in Risk of Rain 2 when equipping various items.

Requires your own 'config.env' file for the MongoDB server in '/server'.
You'll also need to provide your own database with the collections 'characters' and 'items', where each entry
follows their respective schema.

TODO:
 - Make UI nicer
 - Have stats update properly when the character's level is changed
 - Add proper calculations for items that don't scale linearly
 - Add item and character schemas
 - Add stat totals (e.g. total crit chance)
 - Add support for character's attacks and abilities (e.g. showing the exact proc chance of on-hit effects)