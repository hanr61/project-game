//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_NPC_Scheduler.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.19) alert("OcRam core v1.19 or greater is required!");

OcRam.addPlugin("NPC_Scheduler", "1.07");

/*:
 * @target MZ
 * @plugindesc v1.07 This plugin is used to schedule NPC daily tasks and reactions to weather.
 * NOTE: OcRam_Time_System is required in order for this plugin to work.
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Time_System
 * @orderAfter OcRam_Time_System
 * @orderAfter OcRam_Weather_System
 * @orderAfter OcRam_Passages
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command setScheduleReactTime
 * @text Set Schedule React Time
 * @desc Sets schedule react time in seconds.
 *
 * @arg reactTime
 * @type number
 * @min 0
 * @max 999
 * @default 20
 * @text React time
 * @desc React time in seconds. (individual delayed schedule start for each event)
 *
 * @command setWeatherReactTime
 * @text Set Weather React Time
 * @desc Sets weather react time in seconds.
 *
 * @arg reactTime
 * @type number
 * @min 0
 * @max 999
 * @default 5
 * @text React time
 * @desc React time in seconds. (individual delayed schedule start for each event)
 *
 * @arg weatherId
 * @type number
 * @min -4
 * @default -4
 * @text Weather id
 * @desc -4 = Global, -3 = Snow, -2 = Storm, -1 = Rain, 0 = Clear, > 0 = Custom weather
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Schedule reacting
 * @type number
 * @desc Use this to scatter event schedules a bit.
 * Value is given in seconds.
 * @default 20
 *
 * @param Weather reacting
 * @type number
 * @desc Use this to scatter event reacting to weather a bit.
 * Value is given in seconds.
 * @default 5
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
 * Ever wanted to create a town where townsfolk lives their life like going to
 * market, pub and their job-/hangout places - but probably don't want to go
 * out if there's storm or blizzard going on?!
 *
 * Or some random events like NPC hinting *occasionally* the player for hidden 
 * secret by moving to the edge of forest and - "I think I heard something in
 * the bushes over there..." or maybe he/she just wants to take day or two off
 * from his/her duties?
 *
 * First you need to learn OcRam_Time_System (and Weather_System if used) to
 * use this plugin. It can be confusing to see "Day phase" / "Weekday" 1, 2...
 * or "Weather" -1, -2, 0, 5... if you have not used those plugins.
 *
 * PLEASE NOTE THAT: These plugins only HELPS you to create very complex (or
 * even somewhat "realistic") world - but it's not going to make it for you.
 *
 * This plugin can be hard to 'master'. Simple schedules are easy, but complex
 * schedules and especially linking schedules is advanced level stuff.
 * (it's still a lot easier than try to make that kind of eventing in editor)
 *
 * Download OcRam MZ demo -project to learn more! (check plugin versions!)
 * https://ocram-codes.net/download.aspx?zip=OcRam_Demo_Project&folder=mz
 *
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * These commands are used to scatter event phase start times (that not all
 * events go to home exactly the same second when it's 6 o'clock for example)
 *
 * Weather ids:
 *     -4 = Global
 *     -3 = Snow
 *     -2 = Storm
 *     -1 = Rain
 *     0 = Clear
 *     > 0 = Custom weather id
 * 
 * MV example: OcRam_NPC_Scheduler/setScheduleReactTime 16
 * setScheduleReactTime     React time in seconds (global)
 * >> reactTime             React time in seconds.
 *
 * MV example: OcRam_NPC_Scheduler/setScheduleReactTime -4 8
 * setWeatherReactTime      React time in seconds + Weather id
 * >> reactTime             React time in seconds.
 * >> weatherId             See "Weather ids:"
 * 
 * For example if we are talking about "acid rain" react time is probably 0.
 * And for "hot weather" react time can be like 500.
 *
 * NOTE: When ever player is transfered to new area all events are moved
 * INSTANTLY to their current "home" positions!
 *
 * ----------------------------------------------------------------------------
 * Event notetags (SIMPLIFIED schedule):
 * ----------------------------------------------------------------------------
 * Create event with following notetag(s) and 2 event pages conditioned with 
 * following self switches: Page1 "A" (Active), Page2 "B" (Home)
 *
 * Only one of EACH notetag can be used in same event (in example below
 * <home_weather:!-1> and <home_weather:-1,-3> notetags are ignored):
 *     <apos:[x,y]>             (Active page position)
 *     <home_phases:1,4>        (Goes to home pos at night and dusk)
 *     <home_weather:!0>        (Goes to home pos if it's not clear weather)
 *     <home_weather:!-1>       (Goes to home pos if it's not raining)
 *     <home_weather:-1,-3>     (Goes to home pos if it's raining nor snowing)
 *     <home_wd:5,6>            (Goes to home pos on saturday and sunday)
 *
 * Self switches:
 *     "A" = Active page does what ever it does when it's not time to go home
 *     "B" = "Home page" is triggered when event reaches it's home position
 *
 * NOTE: For simplified schedules original position of event = home position!
 * Home position can be changed via javascript call: event.setNewHome(x, y);
 *
 * NOTE2: NOT operand (!) is only available with <home_weather...> and
 * <home_wd...> tags.
 *
 * TIP: Use simple schedules for various creatures in your game world(s). For
 * example like: bats, birds, (rain)frogs, owls and such... or even some NPC,
 * if complex schedules are too much for them (has only on and off modes) :)
 *
 * ----------------------------------------------------------------------------
 * Event notetags (COMPLEX schedule):
 * ----------------------------------------------------------------------------
 * With complex schedules you can create very detailed schedule for each NPC.
 * And combined with some random/linked schedules it makes good illusion that:
 * "WOW! This place is actually living! I wonder what happens next!"
 *
 * NOTE: For complex schedules all "simple" schedule notetags are ignored.
 *
 * ----------------------------------------------------------------------------
 * TIP: Use "notepad" to script event notetags (easier to see "big picture")!
 * ----------------------------------------------------------------------------
 * Create event with 4 pages. Pages must have following self switches:
 * Page1 "A" (Night), Page2 "B" (Dawn), Page3 "C" (Day), Page4 "D" (Dusk)
 * ... and following EVENT NOTETAG(s)
 *
 * All weekdays (and weathers) AKA "Default schedule":
 *      <schedule:[x1,y1],[x2,y2],[x3,y3],[x4,y4]>
 *
 *      x1, y1 = Night position and triggers self switch "A"
 *      x2, y2 = Dawn position and triggers self switch "B"
 *      x3, y3 = Day position and triggers self switch "C"
 *      x4, y4 = Dusk position and triggers self switch "D"
 *
 *      [x,y] can be replaced with null, meaning event keeps current position.
 *      NOTE: Only one (1) "default" declaration can be made per event...
 *
 *      NOTE2: Transparency will be turned OFF and player interfering is 
 *      disabled while event is going to 'home' position!
 *
 * Specific weekdays (overrides default schedule on desired weekdays):
 * <schedule_wd:[weekday_array],[x1,y1],[x2,y2],[x3,y3],[x4,y4]>
 *      <schedule_wd:[5,6],[x1,y1],[x2,y2],[x3,y3],[x4,y4]>
 *      <schedule_wd:[1],[x1,y1],[x2,y2],[x3,y3],[x4,y4]>
 *
 * Specific weather (overrides default/wd schedules on desired weathers):
 * <schedule_weather:[weather_id_array],[x1,y1],[x2,y2],[x3,y3],[x4,y4]>
 *      <schedule_weather:[-1,-2],[x1,y1],[x2,y2],[x3,y3],[x4,y4]>
 *      <schedule_weather:[2],[x1,y1],[x2,y2],[x3,y3],[x4,y4]>
 *
 * TIP: Disable and/or enable schedules in autorun event to change default 
 * schedule priorities! Example: Autorun with "weekday=6" condition can 
 * disable weather schedules meaning weekday is active no matter the weather!
 *
 * OR JUST RANDOM?! (overwrites everything else when occurs):
 *
 *      And because this is random we are talking about, it is possible that
 *      same schedule is randomized multiple times in row...
 *
 *      ----------------------------------------------------------------------
 *      // 0.3% chance randomized for EACH dayphase and lasts 1 dayphase
 *      <schedule_random:[0.3,-1],[x1,y1]>
 *
 *      TIP: This is perfect way to give player a hint of a hidden secrets for
 *      example. "I think I heard something in the bushes over there..."
 *
 *      -----------------------------------------------------------------------
 *      // 10% chance randomized at DAWN and lasts 4 dayphases
 *      <schedule_random:[10,2],[x1,y1],[x2,y2],[x3,y3],[x4,y4]>
 *
 *      TIP: Maybe NPC needs some time-off from duties sometimes? At the
 *      morning slooow wakeup and then maybe... day at the beach? Evening is
 *      time for good food for sure! And then party! Or just go to sleep?
 *
 *      -----------------------------------------------------------------------
 *      // 2% chance randomized at NIGHT and lasts 2 dayphases
 *      <schedule_random:[2,1],[x1,y1],[x2,y2]>
 *
 *      TIP: Then maybe some drama? Who goes out in the middle of night to
 *      visit lady in the next door!?
 *
 *      -----------------------------------------------------------------------
 *
 *      NOTE: Random schedule indexes starts from 0 and number is increased
 *      by 1 each time new random schedule (max 9) is found in event notetags.
 *
 *      Random schedule [X,Y] positions starts from randomized day phase.
 *
 *      IF there is NO random schedule ACTIVE, random schedules are checked
 *      at start of EACH DAY PHASE (not 'onNewWeather').
 *
 *      Total of 10 (0-9) random schedules can be assigned per event and each
 *      schedule may last 1 to 9 day phases.
 *
 *      // When you want to check if specific random schedule is randomized
 *      // (In above examples index 1 would belong to schedule with 10% chance)
 *      // Returns true if random schedule with index 1 is active, else false
 *      $gameSystem.isRandomSchedule(map_id, event_id, random_schedule_id)
 *      this.event().isRandomSchedule(1)
 *      this.event().schedule.activeSchedule // returns < 0 if not random
 *
 * ----------------------------------------------------------------------------
 * Event COMMENTS (EXTRA MOVEROUTES FOR NON-DEFAULT SCHEDULES):
 * ----------------------------------------------------------------------------
 * Event comments are page (day phase) specific!
 *      Page1 + Selfswitch "A" = Night
 *      Page2 + Selfswitch "B" = Dawn
 *      Page3 + Selfswitch "C" = Day
 *      Page4 + Selfswitch "D" = Dusk
 *
 * For example: If you have random schedule which can occur ANY day phase then 
 * each page must be taken care of individually! This gives you possibility 
 * to make NPC react to current day phase (or even to weather with "if"s).
 *
 * Comments are always placed ABOVE desired moveroute. Marked moveroutes will
 * be applied when schedule occurs AND event has reached it's position!
 *
 * To set custom moveroute to random0 schedule (all pages where needed):
 * *Comment*    <random0>
 * *Moveroute*  ['arrived' moveroute for this schedule]
 *
 * To set default moveroute to all weather schedules (all pages where needed):
 * *Comment*    <weather>
 * *Moveroute*  ['arrived' moveroute for this schedule]
 *
 * To set default moveroute to all weekday schedules (all pages where needed):
 * *Comment*    <weekday>
 * *Moveroute*  ['arrived' moveroute for this schedule]
 *
 * ----------------------------------------------------------------------------
 * Linking "same" event over different maps:
 * ----------------------------------------------------------------------------
 * Example: Map 1 has event which is traveling to some building. Inside that
 * building (Map 2) is event '5' which is the event that travels outside.
 * Well you can't be in 2 places at the same time can you? 
 * That's where you must link these events.
 *
 * In Map A call $gameSystem.linkSchedule(2, 5, x, y); after that when you
 * transfer to map 2: event id 5 is located in given x, y and is transparent
 * and has it's normal schedules! "Transparent" is set to "OFF" when event
 * starts to move towards it's 'home' position and "Through" is set to "OFF"
 * if priority is not "Above characters".
 *
 * Same thing must be repeated other way around - check my demo -project for
 * more information about "Linking events over different maps"!
 *
 * TIP: Use isLinkOk(...) -methods to check if link is needed.
 *
 * ----------------------------------------------------------------------------
 * Script commands and objects
 * ============================================================================
 * // Some handy OcRam core methods:
 * OcRam.emptyMoveRoute() // Returns empty moveroute
 * character.isXY(x, y) // Check if character is in this point
 * character.showBalloon(balloon_id, wait) // Show balloon via JS
 * character.moveToXY(x, y) // Moves 1 step closer to given point
 *
 * // Will not "insta move" event when transfered to that map, until event that
 * // called link method has reached it's home position or it's transparent is 
 * // set to 'on'! This gives the final touch to NPC Scheduling!
 * $gameSystem.linkSchedule(map_id, event_id, x, y);
 *
 * // Check that does event need to be linked
 * // (hasn't already 'transfered' to destion map)
 * $gameSystem.isLinkOk(event_id, not_in_x, not_in_y, day_phase);
 * this.event().isLinkOk(event_id, day_phase);
 *
 * // Check if event in this or another map has randomized schedule!
 * $gameSystem.isRandomSchedule(map_id, event_id, random_schedule_id)
 *
 * // Disable schedule X from map Y for event Z
 * $gameSystem.disableRandomSchedule(map_id, event_id, random_schedule_id)
 * $gameSystem.disableWeatherSchedule(map_id, event_id, weather_id)
 * $gameSystem.disableWeekdaySchedule(map_id, event_id, weekday)
 *
 * // Enable schedule X from map Y for event Z
 * $gameSystem.enableRandomSchedule(map_id, event_id, random_schedule_id)
 * $gameSystem.enableWeatherSchedule(map_id, event_id, weather_id)
 * $gameSystem.enableWeekdaySchedule(map_id, event_id, weekday)
 *
 * // IS schedule X from map Y for event Z disabled?
 * $gameSystem.isRandomScheduleDisabled(map_id, event_id, random_schedule_id)
 * $gameSystem.isWeatherScheduleDisabled(map_id, event_id, weather_id)
 * $gameSystem.isWeekdayScheduleDisabled(map_id, event_id, weekday)
 *
 * // OR alternatively from event: Is schedule disabled?
 * this.event().isRandomScheduleDisabled(random_schedule_id)
 * this.event().isWeatherScheduleDisabled(weather_id)
 * this.event().isWeekdayScheduleDisabled(weekday)
 *
 * this.event().setNewHome(x, y); // Set new home! (simplified schedules only)
 * this.event().setAPos(x, y); // Set new 'A' pos! (simplified schedules only)
 *
 * this.event().moveTowardHome(); // Event will move towards home
 * this.event().isHomePosition(); // Is event at home position?
 * this.event().schedule.activeSchedule; // 0 or more = Random schedule index
 * this.event().isRandomSchedule(n); // Check if random schedule id is active
 * this.event().updateSchedule(); // if something has been changed manually?
 * this.event().schedule; // returns the schedule object!
 * // .activeSchedule: -3 (Normal), -2 (Weekday), -1 (Weather), 0 >= random id
 *
 * // This gives possibility to change schedules in-game HOW EVER YOU LIKE!
 * // WARNING: ERRORS may occur if SCHEDULE_OBJECT is not as defined!
 * $gameSystem.setCustomSchedule(map_id, event_id, SCHEDULE_OBJECT)
 *
 * // To get any custom schedules (undefined if has no custom schedules)
 * $gameSystem.getCustomSchedule(map_id, event_id)
 *
 * ----------------------------------------------------------------------------
 * SCHEDULE_OBJECT
 * ----------------------------------------------------------------------------
 *
 * * = Plugin will automanage this property and will overwrite given value(s)
 *
 * JS example of automatically generated COMPLEX event "schedule" object:
 * SCHEDULE_OBJECT = {
 *     simplified: false, 
 *     homePos: [x1,y1], 
 *     weatherMoveroute: {MOVE_ROUTE},
 *     wdMoveroute: {MOVE_ROUTE}, 
 *     *currentHomePos: [x1,y1], 
 *     *waitForReact: int, 
 *     *activeSchedule: int, 
 *     phase1: [x1,y1], phase2: [x2,y2], 
 *     phase3: [x3,y3], phase4: [x4,y4],
 *     wd5: {
 *          *disabled: boolean, 
 *          phase1: [x1,y1], phase2: [x2,y2],
 *          phase3: [x3,y3], phase4: [x4,y4]
 *     },
 *     wd6: {
 *          *disabled: boolean, 
 *          phase1: [x1,y1], phase2: [x2,y2],
 *          phase3: [x3,y3], phase4: [x4,y4]
 *     },
 *     weather-1: {
 *          *disabled: boolean, 
 *          phase1: [x1,y1], phase2: [x2,y2],
 *          phase3: [x3,y3], phase4: [x4,y4]
 *     },
 *     weather2: {
 *          *disabled: boolean, 
 *          phase1: [x1,y1], phase2: [x2,y2],
 *          phase3: [x3,y3], phase4: [x4,y4]
 *     },
 *     random0: {
 *          *disabled: boolean, 
 *          probability: float,
 *          dayphase: int, 
 *          moveroute: {MOVE_ROUTE},
 *          phase1: [x1,y1],
 *          ...
 *          phase9: [x4,y4]
 *     }
 * };
 *
 * Empty "moveroute" object (as in RMMZ engine):
 * MOVE_ROUTE = {
 *     repeat: false, skippable: false, wait: false,
 *     list: [{ code: 0, parameters: [] }]
 * };
 *
 * JS example of automatically generated SIMPLE event "schedule" object:
 * SCHEDULE_OBJECT = {
 *     simplified: true,
 *     homePos: [x1,y1],
 *     aPos: [x1,y1],
 *     *currentHomePos: [x1,y1],
 *     *waitForReact: int,
 *     *activeSchedule: int,
 *     phase1: [x1,y1], phase2: [x2,y2],
 *     phase3: [x3,y3], phase4: [x4,y4],
 *     home_weather: "!0,!5",
 *     home_wd: "5,6"
 * };
 *
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your project by ANY MEANS (including: donations,
 * crypto-mining, micro-transactions, advertisements, merchandises etc..)
 * it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 10 EUR, No-credits license: 50 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME(S) you are buying / ALL plugins and your PROJECT NAME(S).
 *
 * Licenses are purchased per project and standard licenses requires credits.
 * ALL of my plugins for 1 project = 40 EUR (standard licenses).
 *
 * License for lifetime is 3x base price of any license / bundle. Permission
 * to use this type of license only in projects where you own most of it.
 * Else project license OR project owner lifetime license is required.
 *
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2022, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2021/03/07 v1.00 - Initial release
 * 2021/06/04 v1.01 - RETRO'ed for RMMV! (Credits to Drakkonis)
 * 2021/10/21 v1.02 - Support for OcRam.eventCopy!
 *                    Fixed bug when loaded through menu or after "To title"
 * 2022/01/23 v1.03 - Events now preserves their original direction!
 *                    Also fixed bug when event was already at destination >>
 *                    because already reached pos got stuck at page index -2
 * 2022/07/10 v1.04 - After battle processing now works correctly!
 * 2022/11/11 v1.05 - RETRO plugin order check fix (for MV)
 * 2024/02/25 v1.06 - Collision-altering plugin compatibility patch
 *                    (Credits to Mastertenchi and Chaucer)
 * 2025/05/25 v1.07 - Reverted v1.06 changes to make it work again with latest
 *                    and final? version of Rosedale Collision-altering plugin
 * 
 * ----------------------------------------------------------------------------
 * Overrides (destructive) methods are listed here
 * ============================================================================
 * - No overrides -
 */

(function() {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _dayPhaseVariableId = Number(OcRam.Time_System.parameters['Day phase variable Id']);
    const _weekdayVariableId = Number(OcRam.Time_System.parameters['Weekday variable Id']);
    const _weatherVariableId = (Imported.OcRam_Weather_System) ? Number(OcRam.Weather_System.parameters['Weather Variable']) : 0;

    let _scheduleReacting = {
        global: Number(this.parameters['Schedule reacting']),
        defaultWeather: Number(this.parameters['Weather reacting'])
    };

    if (Imported.OcRam_Weather_System) {
        if (OcRam.getFloat(OcRam.Weather_System.version) < 1.02) {
            alert("WARNING! OcRam_Weather_System must be at least v1.02!");
        }
    }

    let _prevMapId = 0; let _scheduledEvents = []; // For faster iterations no need to filter schedules!
    let _randomizedSchedules = []; // Randomized schedules that lasts longer than 1 day phase!
    // 1 item in _randomizedSchedules = [mapId, eventId, rndPhase, phaseCount, rndSchedule]

    // Variable values for current day phase, weekday and weather
    let _currentDayPhase = 0; let _currentWeekday = 0; let _currentWeather = 0;
    let _processingDayPhase = false; // Some kind of "spam" protection...
    let _wasBattleStarted = false; // To avoid has arrived / move to home after battle

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    const updateVariableData = () => {
        _currentDayPhase = $gameVariables.value(_dayPhaseVariableId);
        _currentWeekday = $gameVariables.value(_weekdayVariableId);
        _currentWeather = $gameVariables.value(_weatherVariableId);
    };

    const updateEventScheduleSwitches = (map_id, event_id) => {
        if (_wasBattleStarted) return;
        switch (_currentDayPhase) {
            case 1:
                $gameSelfSwitches.setValue([map_id, event_id, 'A'], true);
                $gameSelfSwitches.setValue([map_id, event_id, 'B'], false);
                $gameSelfSwitches.setValue([map_id, event_id, 'C'], false);
                $gameSelfSwitches.setValue([map_id, event_id, 'D'], false);
                break;
            case 2:
                $gameSelfSwitches.setValue([map_id, event_id, 'B'], true);
                $gameSelfSwitches.setValue([map_id, event_id, 'A'], false);
                $gameSelfSwitches.setValue([map_id, event_id, 'C'], false);
                $gameSelfSwitches.setValue([map_id, event_id, 'D'], false);
                break;
            case 3:
                $gameSelfSwitches.setValue([map_id, event_id, 'C'], true);
                $gameSelfSwitches.setValue([map_id, event_id, 'A'], false);
                $gameSelfSwitches.setValue([map_id, event_id, 'B'], false);
                $gameSelfSwitches.setValue([map_id, event_id, 'D'], false);
                break;
            case 4:
                $gameSelfSwitches.setValue([map_id, event_id, 'D'], true);
                $gameSelfSwitches.setValue([map_id, event_id, 'A'], false);
                $gameSelfSwitches.setValue([map_id, event_id, 'B'], false);
                $gameSelfSwitches.setValue([map_id, event_id, 'C'], false);
                break;
        }
    };

    const updateAllScheduledEvents = (new_weather) => {

        if (_wasBattleStarted) return;

        updateVariableData(); if (OcRam._menuCalled) return;
        if (!_scheduledEvents || _scheduledEvents.length < 1) return;
        if (!$dataMap || !$gameMap) return;
        if (!new_weather && _processingDayPhase) return; // To prevent some "spamming"

        // Increase randomized events phase count and purge if ended! ONLY ON ACTUAL DAY PHASES!
        if (!OcRam._justTransferedAny && !OcRam._justLoaded && !new_weather) purgeRandomizedSchedules();

        if (!new_weather) {
            _processingDayPhase = true;
            _scheduledEvents.forEach(e => {
                e.schedule.waitForReact = Math.round(_scheduleReacting.global * Math.random());
                if (OcRam._justTransfered && !e.isLinked()) e.schedule.waitForReact = 0;
                e.updateSchedule(); // Just a normal schedule based on day phase...
            }); _this.debug("onDayPhase", _scheduledEvents); setTimeout(() => { _processingDayPhase = false; }, 200);
        } else {
            _scheduledEvents.forEach(e => {
                if (_currentWeather !== undefined && _currentWeather != null && _currentWeather != "" && _scheduleReacting["weather" + _currentWeather]) {
                    e.schedule.waitForReact = Math.round(_scheduleReacting["weather" + _currentWeather] * Math.random());
                } else {
                    e.schedule.waitForReact = Math.round(_scheduleReacting.defaultWeather * Math.random());
                } if (OcRam._justTransfered && !e.isLinked()) e.schedule.waitForReact = 0;
                e.updateSchedule(); // Tell schedule update that it's new weather!
            }); _this.debug("onNewWeather", _scheduledEvents);
        }

    };

    const purgeLinkedSchedules = () => {
        let arr_tmp = [];
        $gameSystem._linkedSchedules.forEach(itm => {
            if (itm[4]) {
                arr_tmp.push([itm[0], itm[1], itm[2], itm[3], false]);
            }
        }); $gameSystem._linkedSchedules = arr_tmp;
    };

    const removeRandomizedSchedule = (map_id, event_id, random_schedule_id) => {
        const to_be_removed = _randomizedSchedules.find(itm => {
            if (!itm[4]) return true;
            return itm[0] == map_id && itm[1] == event_id && itm[4].index == random_schedule_id;
        }); if (to_be_removed) _randomizedSchedules.remove(to_be_removed);
    };

    const getRandomizedSchedule = (map_id, event_id) => {
        return _randomizedSchedules.find(itm => { return itm[0] == map_id && itm[1] == event_id; });
    };

    const purgeRandomizedSchedules = () => {
        const tmp_arr = [];
        _randomizedSchedules.forEach(itm => {
            if (itm[2] < Number(itm[3]) - 1) {
                tmp_arr.push([itm[0], itm[1], Number(itm[2]) + 1, itm[3], itm[4]]);
            }
        }); _randomizedSchedules = tmp_arr;
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.getScheduleReacting = () => {
        return _scheduleReacting; // Schedule reacting object
    };

    this.getScheduledEvents = () => {
        return _scheduledEvents; // Get all scheduled events
    };

    this.getRandomizedSchedule = (map_id, event_id) => {
        return getRandomizedSchedule(map_id, event_id); // Get randomized schedule
    };

    this.getRandomizedSchedules = () => {
        return _randomizedSchedules; // Get ALL randomized schedules
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    // Hook-up with OcRam.Time_System.onDayPhase
    const OC_TS_ODP = OcRam.Time_System.onDayPhase;
    OcRam.Time_System.onDayPhase = function() {
        OC_TS_ODP.call(this, arguments); updateAllScheduledEvents();
    };

    if (Imported.OcRam_Weather_System) { // Hook-up with OcRam.Weather_System.onNewWeather
        const OC_WS_ODP = OcRam.Weather_System.onNewWeather;
        OcRam.Weather_System.onNewWeather = function () {
            OC_WS_ODP.call(this, arguments); updateAllScheduledEvents(true);
        };
    }

    // Purge linked events on transfer... It's important to clean trashes...
    this.extend(Game_Player, "reserveTransfer", function () {
        if ($gameMap) _prevMapId = $gameMap._mapId;
        _this["Game_Player_reserveTransfer"].apply(this, arguments);
        if (this._newMapId != _prevMapId) {
            _scheduledEvents = []; purgeLinkedSchedules();
        }
    });

    // Wait for event to get it's home position...
    this.extend(Game_Event, "start", function () {
        if (this.schedule && !this.schedule.simplified) {
            if (this._movingToHome) return;
        } _this["Game_Event_start"].apply(this, arguments);
    });

    // GET SCHEDULE FOR THIS EVENT
    this.extend(Game_Event, "initialize", function () {

        _this["Game_Event_initialize"].apply(this, arguments);

        const custom_schedule = this.getCustomSchedule();
        if (custom_schedule) {
            this.schedule = custom_schedule;
            _this.debug("FOUND [CUSTOM] SCHEDULE FOR EVENT(" + this._eventId + ")!", this.schedule);
            _scheduledEvents.push(this); return; // No further processing is needed.
        }

        // Create schedule object when ever event is created...
        const data_ev = this.event();
        const data_ev_xy = this._eventBase ? [this._x, this._y] : [data_ev.x, data_ev.y];
        const note = data_ev.note || '';
        let obj = {}; let tmp_arr = []; let tmp_arr2 = []; let has_property = false;

        // RANDOM schedules
        let phases = note.getOpenTags("schedule_random");
        if (phases.length > 0) { // Get all random phases
            for (let i = 0; i < phases.length; i++) {
                try {
                    tmp_arr = eval("[" + phases[i] + "]");
                } catch (e) { console.warn("Game_Event_initialize:schedule_random", e); }
                let rpo = {
                    probability: OcRam.getFloat(tmp_arr[0][0]) / 100,
                    dayphase: tmp_arr[0][1]
                }; if (tmp_arr[1]) rpo.phase0 = tmp_arr[1];
                if (tmp_arr[2]) rpo.phase1 = tmp_arr[2];
                if (tmp_arr[3]) rpo.phase2 = tmp_arr[3];
                if (tmp_arr[4]) rpo.phase3 = tmp_arr[4];
                if (tmp_arr[5]) rpo.phase4 = tmp_arr[5];
                if (tmp_arr[6]) rpo.phase5 = tmp_arr[6];
                if (tmp_arr[7]) rpo.phase6 = tmp_arr[7];
                if (tmp_arr[8]) rpo.phase7 = tmp_arr[8];
                if (tmp_arr[9]) rpo.phase8 = tmp_arr[9];
                if (tmp_arr[10]) rpo.phase9 = tmp_arr[10];
                rpo.disabled = this.isRandomScheduleDisabled(i);
                obj['random' + i] = rpo; has_property = true;
            }
        }

        // Weather schedules
        phases = note.getOpenTags("schedule_weather");
        if (phases.length > 0) { // Get all weather phases
            for (let i = 0; i < phases.length; i++) {
                try {
                    tmp_arr = eval("[" + phases[i] + "]");
                } catch (e) { console.warn("Game_Event_initialize:schedule_weather", e); }
                tmp_arr2 = (tmp_arr[0] + ",").split(",");
                for (let j = 0; j < tmp_arr2.length - 1; j++) {
                    obj['weather' + tmp_arr2[j]] = {
                        disabled: this.isWeatherScheduleDisabled(Number(tmp_arr2[j])),
                        phase1: tmp_arr[1],
                        phase2: tmp_arr[2],
                        phase3: tmp_arr[3],
                        phase4: tmp_arr[4]
                    };
                } has_property = true;
            }
        }

        // Weekday schedules
        phases = note.getOpenTags("schedule_wd");
        if (phases.length > 0) { // Get all weekday phases
            for (let i = 0; i < phases.length; i++) {
                try {
                    tmp_arr = eval("[" + phases[i] + "]");
                } catch (e) { console.warn("Game_Event_initialize:schedule_wd", e); }
                tmp_arr2 = (tmp_arr[0] + ",").split(",");
                for (let j = 0; j < tmp_arr2.length - 1; j++) {
                    obj['wd' + tmp_arr2[j]] = {
                        disabled: this.isWeekdayScheduleDisabled(Number(tmp_arr2[j])),
                        phase1: tmp_arr[1],
                        phase2: tmp_arr[2],
                        phase3: tmp_arr[3],
                        phase4: tmp_arr[4]
                    };
                } has_property = true;
            }
        } 

        // Default schedules
        phases = note.getOpenTags("schedule");
        if (phases.length > 0) { // Get default schedule
            try {
                tmp_arr = eval("[" + phases[0] + "]");
                obj.phase1 = tmp_arr[0];
                obj.phase2 = tmp_arr[1];
                obj.phase3 = tmp_arr[2];
                obj.phase4 = tmp_arr[3];
                has_property = true;
            } catch (e) { console.warn("Game_Event_initialize:schedule", e); }
        }

        if (has_property) { // VALIDATE obj.phase1 to 4 MUST HAVE SOMETHING
            if (!obj.phase1) {
                this.schedule = undefined;
            } else { // Complex schedule (A, B, C and D selfswitches in use)
                obj.simplified = false;
            }
        } else { // No complex schedules was found - Check if has any "SIMPLE" schedules?
            phases = note.getOpenTags("home_phases")[0];
            obj = {
                simplified: true,
                home_weather: '',
                home_wd: '',
                aPos: null,
                phase1: null,
                phase2: null,
                phase3: null,
                phase4: null
            };
            if (phases) {
                try {
                    tmp_arr = eval("[" + phases + "]");
                    if (tmp_arr.length > 0) {
                        for (let i = 0; i < tmp_arr.length; i++) {
                            obj['phase' + tmp_arr[i]] = data_ev_xy;
                        } has_property = true;
                    }
                } catch (e) { console.warn("Game_Event_initialize:home_phases", e); }
            }

            phases = note.getOpenTags("home_weather")[0]; // Get home weather(s)
            if ((phases || phases == 0) && phases != "") { obj['home_weather'] = phases; has_property = true; }

            phases = note.getOpenTags("home_wd")[0]; // Get home weekday(s)
            if ((phases || phases == 0) && phases != "") { obj['home_wd'] = phases; has_property = true; }

            phases = note.getOpenTags("apos")[0]; // Get 'A' pos
            if ((phases || phases == 0) && phases != "") {
                try {
                    obj.aPos = eval(phases);
                } catch (e) { console.warn("Game_Event_initialize:apos", e); }
            }

        }

        if (has_property) { // Has any kind of schedule (simple or complex)??
            obj.homePos = data_ev_xy;
            obj.currentHomePos = data_ev_xy;
            this.schedule = obj; this.updateLinks();
            if (this.isLinked()) { // This event is linked >> locate and hide it NOW (will be shown when starts to move...)
                this.setTransparent(true); this.locate(this.schedule.linked[2], this.schedule.linked[3]);
            } _scheduledEvents.push(this); _this.debug("FOUND SCHEDULE FOR EVENT(" + this._eventId + ")!", this.schedule);
        }

    });

    // Indicate NPC system that battle was started...
    this.extend(BattleManager, "setup", function () {
        _wasBattleStarted = true; _this["BattleManager_setup"].apply(this, arguments);
        setTimeout(() => { _wasBattleStarted = false; }, 1000);
    });

    // Check comments and if scheduler has ordered this event to go home.
    this.extend(Game_Event, "setupPageSettings", function () {
        _this["Game_Event_setupPageSettings"].apply(this, arguments);
        this._originalDirection = this._direction; if (_wasBattleStarted) return;
        if (!this.schedule || !$dataMap || !this.event()) return;
        this.refreshScheduledMoveroutes(); // Force to refresh new moveroutes on THIS page!
        if (this.isLinked()) { // Linked!
            this.locate(this.schedule.linked[2], this.schedule.linked[3]); this.linkDone();
            this._moveToHome = false; this._hasArrived = false; this.moveToHome();
        } else { // Non-linked?
            if (this._moveToHome) {
                this._moveToHome = false; this.moveToHome();
            } else if (this._hasArrived) {
                this.hasArrived();
            }
        }
    });

    // Init some Game_System stuff...
    this.extend(Game_System, "initialize", function () {
        _this["Game_System_initialize"].apply(this, arguments);
        this._disabledRandomSchedules = [];
        this._disabledWeatherSchedules = [];
        this._disabledWeekdaySchedules = [];
        this._customSchedules = [];
        this._linkedSchedules = [];
    });

    // Ensure that moveroute is not "undefined" nor "null" (this plugin is stabbing moveroutes seriously!)
    this.extend(Game_Character, "restoreMoveRoute", function () {
        if (!this._originalMoveRoute || !this._originalMoveRoute.list) this._originalMoveRoute = OcRam.emptyMoveRoute();
        _this["Game_Character_restoreMoveRoute"].apply(this, arguments);
    });

    // If event is moving home >> disable "NPC trolling" by disabling player interact totally!
    this.extend(Game_CharacterBase, "isCollidedWithVehicles", function () {
        if (this._movingToHome) return false;
        return _this["Game_CharacterBase_isCollidedWithVehicles"].apply(this, arguments);
    }); this.extend(Game_Event, "isCollidedWithEvents", function (x, y) {
        if (this._movingToHome) {
            const events = $gameMap.eventsXyNt(x, y);
            return !!events.find(event => { return (event.isNormalPriority() && !event.schedule); });
        } else {
            return _this["Game_Event_isCollidedWithEvents"].apply(this, arguments);
        }
    }); this.extend(Game_Event, "isCollidedWithPlayerCharacters", function () {
        if (this._movingToHome) return false;
        return _this["Game_Event_isCollidedWithPlayerCharacters"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    // Event LINKING!
    Game_System.prototype.isLinkOk = function (event_id, x, y, day_phase) { // is link OK?
        if ($gameMap.getEventById(event_id).isXY(x, y)) return false;
        if (day_phase && _currentDayPhase != day_phase) return false;
        return true;
    }; Game_Event.prototype.isLinkOk = function (event_id, day_phase) { // is link OK?
        return $gameSystem.isLinkOk(event_id, this._x, this._y, day_phase);
    }; Game_System.prototype.linkSchedule = function (map_id, event_id, x, y) { // Add to "linked" schedules
        if (OcRam._justTransfered) return;
        this._linkedSchedules.push([map_id, event_id, x, y, true]);
    };

    // Update NON-DEFAULT moveroutes based on event page comments!
    Game_Event.prototype.refreshScheduledMoveroutes = function () {

        if (!this.schedule) return;

        // Reset 'comment' moveroutes
        this.schedule.wdMoveroute = null;
        this.schedule.weatherMoveroute = null;
        for (let i = 0; i < 10; i++) {
            if (this.schedule["random" + i]) this.schedule["random" + i].moveroute = null;
        }

        if (!$dataMap || !this.event()) return;

        // COPY AND DELETE MOVEROUTES BASED ON COMMENTS!
        const cmts = this.getComments();
        let j = 1; let mr = null;

        cmts.forEach(c => {
            const s = c.parameters[0];
            if (s == "<weekday>") {
                const li = this.page().list[c.commandIndex + j];
                mr = li.parameters[1]; // Moveroute
                this.schedule.wdMoveroute = { ...mr }; // Get it for further use!
                li.code = 9999; // Just change item code so engine doesn't know it is moveroute :D
            } else if (s == "<weather>") {
                const li = this.page().list[c.commandIndex + j];
                mr = li.parameters[1]; // Moveroute
                this.schedule.weatherMoveroute = { ...mr }; // Get it for further use!
                li.code = 9999; // Just change item code so engine doesn't know it is moveroute :D
            } else if (s.left(7) == "<random") {
                const li = this.page().list[c.commandIndex + j];
                mr = li.parameters[1];  // Moveroute
                const rnd_index = Number(s.replace("<random", "").replace(">", "")); // Get random INDEX
                if (this.schedule["random" + rnd_index]) this.schedule["random" + rnd_index].moveroute = { ...mr }; // Get it for further use!
                li.code = 9999; // Just change item code so engine doesn't know it is moveroute :D
            }
        });

    };

    // GET/SET TOTALLY CUSTOM SCHEDULES!
    Game_System.prototype.setCustomSchedule = function (map_id, event_id, schedule_object) {
        if (!this._customSchedules) this._customSchedules = [];
        const itm = this._customSchedules.find(o => {
            return o[0] == map_id && o[1] == event_id;
        }); if (itm) { // Just update existing custom schedule
            itm[2] = schedule_object;
        } else { // Add NEW custom schedule
            this._customSchedules.push([map_id, event_id, schedule_object]);
        } // If event is in the same map >> Update new schedule NOW!
        if ($gameMap && $gameMap._mapId == map_id) {
            const ev = $gameMap.getEventById(event_id);
            ev.schedule = schedule_object;
            if (!_scheduledEvents.find(ev => { return ev._eventId == event_id; })) {
                _scheduledEvents.push(ev); // If event wasn't in _scheduledEvents >> it is now!
            } ev.updateSchedule();
        }
    }; Game_System.prototype.getCustomSchedule = function (map_id, event_id) {
        if (!this._customSchedules) this._customSchedules = [];
        const itm = this._customSchedules.find(o => {
            return o[0] == map_id && o[1] == event_id;
        }); return (itm && itm[2]) ? itm[2] : null;
    }; Game_Event.prototype.getCustomSchedule = function () {
        return $gameSystem.getCustomSchedule(this._mapId, this._eventId);
    }; Game_Event.prototype.setCustomSchedule = function (schedule_object) {
        return $gameSystem.setCustomSchedule(this._mapId, this._eventId, schedule_object);
    };

    // DISABLE SCHEDULES!
    Game_System.prototype.disableRandomSchedule = function (map_id, event_id, rnd_schedule_index) {
        if (!this._disabledRandomSchedules) this._disabledRandomSchedules = [];
        if (!this._disabledRandomSchedules.find(itm => {
            return itm[0] == map_id && itm[1] == event_id && itm[2] == rnd_schedule_index;
        })) { // Object is not found in disabled schedules... PUSH IT NOW!
            this._disabledRandomSchedules.push([map_id, event_id, rnd_schedule_index]);
        } removeRandomizedSchedule(map_id, event_id, rnd_schedule_index);
    }; Game_System.prototype.disableWeatherSchedule = function (map_id, event_id, weather_id) {
        if (!this._disabledWeatherSchedules) this._disabledWeatherSchedules = [];
        if (!this._disabledWeatherSchedules.find(itm => {
            return itm[0] == map_id && itm[1] == event_id && itm[2] == rnd_schedule_index;
        })) { // Object is not found in disabled schedules... PUSH IT NOW!
            this._disabledWeatherSchedules.push([map_id, event_id, weather_id]);
        }
    }; Game_System.prototype.disableWeekdaySchedule = function (map_id, event_id, weekday) {
        if (!this._disabledWeekdaySchedules) this._disabledWeekdaySchedules = [];
        if (!this._disabledWeekdaySchedules.find(itm => {
            return itm[0] == map_id && itm[1] == event_id && itm[2] == rnd_schedule_index;
        })) { // Object is not found in disabled schedules... PUSH IT NOW!
            this._disabledWeekdaySchedules.push([map_id, event_id, weekday]);
        }
    };

    // ENABLE SCHEDULES!
    Game_System.prototype.enableRandomSchedule = function (map_id, event_id, rnd_schedule_index) {
        if (!this._disabledRandomSchedules) this._disabledRandomSchedules = [];
        const itm = this._disabledRandomSchedules.find(o => {
            return o[0] == map_id && o[1] == event_id && o[2] == rnd_schedule_index;
        }); if (itm) this._disabledRandomSchedules.remove(itm); // Found it! REMOVE NOW!
    }; Game_System.prototype.enableWeatherSchedule = function (map_id, event_id, weather_id) {
        if (!this._disabledWeatherSchedules) this._disabledWeatherSchedules = [];
        const itm = this._disabledWeatherSchedules.find(o => {
            return o[0] == map_id && o[1] == event_id && o[2] == rnd_schedule_index;
        }); if (itm) this._disabledWeatherSchedules.remove(itm); // Found it! REMOVE NOW!
    }; Game_System.prototype.enableWeekdaySchedule = function (map_id, event_id, weekday) {
        if (!this._disabledWeekdaySchedules) this._disabledWeekdaySchedules = [];
        const itm = this._disabledWeekdaySchedules.find(o => {
            return o[0] == map_id && o[1] == event_id && o[2] == rnd_schedule_index;
        }); if (itm) this._disabledWeekdaySchedules.remove(itm); // Found it! REMOVE NOW!
    };

    // CHECK IF DISABLED
    Game_System.prototype.isRandomScheduleDisabled = function (map_id, event_id, rnd_schedule_index) {
        if (!this._disabledRandomSchedules) this._disabledRandomSchedules = [];
        return (this._disabledRandomSchedules.find(itm => {
            return itm[0] == map_id && itm[1] == event_id && itm[2] == rnd_schedule_index;
        })) ? true : false;
    }; Game_System.prototype.isWeatherScheduleDisabled = function (map_id, event_id, weather_id) {
        if (!this._disabledWeatherSchedules) this._disabledWeatherSchedules = [];
        return (this._disabledWeatherSchedules.find(itm => {
            return itm[0] == map_id && itm[1] == event_id && itm[2] == weather_id;
        })) ? true : false;
    }; Game_System.prototype.isWeekdayScheduleDisabled = function (map_id, event_id, weekday) {
        if (!this._disabledWeekdaySchedules) this._disabledWeekdaySchedules = [];
        return (this._disabledWeekdaySchedules.find(itm => {
            return itm[0] == map_id && itm[1] == event_id && itm[2] == weekday;
        })) ? true : false;
    }; Game_Event.prototype.isRandomScheduleDisabled = function (rnd_schedule_index) {
        return $gameSystem.isRandomScheduleDisabled(this._mapId, this._eventId, rnd_schedule_index);
    }; Game_Event.prototype.isWeatherScheduleDisabled = function (weather_id) {
        return $gameSystem.isWeatherScheduleDisabled(this._mapId, this._eventId, weather_id);
    }; Game_Event.prototype.isWeekdayScheduleDisabled = function (weekday) {
        return $gameSystem.isWeekdayScheduleDisabled(this._mapId, this._eventId, weekday);
    };

    // Used to check if any event has random schedule even on ANOTHER MAP!
    Game_System.prototype.isRandomSchedule = function (map_id, event_id, rnd_schedule_index) {
        const schedule = getRandomizedSchedule(map_id, event_id);
        if (!schedule || !schedule[4]) return;
        return schedule[4].index == rnd_schedule_index;
    };

    // Moves 1 tile towards it's 'home position'
    Game_Character.prototype.moveTowardHome = function () {
        if (!this.schedule || !this.schedule.currentHomePos) return;
        this.moveToXY(this.schedule.currentHomePos[0], this.schedule.currentHomePos[1]);
    };

    // Is event at homepos?
    Game_Character.prototype.isHomePosition = function () {
        if (this.isMoving()) return false;
        if (!this.schedule || !this.schedule.currentHomePos) return true;
        return this._x == this.schedule.currentHomePos[0] && this._y == this.schedule.currentHomePos[1];
    };

    // Fetch moveroute from database
    Game_Character.prototype.setDefaultMoveroute = function () {
        const new_page_index = this._erased ? -1 : this.findProperPageIndex();
        const new_page = this.event().pages[new_page_index];
        if (this.event() && this.event().pages && new_page) {
            this._moveRouteForcing = false; this._moveRouteIndex = 0;
            this._moveRoute = new_page.moveRoute;
            this._moveType = new_page.moveType;
            this._through = new_page.through;
            this._waitCount = this._moveRoute.length; this._stopCount = 0;
            this.updateRoutineMove();
        }
    };

    // Updates self switches for simple schedule
    Game_Character.prototype.updateSimpleSwitches = function (a_pos) {
        if (_wasBattleStarted) return;
        if (a_pos) { // Force to page A = "Active"
            $gameSelfSwitches.setValue([this._mapId, this._eventId, 'A'], true);
            $gameSelfSwitches.setValue([this._mapId, this._eventId, 'B'], false);
        } else { // Force to page B = "Home"
            $gameSelfSwitches.setValue([this._mapId, this._eventId, 'B'], true);
            $gameSelfSwitches.setValue([this._mapId, this._eventId, 'A'], false);

        }
    };

    // Has arrived to home?? Restore moveroute to what it was before force to home.
    Game_Character.prototype.hasArrived = function () {

        const is_a_pos = !this.schedule.currentHomePos || (this.schedule.homePos[0] != this.schedule.currentHomePos[0] || this.schedule.homePos[1] != this.schedule.currentHomePos[1]);

        if (this.isHomePosition()) {

            if (this._originalDirection) this._direction = this._originalDirection;
            this._movingToHome = false; this._hasArrived = true;
            this.refreshScheduledMoveroutes();
            
            if (this.schedule.simplified) { // Reached home >> force to page B - if not "aPos"
                this.updateSimpleSwitches(is_a_pos);
                this.setDefaultMoveroute(); return true;
            }

            // Ok we got complex schedule ---------------------------------------------------------------------------
            let force_moveroute = null;
            switch (this.schedule.activeSchedule) {
                case -3: // Default schedule
                    break;
                case -2: // Weekday schedule
                    force_moveroute = this.schedule.wdMoveroute; break;
                case -1: // Weather schedule
                    force_moveroute = this.schedule.weatherMoveroute; break;
                default: // Random schedule
                    if (this.schedule["random" + Number(this.schedule.activeSchedule)]) {
                        force_moveroute = this.schedule["random" + Number(this.schedule.activeSchedule)].moveroute;
                    } break;
            }

            if (!force_moveroute) {
                this.setDefaultMoveroute();
            } else {
                _this.debug("FORCED NON-DEFAULT MOVEROUTE:", force_moveroute);
                this._originalMoveRoute = OcRam.emptyMoveRoute();
                this._moveRouteIndex = 0; this._waitCount = 0; this._moveType = 3;
                this.forceMoveRoute(force_moveroute);
            } _this.debug("After arrival MOVEROUTE:", this._moveType, this._moveRoute);

            return true;

        } else { // Still on "ACTIVE" page... not reached home yet...
            if (this.schedule.simplified) {
                this.updateSimpleSwitches(true);
            } return false;
        }
    };

    // Check if desired random schedule has occured?
    Game_Event.prototype.isRandomSchedule = function (id) {
        return id == this.schedule.activeSchedule;
    };

    // Set new home position for simple schedules...
    Game_Event.prototype.setNewHome = function (x, y) {
        if (this.schedule && this.schedule.simplified) {
            this.schedule.homePos = [x, y];
            this.schedule.currentHomePos = [x, y];
            if (this.schedule.phase1) this.schedule.phase1 = [x, y];
            if (this.schedule.phase2) this.schedule.phase2 = [x, y];
            if (this.schedule.phase3) this.schedule.phase3 = [x, y];
            if (this.schedule.phase4) this.schedule.phase4 = [x, y];
            this.updateSchedule();
        } else {
            console.warn("Game_Event.setNewHome - Use only for simple schedules!", "schedule was:", this.schedule);
        }
    };

    // Order event to move home position + Save current moveroute and force new moveroute
    Game_Event.prototype.moveToHome = function () {

        // If move home has been called while we are already at home - Then we just arrived?
        if (this.isHomePosition()) { this._movingToHome = true; this.hasArrived(); return; }

        this._movingToHome = true; this.setTransparent(false);
        if (this._priorityType != 2) this.setThrough(false);
        
        // Force moveroute to home...
        let mrl = {}; mrl.list = [];
        mrl.list.push({ code: 45, parameters: ["this.moveTowardHome();"] }); // JS
        mrl.list.push({ code: 45, parameters: ["this.hasArrived();"] }); // JS
        mrl.list.push({ code: 0, parameters: [] }); // End of Moveroute
        mrl.repeat = true; mrl.skippable = true;
        mrl.wait = false; this.forceMoveRoute(mrl);
        this._moveType = 3; // Custom move route

        _this.debug("moveToHome @", this.schedule.currentHomePos, "Moveroute now ", this._moveRoute, " was ", this._originalMoveRoute);

    };

    // Check for WEATHER schedules
    Game_Event.prototype.checkWeather = function () {

        // Is this weather schedule disabled for this event?
        if (this.isWeatherScheduleDisabled(_currentWeather)) {
            if (this.schedule["weather" + _currentWeather]) this.schedule["weather" + _currentWeather].disabled = true; return;
        } else {
            if (this.schedule["weather" + _currentWeather]) this.schedule["weather" + _currentWeather].disabled = false;
        }

        if (this.schedule.simplified) {
            if (this.schedule.home_weather == "") return;
            let wa = (this.schedule.home_weather + ",").split(",");
            let eval_script = "if ("; let tmp_id = 0;
            for (let i = 0; i < wa.length - 1; i++) {
                if (i == 0) {
                    tmp_id = Number(wa[i].replace("!", ""));
                    eval_script += (wa[i].left(1) == "!") ? "_currentWeather != " + tmp_id : "_currentWeather == " + tmp_id;
                } else {
                    tmp_id = Number(wa[i].replace("!", ""));
                    eval_script += (wa[i].left(1) == "!") ? " && _currentWeather != " + tmp_id : " || _currentWeather == " + tmp_id;
                }
            } eval_script += ") this.schedule.currentHomePos = this.schedule.homePos;";
            try {
                eval(eval_script); this.schedule.activeSchedule = -1; // Weather schedule
            } catch (e) { console.warn("Game_Event.checkWeather", eval_script, e); }
        } else {
            if (this.schedule["weather" + _currentWeather]) {
                if (this.schedule["weather" + _currentWeather]["phase" + _currentDayPhase]) {
                    this.schedule.currentHomePos = this.schedule["weather" + _currentWeather]["phase" + _currentDayPhase];
                    this.schedule.activeSchedule = -1; // Weather schedule
                }
            }
        }

    };

    // Check for WEEKDAY schedules
    Game_Event.prototype.checkWeekday = function () {

        // Is this weekday schedule disabled for this event?
        if (this.isWeekdayScheduleDisabled(_currentWeekday)) {
            if (this.schedule["wd" + _currentWeekday]) this.schedule["wd" + _currentWeekday].disabled = true; return;
        } else {
            if (this.schedule["wd" + _currentWeekday]) this.schedule["wd" + _currentWeekday].disabled = false;
        }

        if (this.schedule.simplified) {
            if (this.schedule.home_wd == "") return;
            let wa = (this.schedule.home_wd + ",").split(",");
            let eval_script = "if ("; let tmp_id = 0;
            for (let i = 0; i < wa.length - 1; i++) {
                if (i == 0) {
                    tmp_id = Number(wa[i].replace("!", ""));
                    eval_script += (wa[i].left(1) == "!") ? "_currentWeekday != " + tmp_id : "_currentWeekday == " + tmp_id;
                } else {
                    tmp_id = Number(wa[i].replace("!", ""));
                    eval_script += (wa[i].left(1) == "!") ? " && _currentWeekday != " + tmp_id : " || _currentWeekday == " + tmp_id;
                }
            } eval_script += ") this.schedule.currentHomePos = this.schedule.homePos;";
            try {
                eval(eval_script); this.schedule.activeSchedule = -2; // Weekday schedule
            } catch (e) { console.warn("Game_Event.checkWeekday", eval_script, e); }
        } else {
            if (this.schedule["wd" + _currentWeekday]) {
                if (this.schedule["wd" + _currentWeekday]["phase" + _currentDayPhase]) {
                    this.schedule.currentHomePos = this.schedule["wd" + _currentWeekday]["phase" + _currentDayPhase];
                    this.schedule.activeSchedule = -2; // Weekday schedule
                }
            }
        }

    };

    // Check for RANDOM schedule
    Game_Event.prototype.checkRandoms = function () {

        if (OcRam._menuCalled || this.schedule.simplified) return;

        const active_rnd = getRandomizedSchedule(this._mapId, this._eventId);
        if (active_rnd) {
            const schedule = active_rnd[4];
            if (schedule) {
                this.schedule.activeSchedule = schedule.index; // Random schedule
                this.schedule.rndSchedule = schedule;
                this.schedule.rndIndex = Number(active_rnd[2]);
                this.schedule.rndCount = active_rnd[3];
                this.schedule.currentHomePos = schedule["phase" + this.schedule.rndIndex];
                _this.debug("ACTIVE RANDOM SCHEDULE FOUND!! >> APPLY", active_rnd);
            } else {
                this.schedule.rndSchedule = null; // Had no randoms for this day phase...
                this.schedule.rndCount = 0; this.schedule.rndIndex = 0;
            } return;
        }

        if (this.schedule.rndSchedule) { // Active schedule already found??
            this.schedule.rndSchedule = null;
            this.schedule.rndCount = 0; this.schedule.rndIndex = 0;
            _this.debug("RANDOMIZED SCHEDULE HAS ENDED! >> Checking new one...");
        }

        // Iterate randoms (example): 1. 10 (0 to 10) // 2. 5 (10 to 15) //  3. 10 (15 to 25)
        // Total of 25% "randomness" that leaves normal schedule 75 % chance
        // Math.random() < 0.75 ? normal : random
        // 25 * Math.random() see table in begining

        let arr_randoms = []; let total_randomness = 0;
        let phase_count = 0; let pbuild = 0;

        for (let i = 0; i < 10; i++) {
            const rs = this.schedule["random" + i];
            if (rs) {
                rs.disabled = this.isRandomScheduleDisabled(i); // Is this random schedule disabled for this event?
                if (!rs.disabled && (rs.dayphase == -1 || rs.dayphase == _currentDayPhase)) {
                    rs.index = i; // Only enabled and random schedules specific to this day phase are checked.
                    arr_randoms.push([pbuild, (pbuild + (rs.probability * 100)), rs]); total_randomness += (rs.probability * 100);
                    pbuild = total_randomness;
                }
            }
        }

        if (total_randomness > 0) { // Ok we got random schedules

            // Check if it is normal schedule...
            if (100 * Math.random() > total_randomness) {
                _randomizedSchedules.push([this._mapId, this._eventId, 0, 1, null]); return;
            } const rnd_result = total_randomness * Math.random();
            let result_schedule = null;

            arr_randoms.forEach(schedule => {
                if (rnd_result > schedule[0] && rnd_result <= schedule[1]) { // This is the one!
                    result_schedule = schedule[2]; phase_count = 0;
                    for (let i = 0; i < 10; i++) {
                        const rs = result_schedule["phase" + i];
                        if (rs) { phase_count++; }
                    } this.schedule.activeSchedule = result_schedule.index; // Random schedule
                    this.schedule.rndSchedule = result_schedule;
                    this.schedule.rndCount = phase_count;
                    this.schedule.rndIndex = 0;
                    this.schedule.currentHomePos = result_schedule.phase0;
                    _randomizedSchedules.push([this._mapId, this._eventId, 0, phase_count, result_schedule]);
                    _this.debug("RANDOMIZED LONG SCHEDULE", result_schedule, rnd_result);
                }
            });

        }

    };

    // Update possible event links to this event
    Game_Event.prototype.updateLinks = function () {
        if (!this.schedule) return;
        this.schedule.linked = $gameSystem._linkedSchedules.find(
            itm => {
                return itm[0] == this._mapId && itm[1] == this._eventId;
            }
        ); this.schedule._isLinked = !!(this.schedule.linked);
        if (this.schedule._isLinked) {
            $gameSystem._linkedSchedules.remove(this.schedule._isLinked);
            _this.debug("LINKED EVENT(" + this._eventId + ") FOUND!", this.schedule.linked);
        }
    };

    // Is event linked?
    Game_Event.prototype.isLinked = function () {
        return this.schedule ? this.schedule._isLinked : false;
    };

    // Called when link is done...
    Game_Event.prototype.linkDone = function () {
        if (!this.schedule) return;
        $gameSystem._linkedSchedules.remove(this.schedule.linked);
        this.schedule.linked = null;
        this.schedule._isLinked = false;;
    };

    // Will be called automatically when weather or dayphase changes...
    Game_Event.prototype.updateSchedule = function (recursive) {

        if (!this.schedule) return; // Not a scheduled event...
        if (!$dataMap || !$gameMap) return; // has no map...
        if (this.activeSchedule > -1) return; // Exit if event has random schedule...
        // Check if it is recursive call... (only need update once per orginal call)
        if (!recursive) this.schedule.needUpdate = true;

        if (OcRam._menuCalled) { // Menu called >> do nothing...
            setTimeout(() => {
                this.updateSchedule(true);
            }, 1000); return;
        } if (this.schedule.waitForReact > 0) { // Individual react time...
            this.schedule.waitForReact--;
            setTimeout(() => {
                this.updateSchedule(true);
            }, 1000); return;
        } // IF player is interacting with this events - do not go yet!
        if ($gameMap._interpreter.eventId() == this._eventId) {
            setTimeout(() => {
                this.updateSchedule(true);
            }, 1000); return;
        }

        if (!this.schedule.needUpdate) return;
        this.schedule.needUpdate = false;

        // GET NEW HOME POSITION --------------------------------------------------------------------------------------------------------
        this.schedule.currentHomePos = this.schedule["phase" + _currentDayPhase];
        this.schedule.activeSchedule = -3; // Normal schedule
        this.checkWeekday(); this.checkWeather(); this.checkRandoms();

        _this.debug("Current home position for event (" + this._eventId + ") is:", this.schedule.currentHomePos);

        this._hasArrived = false; this._moveToHome = false; // Reset scheduled commands

        // 1st is event linked or has player JUST transfered? ---------------------------------------------------------------------------
        if (this.isLinked()) { // If is linked... move event to start point and set _moveToHome flag "on"
            if (this.schedule.simplified && !this.schedule.currentHomePos && this.schedule.aPos) {
                this.schedule.currentHomePos = [this.schedule.aPos[0], this.schedule.aPos[1]];
            } this._pageIndex = -2;
            if (this.schedule.simplified) {
                this.updateSimpleSwitches(true);
            } else { // Complex schedule
                updateEventScheduleSwitches(this._mapId, this._eventId);
            } return; // < No further execution >
        } else {
            if (OcRam._justTransfered) { // Since player is just transfered here... insta move events to their corresponding locations.
                let active = !this.schedule.currentHomePos;
                const simple = this.schedule.simplified;
                const a_pos = (simple && active && this.schedule.aPos);
                if (a_pos) {
                    this.schedule.currentHomePos = [this.schedule.aPos[0], this.schedule.aPos[1]];
                } if (this.schedule.currentHomePos) {
                    this.locate(this.schedule.currentHomePos[0], this.schedule.currentHomePos[1]);
                } this._pageIndex = -2; this._hasArrived = true;
                if (simple) {
                    this.updateSimpleSwitches(active);
                } else {
                    updateEventScheduleSwitches(this._mapId, this._eventId);
                } return; // < No further execution >
            }
        }

        // Player is in the area so we need to force some moveroutes... -----------------------------------------------------------------
        if (this._movingToHome) { // Event was moving to previous home pos... reset for new one.
            if (this._originalMoveRoute) {
                if (this.schedule.simplified) this._moveRouteForcing = false;
                this.restoreMoveRoute(); this._moveRouteIndex = 0;
            } this._movingToHome = false;
        }

        if (this.schedule.currentHomePos) {
            if (this.isHomePosition()) { // Already at "home pos"
                this._pageIndex = -2; this._hasArrived = true;
                if (this.schedule.simplified) { // SIMPLE SCHEDULE: Active page = B
                    this.updateSimpleSwitches(false);
                } else { // COMPLEX SCHEDULE: PAGE corresponding to CURRENT day phase
                    updateEventScheduleSwitches(this._mapId, this._eventId);
                }
            } else { // Gotta find my home...
                this._pageIndex = -2; this._moveToHome = true;
                if (this.schedule.simplified) { // SIMPLE SCHEDULE: Going home...
                    this.updateSimpleSwitches(true);
                } else { // COMPLEX SCHEDULE: PAGE corresponding to CURRENT day phase
                    updateEventScheduleSwitches(this._mapId, this._eventId);
                }
            }
        } else { // No current home position - It's active >> CHECK FOR "aPos"! PAGE A
            if (this.schedule.simplified) {
                if (this.schedule.aPos) {
                    if (this._x != this.schedule.aPos[0] || this._y != this.schedule.aPos[1]) {
                        this.schedule.currentHomePos = [this.schedule.aPos[0], this.schedule.aPos[1]];
                        this.setTransparent(true); this._pageIndex = -2; this._moveToHome = true;
                    }
                } else {
                    this._pageIndex = -2; this._hasArrived = true;
                } this.updateSimpleSwitches(true);
            } else {
                this._pageIndex = -2; this._hasArrived = true;
                updateEventScheduleSwitches(this._mapId, this._eventId);
                _this.debug("COMPLEX SCHEDULE HAD NO CURRENT HOMEPOS!", this, "args:", arguments);
            }
        }

    };
    
    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    // - No overrides -

    // ------------------------------------------------------------------------------
    // OcRam_Core "must overrides"
    // ==============================================================================
    let _NPCSchedulesLoaded = false;
    this.clearPluginData = () => {
        _scheduleReacting = {
            global: Number(this.parameters['Schedule reacting']),
            defaultWeather: Number(this.parameters['Weather reacting'])
        }; _scheduledEvents = []; _randomizedSchedules = [];
    }; this.loadPluginData = gs => {
        this.clearPluginData(); _NPCSchedulesLoaded = true;
        _scheduleReacting = gs._scheduleReacting;
        _randomizedSchedules = gs._randomizedSchedules || [];
        if (!_scheduleReacting) {
            _scheduleReacting = { // If _scheduleReacting was nothing get plugin parameters...
                global: Number(this.parameters['Schedule reacting']),
                defaultWeather: Number(this.parameters['Weather reacting'])
            };
        } 
    }; this.savePluginData = gs => {
        gs._scheduleReacting = OcRam.deepCopy(_scheduleReacting);
        gs._scheduledEvents = OcRam.deepCopy(_scheduledEvents);
        gs._randomizedSchedules = OcRam.deepCopy(_randomizedSchedules);
    }; this.onMapStart = sm => {
        if (_NPCSchedulesLoaded) {
            _NPCSchedulesLoaded = false;
            $gameSystem._scheduledEvents.forEach(e => { // Re-reference all scheduled events...
                const ev = $gameMap.getEventById(e._eventId);
                if (ev) {
                    _scheduledEvents.push(ev);
                }
            }); _scheduledEvents.forEach(e => { e.hasArrived(); });
        }
    };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "setScheduleReactTime", function(args) {
        _this.debug("Plugin command: setScheduleReactTime", args); _scheduleReacting.global = Number(args.reactTime);
    });

    PluginManager.registerCommand("OcRam_" + this.name, "setWeatherReactTime", function(args) {
        _this.debug("Plugin command: setWeatherReactTime", args);
        if (args.weatherId < -3) {
            _scheduleReacting.defaultWeather = Number(args.reactTime);
        } else {
            _scheduleReacting["weather" + args.weatherId] = Number(args.reactTime);
        }
    });

}.bind(OcRam.NPC_Scheduler)());