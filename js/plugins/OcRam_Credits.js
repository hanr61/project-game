//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Credits.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Credits", "1.01");

/*:
 * @target MZ
 * @plugindesc v1.01 Add new "Credits" scene to your project!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Title_shuffler
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Credits
 * @type struct<Credits>[]
 * @desc Credits structure array for "Credits" scene!
 * @default ["{\"name\":\"Programming\",\"bgImage\":\"\",\"categories\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Engines/Suites\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Game Engine\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Yoji Ojima\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"https://www.rpgmakerweb.com\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Must own MZ license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"This game is made with RPG Maker MZ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"(c)Gotcha Gotcha Games Inc./YOJI OJIMA 2020\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"OcRam -plugins\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"OcRam\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"https://ocram-codes.net\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Paid on commercial use\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Time- and Weather Systems (With NPC scheduler)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Layers, lights, dynamic audio, pixel movement,\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"local multiplayer for 1-4 players and much more!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Plugins\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Example plugin\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Eric Example\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Description for this plugin.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Scripting\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"W3Schools\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Refsnes Data\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"https://www.w3schools.com\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Accepting terms of use\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Great place to learn new things and refreshing memory!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Stack Overflow\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Stack Exchange, Inc.\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"https://stackoverflow.com\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Accepting terms of use\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"When in dead-end (with programming) this place has saved\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"countless of times... Thank you!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\"]\"}","{\"name\":\"Graphics\",\"bgImage\":\"\",\"categories\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"DLC\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"No DLC used\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Sprites\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Default assets\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Yoji Ojima\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Must own MZ license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Tilesets\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Default assets\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Yoji Ojima\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Must own MZ license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Backgrounds\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Default assets\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Yoji Ojima\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Must own MZ license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\"]\"}","{\"name\":\"Audio\",\"bgImage\":\"\",\"categories\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"DLC\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"No DLC used\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Music\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Default assets\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Yoji Ojima\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Must own MZ license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"BGS\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Default assets\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Yoji Ojima\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Must own MZ license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Sound FX\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Default assets\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Yoji Ojima\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Must own MZ license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\"]\"}","{\"name\":\"Others\",\"bgImage\":\"\",\"categories\":\"[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Writing\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Main story\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Erica Example\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Testing\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"First hand testing\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Eric Example\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"Special Thanks\\\\\\\",\\\\\\\"items\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"name\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"RPG Maker community!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"author\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"All of them!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"www\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"https://forums.rpgmakerweb.com\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"license\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Accepting terms of use\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"rows\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"Great place for RPG Makers!\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\"}\\\"]\"}"]
 *
 * @param Credits Caption
 * @type text
 * @desc Caption for credits scene.
 * @default Credits
 *
 * @param Font Size Adjust
 * @type number
 * @decimals 0
 * @min -999
 * @max 999
 * @desc Adjust the font size in credits scene.
 * @default 0
 * 
 * @param Default BG Image
 * @type file
 * @dir img/pictures
 * @desc Background image used if no category BG available (leave empty for blurred snap from previous scene).
 * @default
 *
 * @param Background Opacity
 * @type number
 * @decimals 0
 * @min 0
 * @max 255
 * @desc Background opacity for credits scene
 * @default 255
 *
 * @param Window Style (Header)
 * @type select
 * @option Window (Default)
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Header window style for credits scene.
 * @default 0
 * 
 * @param Window Style (Commands)
 * @type select
 * @option Window (Default)
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Command window style for credits scene.
 * @default 0
 * 
 * @param Window Style (Details)
 * @type select
 * @option Window (Default)
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Details window style for credits scene.
 * @default 0
 *
 * @param Add Credits to Title
 * @type boolean
 * @desc Add credits command to title menu?
 * @default true
 *
 * @param Title Menu Y-Offset
 * @parent Add Credits to Title
 * @type number
 * @decimals 0
 * @min -9999
 * @max 9999
 * @desc Title menu y-offset.
 * (Applies only, if Credits is added to title)
 * @default 20
 * 
 * @param Title Menu Items
 * @parent Add Credits to Title
 * @type number
 * @decimals 0
 * @min 1
 * @max 12
 * @desc Title menu item count.
 * (Applies only, if Credits is added to title)
 * @default 4
 *
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 * 
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * This plugin adds new Credits scene to your RPG Maker project!
 * Credits menu navigation supports all input devices.
 * 
 * First give credits structure(s) as plugin parameter. And then just remember
 * to update credits data when needed!
 * 
 * Each category may have it's own background! Fallbacks to plugin default BG
 * and after that fallback to previous scene bitmap snap (like default menu).
 * 
 * You may call Credits scene anytime with OcRam.Credits.show() JS command!
 *
 * TIP: "Debug mode" will always start Credits on first startup.
 * 
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * COMMERCIAL & NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2022, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2022/01/23 v1.00 - Initial release
 * 2022/11/11 v1.01 - RETRO plugin order check fix (for MV)
 * 
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * Scene_Title.prototype.commandWindowRect // If credits is added to title
 * 
 */
 /*~struct~Credits:
 *
 * @param name
 * @type text
 * @text Main Category
 * @desc Main category
 * @default
 * 
 * @param bgImage
 * @type file
 * @dir img/pictures
 * @desc Background image for this category! Leave empty for default BG image.
 * @text BG Image
 * @default
 *
 * @param categories
 * @type struct<SubCategory>[]
 * @text Categories
 * @desc Sub category array.
 * @default 
 * 
 */
/*~struct~SubCategory:
 *
 * @param name
 * @type text
 * @text Sub Category
 * @desc Main category
 * @default
 *
 * @param items
 * @type struct<SubItems>[]
 * @text Items
 * @desc Items for this sub category.
 * @default
 *
 */
/*~struct~SubItems:
 *
 * @param name
 * @type text
 * @text Name
 * @desc Name of this resource
 * @default
 *
 * @param author
 * @type text
 * @text Author(s)
 * @desc Author(s) for this resource.
 * @default
 *
 * @param www
 * @type text
 * @text Url
 * @desc Url for this resource.
 * @default
 *
 * @param license
 * @type text
 * @text License
 * @desc License if available.
 * @default
 *
 * @param rows
 * @type text[]
 * @text Row
 * @desc Rows shown in "Additional info"
 * @default
 * 
 * @
~*/ // End of structs

if (!OcRam.isMZ()) {
    TouchInput.isClicked = function () {
        return this._released && !this._moved;
    };
    Window_Selectable.prototype.onTouchOk = function () {
        if (this.isTouchOkEnabled()) {
            const hitIndex = this.hitIndex();
            if (this._cursorFixed) {
                if (hitIndex === this.index()) {
                    this.processOk();
                }
            } else if (hitIndex >= 0) {
                this.processOk();
            }
        }
    };

    Window_Selectable.prototype.onTouchCancel = function () {
        if (this.isCancelEnabled()) {
            this.processCancel();
        }
    };
    Window_Selectable.prototype.onTouchSelect = function (trigger) {
        this._doubleTouch = false;
        if (this.isCursorMovable()) {
            const lastIndex = this.index();
            const hitIndex = this.hitIndex();
            if (hitIndex >= 0) {
                if (hitIndex === this.index()) {
                    this._doubleTouch = true;
                }
                this.select(hitIndex);
            }
            if (trigger && this.index() !== lastIndex) {
                //this.playCursorSound();
            }
        }
    };
    Window_Selectable.prototype.hitIndex = function () {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        return this.hitTest(localPos.x, localPos.y);
    };
}

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...
    const _windowStyleHeader = Number(this.parameters['Window Style (Header)']);
    const _windowStyleCommands = Number(this.parameters['Window Style (Commands)']);
    const _windowStyleDetails = Number(this.parameters['Window Style (Details)']);
    const _titleMenuYOffset = Number(this.parameters['Title Menu Y-Offset']);
    const _titleMenuItems = Number(this.parameters['Title Menu Items']) || 4;
    const _defaultBGImage = this.parameters['Default BG Image'] ? ImageManager.loadPicture(this.parameters['Default BG Image']) : null;
    const _creditsBGOpacity = Number(this.parameters['Background Opacity']) || 255;
    const _fontSizeAdjust = Number(this.parameters['Font Size Adjust']) || 0;
    const _appendToTitle = OcRam.getBoolean(this.parameters['Add Credits to Title']);
    const _debugMode = OcRam.getBoolean(this.parameters['Debug mode']);

    let _mainCategoryActive = true;

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.windowStyleHeader = () => _windowStyleHeader;
    this.windowStyleCommands = () => _windowStyleCommands;
    this.windowStyleDetails = () => _windowStyleDetails;
    this.creditsBGOpacity = () => _creditsBGOpacity;
    this.getBGImage = () => _defaultBGImage;
    this.mainCategoryActive = () => _mainCategoryActive;
    this.activateMainCategory = value => { _mainCategoryActive = value; };
    this.baseFontSize = () => ($gameSystem.mainFontSize() - (OcRam.isMZ() ? 0 : 6)) + _fontSizeAdjust;

    this.parseCreditsStruct = () => {
        const _rawCredits = this.parameters['Credits'];
        const credits_root = OcRam.getJSONArray(_rawCredits);
        if (credits_root && credits_root.length > 0) {
            credits_root.forEach(c => {
                if (c.bgImage) ImageManager.loadPicture(c.bgImage);
                c._lastCommand = 0;
                c.categories = OcRam.getJSONArray(c.categories);
                c.categories.forEach(sc => {
                    sc._lastItem = 0;
                    sc.items = OcRam.getJSONArray(sc.items);
                    sc.items.forEach(itm => {
                        itm.rows = OcRam.getArray(itm.rows);
                    });
                });
            });
        } return credits_root;
    };

    this.show = () => {

        if (SceneManager.isSceneChanging()) {
            setTimeout(() => {
                this.show();
            }, 250); return;
        }

        $credits.forEach(c => {
            ImageManager.loadPicture(c.bgImage);
        });

        const s = OcRam.scene();

        if (s) {
            if (s.isTitle()) {
                s._commandWindow.close();
                SceneManager.push(Scene_Credits);
                return;
            } else if (s.isMap()) {
                SceneManager.push(Scene_Credits);
                return;
            }
        } SceneManager.goto(Scene_Credits);

    };

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    Scene_Title.prototype.commandCredits = function () {
        this._commandWindow.close();
        SceneManager.push(Scene_Credits);
    };

    if (_debugMode) {
        let _debugDone = false;
        this.extend(Scene_Title, "start", function (bgm) {
            _this["Scene_Title_start"].apply(this, arguments);
            if (!_debugDone) { this.commandCredits(); _debugDone = true; }
        });
    }

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    if (_appendToTitle) {

        this.extend(Scene_Title, "createCommandWindow", function (bgm) {
            _this["Scene_Title_createCommandWindow"].apply(this, arguments);
            this._commandWindow.setHandler("credits", this.commandCredits.bind(this));
        });

        this.extend(Window_TitleCommand, "makeCommandList", function (bgm) {
            _this["Window_TitleCommand_makeCommandList"].apply(this, arguments);
            this.addCommand("Credits", "credits");
        });

        // ------------------------------------------------------------------------------
        // Overrides
        // ==============================================================================
        Scene_Title.prototype.commandWindowRect = function () {
            const offsetX = $dataSystem.titleCommandWindow.offsetX;
            const offsetY = $dataSystem.titleCommandWindow.offsetY + _titleMenuYOffset;
            const ww = this.mainCommandWidth();
            const wh = this.calcWindowHeight(_titleMenuItems, true);
            const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
            const wy = Graphics.boxHeight - wh - 96 + offsetY;
            return new Rectangle(wx, wy, ww, wh);
        };

    }

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "command", function (args) {
        _this.debug("Plugin command: command", args);
    });

}.bind(OcRam.Credits)());

const $credits = OcRam.Credits.parseCreditsStruct();

function Scene_Credits() {
    this.initialize(...arguments);
}

Scene_Credits.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Credits.prototype.constructor = Scene_Credits;

Scene_Credits.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Credits.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    const bg_img = this._categoryBGImg || OcRam.Credits.getBGImage();
    if (bg_img) {
        this._backgroundSprite.bitmap = bg_img;
        this._backgroundFilter = null;
        this._backgroundSprite.filters = [];
        this.scaleSprite(this._backgroundSprite);
        this.centerSprite(this._backgroundSprite);
    } else {
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this._backgroundFilter = new PIXI.filters.BlurFilter();
        this._backgroundSprite.filters = [this._backgroundFilter];
    } this.addChild(this._backgroundSprite);
    this.setBackgroundOpacity(OcRam.Credits.creditsBGOpacity());
};

Scene_Credits.prototype.updateBGImage = function () {
    const bg_img = this._categoryBGImg || OcRam.Credits.getBGImage();
    if (!bg_img) {
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this._backgroundFilter = new PIXI.filters.BlurFilter();
        this._backgroundSprite.filters = [this._backgroundFilter];
        return;
    } this._backgroundFilter = null;
    this._backgroundSprite.filters = [];
    this._backgroundSprite.bitmap = bg_img;
    this.scaleSprite(this._backgroundSprite);
    this.centerSprite(this._backgroundSprite);
};

Scene_Credits.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    OcRam.Credits.activateMainCategory(true);
    this.createCreditsWindow();
};

Scene_Credits.prototype.terminate = function () {
    Scene_MenuBase.prototype.terminate.call(this);
};

Scene_Credits.prototype.highlightMainCategory = function () {
    SoundManager.playOk();
    this._creditsTopWindow.children.forEach(sprite => { sprite.opacity = 255; });
    this._creditsSubCategoriesWindow.children.forEach(sprite => { sprite.opacity = 196; });
};

Scene_Credits.prototype.highlightSubCategory = function () {
    SoundManager.playOk();
    this._creditsTopWindow.children.forEach(sprite => { sprite.opacity = 196; });
    this._creditsSubCategoriesWindow.children.forEach(sprite => { sprite.opacity = 255; });
};

Scene_Credits.prototype.createCreditsWindow = function () {

    this._creditsHeaderWindow = new Window_CreditsHeader(this.creditsHeaderRect());
    this._creditsTopWindow = new Window_CreditsTop(this.creditsTopRect());
    this._creditsTopWindow.setHandler("cancel", this.popScene.bind(this));
    this._creditsItemWindow = new Window_CreditsSubItems(this.creditsItemsRect(), $credits[0].categories[0].items[0]);
    this._creditsSubCategoriesWindow = new Window_CreditsSubCategories(this.creditsSubCategoriesRect(), $credits[0]);
    this._creditsDetailWindow = new Window_CreditsDetails(this.creditsDetailsRect(), $credits[0].categories[0].items[0]);

    $credits.forEach(c => {
        this._creditsTopWindow.setHandler("mainItem_" + c.name, function () {
            this._creditsTopWindow.activate();
            if (!this._preventSelect) {
                this.refreshSubCategories(c);
                if (!OcRam.Credits.mainCategoryActive()) {
                    OcRam.Credits.activateMainCategory(true);
                    this.highlightMainCategory();
                }
            } this._preventSelect = false;
        }.bind(this));
    }); this.refreshSubCategories($credits[0]);

    this.addWindow(this._creditsHeaderWindow);
    this.addWindow(this._creditsTopWindow);
    this.addWindow(this._creditsSubCategoriesWindow);
    this.addWindow(this._creditsItemWindow);
    this.addWindow(this._creditsDetailWindow);

    this.highlightMainCategory();

};

Scene_Credits.prototype.refreshSubCategories = function (main_category) {
    this._categoryBGImg = main_category.bgImage ? ImageManager.loadPicture(main_category.bgImage) : null;
    this.updateBGImage();
    this._creditsDetailWindow._txtMainCategory = main_category.name;
    const wref = this._creditsSubCategoriesWindow;
    wref._mainCategory = main_category;
    wref._handlers = {};
    wref.setHandler("cancel", this.popScene.bind(this));
    main_category.categories.forEach(sc => {
        wref.setHandler("subCat_" + sc.name, function () {
            main_category._lastCommand = wref._index;
            wref.activate();
            this.refreshSubItems(sc);
            if (OcRam.Credits.mainCategoryActive()) {
                OcRam.Credits.activateMainCategory(false);
                this.highlightSubCategory();
            }
        }.bind(this));
    }); wref.refreshSubCategories(main_category._lastCommand); wref.refresh(main_category._lastCommand);
    if (main_category._lastCommand) {
        this.refreshSubItems(main_category.categories[main_category._lastCommand]);
    } else {
        this.refreshSubItems(main_category.categories[0]);
    }
};

Scene_Credits.prototype.refreshSubItems = function (sub_category) {
    this._creditsDetailWindow._txtSubCategory = sub_category.name;
    const wref = this._creditsItemWindow;
    wref._subCategory = sub_category;
    wref._handlers = {};
    wref.setHandler("cancel", this.popScene.bind(this));
    sub_category.items.forEach(si => {
        wref.setHandler("item_" + si.name, function () {
            wref.activate(); sub_category._lastItem = wref._index;
            this._creditsDetailWindow._subItem = si;
            this._creditsDetailWindow.refreshDetails();
        }.bind(this));
    }); wref.refreshItems(); wref.refresh(sub_category._lastItem);
    this._creditsDetailWindow._subItem = sub_category.items[sub_category._lastItem || 0];
    this._creditsDetailWindow.refreshDetails();
};

Scene_Credits.prototype.creditsHeaderRect = function () {
    if (OcRam.isMZ()) {
        const padding = Window_Base.prototype.itemPadding();
        return new Rectangle(0, 0, Graphics.width - padding, this.calcWindowHeight(1, false));
    } else {
        return new Rectangle(0, 0, Graphics.width, this.calcWindowHeight(1, false));
    }
};

Scene_Credits.prototype.creditsTopRect = function () {
    if (OcRam.isMZ()) {
        const padding = Window_Base.prototype.itemPadding();
        return new Rectangle(0, this.calcWindowHeight(1, true), Graphics.width - padding, this.calcWindowHeight(1, true));
    } else {
        return new Rectangle(0, this.calcWindowHeight(1, true), Graphics.width, this.calcWindowHeight(1, true));
    }
};

Scene_Credits.prototype.creditsSubCategoriesRect = function () {
    if (OcRam.isMZ()) {
        const padding = Window_Base.prototype.itemPadding();
        return new Rectangle(0, this.calcWindowHeight(2, true) + padding * 3, Graphics.width - padding, this.calcWindowHeight(1, true));
    } else {
        return new Rectangle(0, this.calcWindowHeight(3, true), Graphics.width, this.calcWindowHeight(1, true));
    }
};

Scene_Credits.prototype.creditsItemsRect = function () {
    if (OcRam.isMZ()) {
    const padding = Window_Base.prototype.itemPadding();
        return new Rectangle(0, this.calcWindowHeight(3, true) + padding * 6, Graphics.width * 0.333, Graphics.height - this.calcWindowHeight(3, true) - padding * 7);
    } else {
        return new Rectangle(0, this.calcWindowHeight(5, true), Graphics.width * 0.333, Graphics.height - this.calcWindowHeight(5, true));
    }
};

Scene_Credits.prototype.creditsDetailsRect = function () {
    if (OcRam.isMZ()) {
        const padding = Window_Base.prototype.itemPadding();
        return new Rectangle(Graphics.width * 0.333 + 1, this.calcWindowHeight(3, true) + padding * 6, Graphics.width * 0.666 - padding, Graphics.height - this.calcWindowHeight(3, true) - padding * 7);
    } else {
        return new Rectangle(Graphics.width * 0.333 + 1, this.calcWindowHeight(5, true), Graphics.width * 0.666, Graphics.height - this.calcWindowHeight(5, true));
    }
};

// Credits HEADER
function Window_CreditsHeader() {
    this.initialize(...arguments);
}

Window_CreditsHeader.prototype = Object.create(Window_Base.prototype);
Window_CreditsHeader.prototype.constructor = Window_CreditsHeader;

Window_CreditsHeader.prototype.initialize = function (rect, sub_item) {
    Window_Base.prototype.initialize.call(this, rect);
    this.contents.fontSize = OcRam.Credits.baseFontSize();
    this.setBackgroundType(OcRam.Credits.windowStyleHeader());
    this.refreshHeader();
};

Window_CreditsHeader.prototype.refreshHeader = function () {

    this.contents.clearRect(0, 0, this.contents.width, this.contents.height);
    this.resetTextColor();

    this.drawText(OcRam.Credits.parameters['Credits Caption'] || "Credits", 4, 0, this.contents.width, "left");

    this.contents.fontSize = OcRam.Credits.baseFontSize() - 4;
    this.changeTextColor(ColorManager.textColor(4));
    this.drawText("(Press OK to toggle main/sub categories)", -4, 0, this.contents.width, "right");
    this.contents.fontSize = OcRam.Credits.baseFontSize();

    this.resetTextColor();

};

// Main categories
function Window_CreditsTop() {
    this.initialize(...arguments);
}

Window_CreditsTop.prototype = Object.create(Window_Command.prototype);
Window_CreditsTop.prototype.constructor = Window_CreditsTop;

Window_CreditsTop.prototype.initialize = function (rect) {
    this._cursorRect = new Rectangle();
    Window_Command.prototype.initialize.call(this, rect);
    this.contents.fontSize = OcRam.Credits.baseFontSize();
    this.setBackgroundType(OcRam.Credits.windowStyleCommands());
    this._touchedOC = true; this.refresh();
};

Window_CreditsTop.prototype.playOkSound = function () {
    if (!this._touchedOC) SoundManager.playCursor(); this._touchedOC = false;
};

Window_CreditsTop.prototype.refresh = function (index) {
    this.clearCommandList(); this.makeCommandList(index);
    Window_Selectable.prototype.refresh.call(this);
};

Window_CreditsTop.prototype.makeCommandList = function () { this.addSections(); };
Window_CreditsTop.prototype.maxCols = function () { return $credits.length; };

Window_CreditsTop.prototype.addSections = function () {
    $credits.forEach(c => {
        this.addCommand(c.name, "mainItem_" + c.name);
    });
};

Window_CreditsTop.prototype.isHoverEnabled = function () {
    return false;
}; Window_CreditsTop.prototype.processTouch = function () {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered()) {
            this._touchedOC = true; this.onTouchSelect(true); this.onTouchOk(); return;
        } if (TouchInput.isClicked()) {
            this._touchedOC = true; this.onTouchSelect(true); this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
}; Window_CreditsTop.prototype.processCursorMove = function () {
    if (this.isOkTriggered()) {
        OcRam.Credits.activateMainCategory(!OcRam.Credits.mainCategoryActive());
        const s = OcRam.scene();
        if (s) {
            s._preventSelect = true;
            if (OcRam.Credits.mainCategoryActive()) {
                s.highlightMainCategory();
            } else {
                s.highlightSubCategory();
            }
        } return;
    }
    if (this.isCursorMovable() && OcRam.Credits.mainCategoryActive()) {
        if (Input.isRepeated("left")) {
            this.cursorLeft(Input.isTriggered("left")); this.processOk();
        }
        if (Input.isRepeated("right")) {
            this.cursorRight(Input.isTriggered("right")); this.processOk();
        }
    }
};

// SubCategories
function Window_CreditsSubCategories() {
    this.initialize(...arguments);
}

Window_CreditsSubCategories.prototype = Object.create(Window_Command.prototype);
Window_CreditsSubCategories.prototype.constructor = Window_CreditsSubCategories;

Window_CreditsSubCategories.prototype.initialize = function (rect, main_category) {
    this._mainCategory = main_category; this._cursorRect = new Rectangle();
    Window_Command.prototype.initialize.call(this, rect);
    this._touchedOC = true; this.contents.fontSize = OcRam.Credits.baseFontSize();
    this.setBackgroundType(OcRam.Credits.windowStyleCommands());
};

Window_CreditsSubCategories.prototype.makeCommandList = function (index) { this.refreshSubCategories(index); };
Window_CreditsSubCategories.prototype.maxCols = function () { return this._mainCategory && this._mainCategory.categories ? this._mainCategory.categories.length : 1; };

Window_CreditsSubCategories.prototype.playOkSound = function () {
    if (!this._touchedOC) SoundManager.playCursor(); this._touchedOC = false;
};

Window_CreditsSubCategories.prototype.refresh = function (index) {
    this.clearCommandList(); this.makeCommandList(index);
    Window_Selectable.prototype.refresh.call(this);
};

Window_CreditsSubCategories.prototype.refreshSubCategories = function (index) {
    this.clearCommandList();
    if (
        this._mainCategory &&
        this._mainCategory.categories &&
        this._mainCategory.categories.length > 0
    ) {
        this._mainCategory.categories.forEach(si => {
            this.addCommand(si.name, "subCat_" + si.name);
        });
    } this.select(index || 0);
};

Window_CreditsSubCategories.prototype.isHoverEnabled = function () {
    return false;
}; Window_CreditsSubCategories.prototype.processTouch = function () {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered()) {
            this._touchedOC = true; this.onTouchSelect(true); this.onTouchOk(); return;
        } if (TouchInput.isClicked()) {
            this._touchedOC = true; this.onTouchSelect(true); this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
}; Window_CreditsSubCategories.prototype.processCursorMove = function () {
    if (this.isCursorMovable() && !OcRam.Credits.mainCategoryActive()) {
        if (Input.isRepeated("left")) {
            this.cursorLeft(Input.isTriggered("left")); this.processOk();
        }
        if (Input.isRepeated("right")) {
            this.cursorRight(Input.isTriggered("right")); this.processOk();
        }
    }
};

// Sub items
function Window_CreditsSubItems() {
    this.initialize(...arguments);
}

Window_CreditsSubItems.prototype = Object.create(Window_Command.prototype);
Window_CreditsSubItems.prototype.constructor = Window_CreditsSubItems;

Window_CreditsSubItems.prototype.initialize = function (rect, sub_category) {
    this._subCategory = sub_category; this._cursorRect = new Rectangle();
    Window_Command.prototype.initialize.call(this, rect);
    this._touchedOC = true; this.contents.fontSize = OcRam.Credits.baseFontSize();
    this.setBackgroundType(OcRam.Credits.windowStyleDetails());
};

Window_CreditsSubItems.prototype.playOkSound = function () {
    if (!this._touchedOC) SoundManager.playCursor(); this._touchedOC = false;
};

Window_CreditsSubItems.prototype.refresh = function (index) {
    this.clearCommandList(); this.makeCommandList(index);
    Window_Selectable.prototype.refresh.call(this);
};

Window_CreditsSubItems.prototype.makeCommandList = function (index) { this.refreshItems(index); };

Window_CreditsSubItems.prototype.refreshItems = function (index) {
    if (this._subCategory && this._subCategory.items && this._subCategory.items.length > 0) {
        this._subCategory.items.forEach(si => {
            this.addCommand(si.name, "item_" + si.name);
        });
    } this.select(index || 0);
};

Window_CreditsSubItems.prototype.isHoverEnabled = function () {
    return false;
}; Window_CreditsSubItems.prototype.processTouch = function () {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered()) {
            this._touchedOC = true; this.onTouchSelect(true); this.onTouchOk(); return;
        } if (TouchInput.isClicked()) {
            this._touchedOC = true; this.onTouchSelect(true); this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
}; Window_CreditsSubItems.prototype.processCursorMove = function () {
    if (this.isCursorMovable()) {
        if (Input.isRepeated("down")) {
            this.cursorDown(Input.isTriggered("down")); this.processOk();
        }
        if (Input.isRepeated("up")) {
            this.cursorUp(Input.isTriggered("up")); this.processOk();
        }
    }
};

// Credits details
function Window_CreditsDetails() {
    this.initialize(...arguments);
}

Window_CreditsDetails.prototype = Object.create(Window_Base.prototype);
Window_CreditsDetails.prototype.constructor = Window_CreditsDetails;

Window_CreditsDetails.prototype.initialize = function (rect, sub_item) {
    this._subItem = sub_item;
    this._txtMainCategory = "?";
    this._txtSubCategory = "?";
    Window_Base.prototype.initialize.call(this, rect);
    this.contents.fontSize = OcRam.Credits.baseFontSize();
    this.setBackgroundType(OcRam.Credits.windowStyleDetails());
    this.refreshDetails();
};

Window_CreditsDetails.prototype.refreshDetails = function () {

    const si = this._subItem; let cur_row = 0;
    const row_height = this.lineHeight();
    const small_row_height = this.lineHeight() - 6;
    const author = si && si.author ? si.author : "";
    const license = si && si.license ? si.license : "";
    const www = si && si.www ? si.www : "";
    const iname = si && si.name ? si.name : "";
    const left_marg = 130 + OcRam.Credits.baseFontSize();
    

    this.contents.clearRect(0, 0, this.contents.width, this.contents.height);
    this.resetTextColor();

    this.contents.fontSize = OcRam.Credits.baseFontSize() - 4;
    this.changeTextColor(ColorManager.textColor(6));
    this.drawText(this._txtMainCategory + " | " + this._txtSubCategory + " | " + iname, 0, 0, this.contents.width, "left");

    if (www) {
        cur_row++;
        this.changeTextColor(ColorManager.textColor(8));
        this.drawText(www, 0, row_height * cur_row, this.contents.width);
    }

    this.contents.fontSize = OcRam.Credits.baseFontSize();

    if (author) {
        cur_row++;
        this.changeTextColor(ColorManager.textColor(4));
        this.drawText("Author(s): ", 0, row_height * cur_row, this.contents.width);
        this.resetTextColor();
        this.drawText(author, left_marg, row_height * cur_row, this.contents.width - left_marg);
    }

    if (license) {
        cur_row++;
        this.changeTextColor(ColorManager.textColor(4));
        this.drawText("License: ", 0, row_height * cur_row, this.contents.width);
        this.resetTextColor();
        this.drawText(license, left_marg, row_height * cur_row, this.contents.width - left_marg);
    }

    cur_row++; this.contents.fontSize = OcRam.Credits.baseFontSize() - 4;
    this.changeTextColor(ColorManager.textColor(4));
    this.drawText("Additional info: ", 0, row_height * cur_row + 4, this.contents.width);

    cur_row = row_height * ++cur_row;
    this.resetTextColor(); let ri = 0;
    if (si && si.rows && si.rows.length > 0) {
        si.rows.forEach(row => {
            this.drawText(row, 0, cur_row + (small_row_height * ri++), this.contents.width);
        });
    } else {
        this.drawText(iname, 0, cur_row, this.contents.width);
    }

};