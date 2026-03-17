//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Audio.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.13) alert("OcRam core v1.13 or greater is required!");

OcRam.addPlugin("Audio", "1.03");

/*:
 * @target MZ
 * @plugindesc v1.03 This plugin provides dynamic sound positioning + unlimited BGS channels 
 * for your RPG Maker MZ/MV -projects.
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Time_System
 * @orderBefore OcRam_Local_Coop
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command clearAEX
 * @text Clear AEX
 * @desc Clear AEX data from desired event.
 *
 * @arg eventId
 * @type number
 * @min 0
 * @default 0
 * @text Event ID
 * @desc From which event AEX data should be cleared? 0 = this event.
 *
 * @command playBGS
 * @text Play BGS
 * @desc NOTE: Each BGS has it's own channel and they are cleared on player transfer!
 *
 * @arg name
 * @type file
 * @dir audio/bgs
 * @default
 * @text BGS Name
 * @desc Name of the BGS file.
 *
 * @arg volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text Volume
 * @desc Volume of this BGS.
 *
 * @arg pitch
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Pitch
 * @desc Pitch of this BGS.
 *
 * @arg pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text Pan
 * @desc Pan of this BGS.
 *
 * @arg fade
 * @type number
 * @min 0
 * @max 120
 * @default 0
 * @text Fade time
 * @desc Fade time in seconds.
 *
 * @command stopBGS
 * @text Stop BGS
 * @desc Stops selected BGS.
 *
 * @arg name
 * @type file
 * @dir audio/bgs
 * @default
 * @text BGS Name
 * @desc Name of the BGS file.
 *
 * @arg fade
 * @type number
 * @min 0
 * @max 120
 * @default 0
 * @text Fade time
 * @desc Fade time in seconds.
 *
 * @command fadeBGS
 * @text Fade BGS
 * @desc Fades selected BGS to target volume.
 *
 * @arg name
 * @type file
 * @dir audio/bgs
 * @default
 * @text BGS Name
 * @desc Name of the BGS file.
 *
 * @arg volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text Target volume
 * @desc Target for this BGS.
 *
 * @arg fade
 * @type number
 * @min 0
 * @max 120
 * @default 0
 * @text Fade time
 * @desc Fade time in seconds.
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 *
 * @param Default Distance (BGS/SE)
 * @desc Default distance in tiles on dynamic BGS/SE?
 * @type number
 * @min 1
 * @max 255
 * @default 20
 * 
 * @param Default Radius (BGS/SE)
 * @desc Default radius in tiles on dynamic BGS/SE?
 * @type number
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Default forced play (BGS)
 * @desc Default to forced playback on AEX BGS?
 * (BGS will start playing immediatly on scene start)
 * @type boolean
 * @default true
 * 
 * @param Default autopan (BGS/SE)
 * @desc Default to autopanning? (true = Imitates surround)
 * @type boolean
 * @default true
 *
 * @param Default BGM fade
 * @desc Default fade time for BGMs in seconds
 * (will fade the BGM start and end)
 * @type number
 * @min 0
 * @max 120
 * @default 2
 *
 * @param Use linear curve
 * @desc Use linear curve on distance check instead of exponential. (Linear math is faster than curved)
 * @type boolean
 * @default true
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
 * This plugin provides dynamic sound positioning via event comments (BGS/SE).
 * 
 * You may also play multiple BGS at the same time! All played BGS buffers will
 * be saved automatically on game save. And when game is loaded saved buffers
 * will start playing where they left.
 * 
 * NOTE: All audio created with this plugin will be cleared on player transfer!
 * 
 * NOTE2: Bacause of v1.01 update BGS will play un-interrupted (like "vanilla"
 *        BGS) OcRam_Time_System BGS feature requires <bgs:> tag if you don't
 *        want to play for example outdoor BGS in indoors.
 *
 * ----------------------------------------------------------------------------
 * Comment guide for events
 * ============================================================================
 *
 * <audio:type:distance+radius:pan:forced>
 * 
 * type     = Text      {x, y, d} (x = horizontal, y = vertical, d = dynamic)
 * distance = In tiles  {number} (From how long this BGS can be heard?)
 * radius   = In tiles  {number} (Radius of 100% volume)
 * pan      = Text      {pan/true, nopan/false} (Imitate 'surround'?)
 * forced   = Text      {forced/true, ontrigger/false} (Play BGS on map start?)
 * 
 * Following examples are written with DEFAULT plugin parameters:
 *
 * BackGround Sounds (BGS) - LOOPING 
 * Comment      <audio> is same as: <audio:d:20+0:pan:forced>
 * Play BGS     fire1 (90, 100, 0)
 *
 * Comment      <audio::::ontrigger> is same as: <audio:d:20+0:pan:ontrigger>
 * Play BGS     fire1 (90, 100, 0)
 *
 * Comment      <audio:x> is same as: <audio:x:20+0:pan:forced>
 * Play BGS     sea (90, 100, 0)
 *
 * Sound Effects (SE) - NON-LOOPING
 * Comment      <audio> is same as: <audio:d:20+0:pan:forced>
 * Play SE      big_bang (90, 100, 0)
 * 
 * Below are few notes:
 *
 * NOTE 1: ALL sounds created via "playBGS" plugin command and <audio*> tags 
 *         will be erased if player is transfered to another map.
 *
 * NOTE 2: "forced" parameter will execute BGS always, when scene is loaded
 *         (even if event trigger would be "Action button" or "on touch").
 *         If BGS isn't forced, parameter will execute BGS/SE ONLY, when
 *         event is triggered as intended.
 *
 * NOTE 3: <audio> params will execute ONLY if they are on ACTIVE event page!
 *
 * ----------------------------------------------------------------------------
 * Plugin Commands
 * ============================================================================
 * MV example: OcRam_Audio/clearAEX 0
 * clearAEX     To CLEAR all buffers and AEX data in desired event
 * >> eventId   From which event AEX data should be cleared? 0 = this event.
 *
 * MV example: OcRam_Audio/playBGS Wind 60 100 0 5
 * playBGS      Play desired BGS on dynamic BGS channels
 * >> name      Name of the BGS file.
 * >> volume    Volume of this BGS. 0 to 100
 * >> pitch     Pitch of this BGS. 0 to 100
 * >> pan       Pan of this BGS. -100 to 100
 * >> fade      Fade time in seconds.
 * 
 * MV example: OcRam_Audio/stopBGS Fire 4
 * stopBGS      Stop desired BGS/ALL dynamic BGS
 * >> name      Name of the BGS file.
 * >> fade      Fade time in seconds.
 * 
 * MV example: OcRam_Audio/fadeBGS Wind 40 5
 * fadeBGS      Fade desired BGS volume to your choice!
 * >> name      Name of the BGS file.
 * >> volume    Volume of this BGS. 0 to 100
 * >> fade      Fade time in seconds.
 * 
 * ----------------------------------------------------------------------------
 * JS calls
 * ============================================================================
 * 
 * // Simple dynamic SE
 * AudioManager.playDynamicSe(event_id, se_name, distance, radius, auto_pan);
 * 
 * // Full control for dynamic SE
 * AudioManager.playSe(
 *           { name: se_name, volume: 100, pitch: 100, pan: 0 },
 *           {
 *               "type": "d",
 *               "distance": 20,
 *               "radius": 1,
 *               "pan": true,
 *               "forced": true,
 *               "started": false,
 *               "dynamic": true,
 *               "commandIndex": 0,
 *               "eventId": 1,
 *           });
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
 * COMMERCIAL USE: (Standard license: 5 EUR, No-credits license: 40 EUR)
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
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2020/09/03 v1.00 - Initial release
 * 2021/06/04 v1.01 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    "vanilla" SE/ME/BGS, BGS1 and BGS2 won't be stopped any
 *                    more on player transfer (Credits: thepsyche & gRaViJa)
 * 2021/10/21 v1.02 - Fixed bug when faded BGM with 0% vol (Credits to Cyp999)
 *                    Allow same played BGS as current BGS parameter update 
 *                    even if it's same (Credits to Foerster)
 * 2022/01/23 v1.03 - "BGS2/3" now keeps playing in battles (Credits to Oks)
 *                    
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 *     AudioManager.playBgs
 *     AudioManager.saveBgs
 *     AudioManager.fadeOutBgs
 *     AudioManager.fadeInBgs
 *     AudioManager.playSe
 *     AudioManager.stopBgs
 */

const $OcRam_emptyAudio = AudioManager.makeEmptyAudioObject(); $OcRam_emptyAudio.AEX = null;

(function () {
    
    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _defaultDistance = Number(this.parameters['Default Distance (BGS/SE)'] || 25);
    const _defaultRadius = Number(this.parameters['Default Radius (BGS/SE)'] || 0);
    const _defaultForced = OcRam.getBoolean(this.parameters['Default forced play (BGS)']);
    const _defaultAutoPan = OcRam.getBoolean(this.parameters['Default autopan (BGS/SE)']);
    const _defaultBgmFade = Number(this.parameters['Default fade (BGM)'] || 2);

    let _processedBGS = []; let _aexData = {}; let _newVolume = 0; let distCurve = null;
    AudioManager._bgsBuffers_OC = []; let _gameJustLoaded = false;

    if (OcRam.getBoolean(this.parameters['Use linear curve'])) {
        this.debug("DISTANCE CURVE:", "Linear");
        distCurve = (a, b, m) => { // Linear curve with min limit
            a--; return (a > b) ? m : Math.abs(b - a) / b;
        };
    } else {
        this.debug("DISTANCE CURVE:", "Exponential");
        distCurve = (a, b, m) => { // Exponential curve with min limit
            let c = Math.pow(2, Math.log2(b) * -(a / b));
            if (c < m) { c = m; } return c;
        };
    }

    this.makeNewAEXObject = (event_id, type, distance, radius, pan, forced) => {
        return {
            "type": type || "d",
            "distance": distance || _defaultDistance,
            "radius": radius || _defaultRadius,
            "pan": pan || _defaultAutoPan,
            "forced": forced || _defaultForced,
            "started": false,
            "dynamic": true,
            "commandIndex": 0,
            "eventId": event_id || 0,
        };
    };

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    const isInvalidBufferName = (name, bfr) => {
        return (name !== undefined && name !== null) && bfr._bgs.name !== name;
    };

    const parseComments = ev => {

        ev.eventAEXData = []; const audio_tags = ev.getOpenTags("audio");

        if (audio_tags.length > 0) {
            audio_tags.forEach(tag => {

                /* *Comment* <audio:x::0:> == <audio:x:25+0:0:pan:forced>
                ca[0] = Command index
                ca[1] = 'x', 'y', 'd' or 'bg'
                ca[2] = Distance+radius in tiles (number)
                ca[3] = Autopan
                ca[4] = Forced play on scene load */

                let ca = (tag + "::::").split(":"); let aex_obj = _this.makeNewAEXObject();

                if (ca[1] == "") ca[1] = "d";
                switch (ca[1].toLowerCase()) {
                    case "x": aex_obj.type = "x"; aex_obj.pan = true; break;
                    case "y": aex_obj.type = "y"; aex_obj.pan = false; break;
                    case "d": aex_obj.type = "d"; aex_obj.pan = true; break;
                    default: return;
                } aex_obj.dynamic = true;

                if (ca[2] == "") ca[2] = _defaultDistance + "+" + _defaultRadius;
                aex_obj.distance = parseInt((ca[2] + "+").split("+")[0], 10);
                if (isNaN(aex_obj.distance)) aex_obj.distance = _defaultDistance;
                aex_obj.radius = parseInt((ca[2] + "+").split("+")[1], 10);
                if (isNaN(aex_obj.radius)) aex_obj.radius = _defaultRadius;

                aex_obj.pan = _defaultAutoPan && aex_obj.pan;
                switch (ca[3].substr(0, 3).toLowerCase()) {
                    case "fal": case "nop": aex_obj.pan = false; break;
                    case "tru": case "pan": aex_obj.pan = true && aex_obj.type != "y"; break;
                }

                aex_obj.forced = _defaultForced;
                switch (ca[4].substr(0, 3).toLowerCase()) {
                    case "fal": case "ont": aex_obj.forced = false; break;
                    case "tru": case "for": aex_obj.forced = true; break;
                }

                aex_obj.commandIndex = Number(ca[0]);
                aex_obj.eventId = ev.eventId();
                ev.eventAEXData.push(aex_obj);

            });
        }

    };

    const validateVPP = p => { // validate volume, pitch and pan
        if (p.volume !== undefined) p.volume = p.volume.clamp(0, 100);
        if (p.pitch !== undefined) p.pitch = p.pitch.clamp(50, 150);
        if (p.pan !== undefined) p.pan = p.pan.clamp(-100, 100);
    };

    const getAEXData = source => { // Get aexData for BGS and SE
        if (!source.AEX) {
            source.AEX = _this.makeNewAEXObject();
            source.AEX.type = "bg";
            source.AEX.dynamic = false;
            source.AEX.forced = false;
            source.AEX.pan = false;
        } return source;
    };

    const clearBuffers = clear_all => {
        AudioManager._bgsBuffers_OC = AudioManager._bgsBuffers_OC.filter(function (buffer) {
            if (!!(buffer)) {
                buffer.stop(); return false;
            } else { return true; }
        }); _processedBGS = [];
        if (clear_all) {
            AudioManager._seBuffers = AudioManager._seBuffers.filter(function (buffer) {
                if (!!(buffer)) {
                    buffer.stop(); return false;
                } else { return true; }
            }); AudioManager.stopBgs(); AudioManager.stopMe();
        } else {
            AudioManager._seBuffers = AudioManager._seBuffers.filter(function (buffer) {
                if (!!(buffer)) {
                    if (buffer._se && buffer._se.AEX && buffer._se.AEX.dynamic) {
                        buffer.stop(); return false;
                    }
                } else { return true; }
            });
        }
    };

    const isInvalidBuffer = (bfr, type) => {
        if (bfr["_" + type] === undefined) return true;
        return (!bfr["_" + type].AEX.dynamic || bfr._paused || bfr._playing === false);
    };

    const updateBgsPlayerPosVsEvent = buffer => {
        if (isInvalidBuffer(buffer, "bgs")) { // AEX BG BGS
            _newVolume = (AudioManager._bgsVolume * buffer._bgs.volume) / 100;
            buffer.fadeTo_OC(1, _newVolume); return true;
        } _newVolume = 0; _aexData = this.getNewAEXData(buffer._bgs);
        _newVolume = (AudioManager._bgsVolume * _aexData.volume) / 100;
        if (_aexData.pan && buffer._bgs.AEX.pan) buffer.pan = _aexData.pan / 100;
        buffer.fadeTo_OC(1, _newVolume);
    };

    const updateSePlayerPosVsEvent = buffer => {
        if (isInvalidBuffer(buffer, "se")) return true;
        // Allow empty panner node only for NEW buffers
        if (buffer._buffer && !buffer._pannerNode) return true;
        _newVolume = 0; _aexData = this.getNewAEXData(buffer._se);
        _newVolume = (AudioManager._seVolume * _aexData.volume) / 100;
        if (!buffer._se.AEX.pan) {
            buffer.pan = buffer._se.pan;
        } else {
            if (_aexData.pan) buffer.pan = _aexData.pan / 100;
        } buffer.fadeTo_OC(1, _newVolume);
    };

    const isEventProcessed = ev_id => {
        if (_processedBGS === undefined) { _processedBGS.push(0); }
        for (let i = 0; i < _processedBGS.length; i++) {
            if (_processedBGS[i] == ev_id) {
                _this.debug("Event already processed!", _processedBGS[i]);
                return true; // Event is already processed
            }
        } return false;
    };

    const playForcedAEX = ev_id => { // Find all forced AEX tags

        let i = 0;

        $gameMap.events().forEach(ev => {
            if (!ev_id || ev_id == ev.eventId()) { // Is ok event?
                if (ev._pageIndex > -1 && !ev._erased && ev.eventAEXData) { // Is this event valid?
                    if (ev.eventAEXData.length > 0) { // Do we got AEX data?
                        i = 0; ev.page().list.forEach(item => {
                            if (item.code == 245) { // Play BGS
                                if (!isEventProcessed(ev._eventId)) {
                                    ev.eventAEXData.forEach(ev_aex_data => {
                                        if (ev_aex_data.commandIndex + 1 == i && ev_aex_data.forced) {
                                            _this.debug("PLAY FORCED BGS", item.parameters[0], ev, i);
                                            AudioManager.setupBGS_OC(item.parameters[0], ev, i);
                                            AudioManager.playBgs(item.parameters[0], 0); return;
                                        };
                                    });
                                }
                            } if (item.code == 250) { // Play SE
                                ev.eventAEXData.forEach(ev_aex_data => {
                                    if (ev_aex_data.commandIndex + 1 == i && ev_aex_data.forced) {
                                        _this.debug("PLAY FORCED SE", item.parameters[0], ev, i);
                                        AudioManager.setupSE_OC(item.parameters[0], ev, i);
                                        AudioManager.playSe(item.parameters[0]); return;
                                    };
                                });
                            } i++;
                        });
                    }
                }
            }
        });

    };

    const updateBGSBuffer_OC = (bfr, bgs, pos) => {

        if (!bgs.AEX) return false;

        let result = true;

        if ((!bfr._paused && !bfr._playing)) {
            bfr.stop(); result = false;
        } else if (bfr._bgs.name === bgs.name) {
            AudioManager._isCurrent_OC = true;
            if (bfr._paused) {
                if (pos === null) pos = bfr._bgs.pos;
                AudioManager.playBuffer_OC(null, bfr, pos);
            } else {
                AudioManager.updateBgsParameters(bgs, bfr);
            }
        } return result;

    };

    const cleanAllBuffers = () => {
        _processedBGS = []; clearBuffers(true); OcRam._menuCalled = false;
        AudioManager._bgsBuffers_OC = []; AudioManager._seBuffers_OC = []; AudioManager.stopBgs();
        AudioManager.stopMe(); AudioManager.stopBgs2(); AudioManager.stopBgs3();
    };

    this.debug("$OcRam_emptyAudio:", $OcRam_emptyAudio);

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================

    // Check player location vs. sound source
    this.getNewAEXData = sound_obj => {

        if (!sound_obj) return $OcRam_emptyAudio;

        let ev = null; let pxd = 0; let dXY = 0;
        let rv = 0; let rp = 0; let count = 0; let dr = 0;

        let ret = {
            "name": sound_obj.name,
            "pitch": sound_obj.pitch,
            "volume": 0,
            "pan": sound_obj.pan
        };

        ev = $gameMap.event(sound_obj.AEX.eventId); pxd = $gamePlayer.x - ev.x; dXY = 0;
        if (sound_obj.AEX.dynamic) {
            if (sound_obj.AEX.type != "y") dXY = Math.abs(pxd);
            if (sound_obj.AEX.type != "x") dXY += Math.abs($gamePlayer.y - ev.y);
        } dr = Number(sound_obj.AEX.distance) + Number(sound_obj.AEX.radius);

        if (dXY <= dr) {
            if (dXY < sound_obj.AEX.radius) {
                rv = sound_obj.volume * distCurve(dXY, dr, 0.001);
            } else {
                rv = sound_obj.volume * distCurve(dXY - sound_obj.AEX.radius, sound_obj.AEX.distance, 0.001);
            } if (sound_obj.AEX.pan) { // Pan only d and x AEX tags in radius
                rp += -((100 / sound_obj.AEX.distance) * pxd).clamp(-100, 100); count++;
            } if (ret.volume < rv) ret.volume = rv;
        }

        if (rp && count) rp = rp / count; ret.pan = rp;
        return ret;

    };

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================
    // By default RMMV doesn't have possibility to play several BGS at the same time
    // ...so let us create buffer for multiple BGS! (RMMZ already has _seBuffers)

    WebAudio.prototype.fadeTo_OC = function (duration, tv) {
        // Source: https://developer.mozilla.org/en-US/docs/Web/API/AudioParam
        if (this.isReady()) {
            if (this._gainNode) {
                if (isNaN(tv)) tv = 0;
                tv = Math.abs(tv) / 100; if (tv > 1) tv = 1;
                const g = this._gainNode.gain;
                const currentTime = WebAudio._context.currentTime;
                g.cancelScheduledValues(currentTime); // If already used '...ValueAtTime'
                g.setValueAtTime(this._volume, currentTime); // Set start pos
                g.linearRampToValueAtTime(tv, currentTime + duration); // Init linear fade
                this._volume = tv; // Start fade
            } else {
                this._startPlaying(); this.fadeTo_OC(duration, tv);
            }
        } else { // If WebAudio wasn't ready, attach fader to WebAudio load, which will call this function when ready.
            this.addLoadListener(function () {
                this.fadeTo_OC(duration, tv);
            }.bind(this));
        }
    };

    Game_System.prototype.playSavedBGS_OC = function () {
        AudioManager.playBgs(this._bgsOnSave);
        AudioManager._bgsBuffers_OC = [];
        let tmp_bgs = {}; _processedBGS = [];
        if (this._bgsBuffers_OC.forEach !== undefined) {
            this._bgsBuffers_OC.forEach(buffer => {
                if (buffer._bgs.AEX) {
                    tmp_bgs = buffer._bgs;
                    if (!tmp_bgs.AEX.forced) { // Play only non-forced BGS!
                        _processedBGS.push(tmp_bgs.AEX.eventId);
                        AudioManager.playBgs(tmp_bgs, buffer.pos);
                    }
                }
            });
        }
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    // Play BGS & SE commands
    this.extend(Game_Interpreter, "command245", function () {
        AudioManager.setupBGS_OC(this._list[this._index].parameters[0], this.event(), this._index);
        return _this["Game_Interpreter_command245"].apply(this, arguments);
    });

    this.extend(Game_Interpreter, "command250", function () {
        AudioManager.setupSE_OC(this._list[this._index].parameters[0], this.event(), this._index);
        return _this["Game_Interpreter_command250"].apply(this, arguments);
    });

    // If moving event has AEX >> update it...
    this.extend(Game_CharacterBase, "refreshBushDepth", function () {
        _this["Game_CharacterBase_refreshBushDepth"].apply(this, arguments);
        if (this.eventAEXData) AudioManager.updateAEX_OC();
    });

    // New page >> Check for forced audio
    this.extend(Game_Event, "setupPage", function () {
        _this["Game_Event_setupPage"].apply(this, arguments); parseComments(this);
        if (!_gameJustLoaded && !OcRam._menuCalled) { // Play forced AEX sound
            AudioManager.clearAEXData(this._eventId);
            if (!isEventProcessed(this.eventId())) playForcedAEX(this.eventId());
        }
    });

    // Clear buffers when transfered (called before Scene_Map.start)
    this.extend(Game_Player, "performTransfer", function () {
        if (!_gameJustLoaded) clearBuffers();
        _this["Game_Player_performTransfer"].apply(this, arguments);
    });

    // Update sound position when increaseSteps is triggered (player moves 1 tile)
    this.extend(Game_Player, "increaseSteps", function () {
        AudioManager.updateAEX_OC(); _this["Game_Player_increaseSteps"].apply(this, arguments);
    });

    if (Imported.OcRam_Local_Coop) { // SHOULD BE CHECKED AT LOCAL_COOP
        this.extend(Game_Follower, "refreshBushDepth", function () {
            AudioManager.updateAEX_OC(); _this["Game_Follower_refreshBushDepth"].apply(this, arguments);
        });
    }

    this.extend(Game_System, "onAfterLoad", function () {
        cleanAllBuffers();
        _this.debug("_gameJustLoaded -flag set to true!"); _gameJustLoaded = true;
        _this["Game_System_onAfterLoad"].apply(this, arguments); this.playSavedBGS_OC();
    });

    this.extend(Game_System, "replayWalkingBgm", function () {
        this._walkingBgm.volume = AudioManager._savedVol_OC;
        _this["Game_System_replayWalkingBgm"].apply(this, arguments);
    });

    this.extend(AudioManager, "saveBgm", function () {
        if (this._bgmBuffer != null) {
            this._savedVol_OC = parseInt(this._bgmBuffer._volume * 100);
        } else {
            this._savedVol_OC = 0;
        } return _this["AudioManager_saveBgm"].apply(this, arguments);
    });

    this.extend(AudioManager, "replayBgm", function (bgm) {
        bgm.volume = this._savedVol_OC; _this["AudioManager_replayBgm"].apply(this, arguments);
    });

    this.extend(AudioManager, "updateBgsParameters", function (bgs, buffer) {
        if (buffer !== undefined) {
            if (buffer._bgs.AEX.dynamic) { // this is "dynamic" sound
                let new_bgs = (!bgs) ? getAEXData(buffer._bgs) : getAEXData(bgs);
                new_bgs.pitch = new_bgs.pitch || 100;
                new_bgs = _this.getNewAEXData(buffer._bgs);
                this.updateBufferParameters(buffer, this._bgsVolume, new_bgs);
            } else { // AEX.type == "BG"
                _this["AudioManager_updateBgsParameters"].apply(this, arguments);
            }
        } else { // Current BGS, BGS2/3 and BG
            _this["AudioManager_updateBgsParameters"].apply(this, arguments);
        }
    });

    this.extend(AudioManager, "playBgm", function (bgm, pos) {
        _this["AudioManager_playBgm"].apply(this, arguments);
        if (bgm.name != $gameSystem.battleBgm().name) {
            if (_defaultBgmFade && this._bgmBuffer) this._bgmBuffer.fadeIn(_defaultBgmFade);
        }
    });

    // Fix to keep BGS2 and 3 playing in battles
    this.extend(Scene_Map, "stopAudioOnBattleStart", function () {
        AudioManager._keepBGS23 = true; _this["Scene_Map_stopAudioOnBattleStart"].apply(this, arguments);
    });

    this.extend(Scene_Battle, "start", function () {
        _this["Scene_Battle_start"].apply(this, arguments); AudioManager._keepBGS23 = false;
    });

    // ------------------------------------------------------------------------------
    // AudioManager extensions and overwrites
    // ==============================================================================
    // By default RMMV doesn't have possibility to play several BGS at the same time
    // ...so let us create buffer for multiple BGS! (RMMZ already has _seBuffers)

    (function () {

        // ------------------------------------------------------------------------------
        // New methods
        // ==============================================================================

        this.setupBGS_OC = (bgs_obj, ev, cmd_index) => {
            if (!ev) return; validateVPP(bgs_obj); const eid = ev.eventId();
            if (!bgs_obj.AEX || !isEventProcessed(eid)) { // New BGS >> push it to array and set AEX data
                if (ev && bgs_obj.name) {
                    _processedBGS.push(eid);
                    ev.eventAEXData.forEach(ev_aex_data => {
                        if (ev_aex_data.commandIndex + 1 == cmd_index) {
                            bgs_obj.AEX = ev_aex_data; _this.debug("New BGS (setupBGS_OC)", bgs_obj); return;
                        };
                    });
                }
            }
        };

        this.prepareCurrentBGS_OC = bgs => {
            if (this._currentBgs) { // Stop old BGS and start new BGS, only if BGS is changed!
                const new_bgs = this._currentBgs.name != bgs.name;
                if (this._bgsBuffer && new_bgs) {
                    this._bgsBuffer.stop();
                    this._bgsBuffer = null;
                    this._currentBgs = null;
                } this._currentBgs = bgs;
                if (bgs.name) {
                    if (new_bgs) {
                        this._bgsBuffer = this.createBuffer('bgs/', bgs.name);
                        this.updateBgsParameters(bgs);
                        this._bgsBuffer.play(true, 0);
                        _this.debug("Current BGS is now ", bgs);
                    } else { this.updateBgsParameters(bgs); }
                }
            } else { // No current BGS playing... Create and play
                this._currentBgs = bgs;
                if (bgs.name) {
                    this._bgsBuffer = this.createBuffer('bgs/', bgs.name);
                    this.updateBgsParameters(bgs);
                    this._bgsBuffer.play(true, 0);
                } _this.debug("Current BGS is now ", bgs);
            }
        };

        this.clearAEXData = ev_id => {
            if (!ev_id) return;
            this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
                if (buffer._bgs.AEX && buffer._bgs.AEX.eventId == ev_id) {
                    buffer._bgs.AEX.started = false; buffer.stop(); _processedBGS.remove(ev_id); return false;
                } else { return true; }
            });
        };

        this.setupSE_OC = (se_obj, ev, cmd_index) => {
            validateVPP(se_obj);
            if (ev && se_obj.name) {
                ev.eventAEXData.forEach(ev_aex_data => {
                    if (ev_aex_data.commandIndex + 1 == cmd_index) {
                        se_obj.AEX = ev_aex_data; _this.debug("New SE (setupSE_OC)", se_obj); return;
                    };
                });

            }
        };

        this.createAndPlayBGSBuffer_OC = (bgs, pos, fade) => {
            if (bgs.name && bgs.AEX) {
                if (!bgs.AEX.forced || (bgs.AEX.forced && !bgs.AEX.started)) {
                    bgs.AEX.started = true; // If was 'forced' BGS mark it as started so it won't be started again...
                    let buffer = this.createBuffer("bgs/", bgs.name);
                    if (bgs.AEX.type != "bg") {
                        buffer._bgs = getAEXData(bgs);
                    } else {
                        buffer._bgs = bgs; //buffer._volume = 0;
                    } buffer._bgs.pos = pos || 0;
                    this.playBuffer_OC(bgs, buffer, pos, fade);
                    this._bgsBuffers_OC.push(buffer);
                }
            }
        };

        this.createAndPlaySeBuffer_OC = (se, aex_data) => {
            let buffer = this.createBuffer("se/", se.name);
            if (aex_data) {
                buffer._se = se; buffer._se.AEX = aex_data;
            } else {
                buffer._se = getAEXData(se);
            } buffer._pitch = se.pitch / 100;
            buffer._volume = ((this._seVolume / 100) * se.volume) / 100;
            updateSePlayerPosVsEvent(buffer);
            buffer.play(false); this._seBuffers.push(buffer);
        };

        this.fadeToBgs_OC = (name, fade, tv) => {
            tv = tv.clamp(0, 100); // Make target volume valid
            this._bgsBuffers_OC.forEach(buffer => {
                if (isInvalidBufferName(name, buffer)) {
                    return true;
                } else if (!buffer._paused && buffer._playing) {
                    if (fade === null) fade = 1;
                    buffer._bgs.volume = tv;
                    buffer.fadeTo_OC(fade, tv);
                }
            });
        };

        // Play desired BGS buffer
        this.playBuffer_OC = (bgs_obj, bfr, pos, fade) => {
            this.updateBgsParameters(bgs_obj, bfr);
            bfr._playing = true; bfr._paused = false;
            bfr.play(true, pos || 0); if (fade && fade > 0) {
                bfr._volume = 0; bfr.fadeTo_OC(fade, Number(bgs_obj.volume));
            }
        };

        // Bound to Scene_Map and called on increaseSteps
        this.updateAEX_OC = () => {
            this.updateSeAEX(); this.updateBgsAEX();
        };

        this.updateBgsAEX = () => {
            this._bgsBuffers_OC.forEach(buffer => {
                if (buffer._bgs && buffer._bgs.AEX && buffer._bgs.AEX.dynamic) updateBgsPlayerPosVsEvent(buffer);
            });
        };

        this.updateSeAEX = () => {
            this._seBuffers.forEach(buffer => {
                if (buffer.AEX && buffer.AEX.dynamic) updateSePlayerPosVsEvent(buffer);
            });
        };

        // ------------------------------------------------------------------------------
        // Overrides
        // ==============================================================================

        this.playBgs = (pbgs, pos, fade) => {

            this._isCurrent_OC = false;

            let bgs = {
                name: pbgs.name,
                volume: pbgs.volume,
                pitch: pbgs.pitch,
                pan: pbgs.pan
            };

            if (pbgs.AEX) bgs.AEX = {
                type: pbgs.AEX.type,
                distance: pbgs.AEX.distance,
                radius: pbgs.AEX.radius,
                pan: pbgs.AEX.pan,
                forced: pbgs.AEX.forced,
                started: pbgs.AEX.started,
                dynamic: pbgs.AEX.dynamic,
                commandIndex: pbgs.AEX.commandIndex,
                eventId: pbgs.AEX.eventId
            };

            if (!bgs.AEX) {
                this.prepareCurrentBGS_OC(bgs); return;
            }

            if (bgs.AEX.type != "bg") {
                if (bgs.AEX.forced && pos) return; // START FORCED ONLY ONCE!
                if (!bgs.AEX.forced) AudioManager.clearAEXData(bgs.AEX.eventId); // CLEAR AEX IF NOT FORCED!
            }

            if (bgs && bgs.name) {
                if (pos === undefined) pos = (!!(bgs.startTime)) ? bgs.startTime : null;
                this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
                    return updateBGSBuffer_OC(buffer, bgs, pos);
                }); if (!this._isCurrent_OC || bgs.AEX.type != 'bg') this.createAndPlayBGSBuffer_OC(bgs, pos, fade);
            }

        };

        this.stopBgs = (preserve_buffers, name) => {

            if (name === undefined || name == "*") { // Erase all
                if (!preserve_buffers) {
                    _processedBGS = [];
                    this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
                        if (!!(buffer)) {
                            buffer.stop(); return false;
                        } else { return true; }
                    });
                    this._seBuffers = this._seBuffers.filter(function (buffer) {
                        if (!!(buffer)) {
                            buffer.stop(); return false;
                        } else { return true; }
                    }); _processedBGS = []; this.stopMe(); OcRam._menuCalled = false;
                    this._bgsBuffers_OC = []; this._seBuffers_OC = []; this.stopMe();
                    if (!this._keepBGS23) { this.stopBgs2(); this.stopBgs3(); }
                } if (this._bgsBuffer) { // Stop only current BGS
                    this._bgsBuffer.stop();
                } this._bgsBuffer = null; this._currentBgs = null;
            } else { // Erase by name
                this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
                    if (buffer._bgs.name == name) {
                        buffer.stop(); return false;
                    } else { return true; }
                });
            }

        };

        this.saveBgs1 = () => {
            if (this._currentBgs) {
                const bgs = this._currentBgs;
                return {
                    name: bgs.name,
                    volume: bgs.volume,
                    pitch: bgs.pitch,
                    pan: bgs.pan,
                    pos: this._bgsBuffer ? this._bgsBuffer.seek() : 0
                };
            } else {
                return this.makeEmptyAudioObject();
            }
        };

        this.saveBgs = name => {
            let bgs_buffers = [];
            this._bgsBuffers_OC.forEach(buffer => {
                if (isInvalidBufferName(name, buffer)) return true;
                buffer._bgs.pos = buffer.seek() || 0;
                _aexData = getAEXData(buffer._bgs);
                bgs_buffers.push(_aexData);
            });
            if (bgs_buffers.length <= 0) {
                bgs_buffers[0] = $OcRam_emptyAudio;
            } return bgs_buffers;
        };

        this.fadeOutBgs = (duration, name) => {
            if (name) { // Fadeout specific BGS
                this._bgsBuffers_OC.forEach(buffer => {
                    if (isInvalidBufferName(name, buffer) || buffer._paused) {
                        //return true;
                    } else if (buffer._bgs) {
                        if (duration === null) duration = 1;
                        buffer._playing = false; buffer.fadeOut(duration);
                    }
                });
            } else { // 'Vanilla' fadeout command
                if (this._bgsBuffer && this._currentBgs) {
                    this.fadeOutBgs(duration, this._currentBgs.name);
                    this._bgsBuffer.fadeOut(duration);
                    this._currentBgs = null;
                }
            }
        };

        this.fadeInBgs = (duration, name) => {
            if (name) { // Fadeout specific BGS
                this._bgsBuffers_OC.forEach(buffer => {
                    if (isInvalidBufferName(name, buffer)) { return true; }
                    buffer._playing = true; buffer._paused = false;
                    buffer._bgs.volume = 0; buffer.fadeIn(duration);
                });
            } else { // 'Vanilla' fadein command
                if (this._bgsBuffer && this._currentBgs) {
                    this._bgsBuffer.fadeIn(duration);
                }
            }
        };

        this.playSe = (se, aex_data) => {
            if (se.name) {
                this._seBuffers = this._seBuffers.filter(function (audio) {
                    return audio.isPlaying();
                }); this.createAndPlaySeBuffer_OC(se, aex_data);
            }
        };

        this.playDynamicSe = (event_id, se_name, distance, radius, auto_pan) => {
            this.playSe(
                { name: se_name, volume: 100, pitch: 100, pan: 0 },
                {
                    "type": "d",
                    "distance": distance || 20,
                    "radius": radius || 1,
                    "pan": auto_pan || true,
                    "forced": true,
                    "started": false,
                    "dynamic": true,
                    "commandIndex": 0,
                    "eventId": event_id || 0,
                }
            );
        };

    }.bind(AudioManager))();

    // ------------------------------------------------------------------------------
    // OcRam_Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => {
        cleanAllBuffers();
    };

    this.loadPluginData = gs => { /* Use private */ };

    this.savePluginData = gs => {
        if (AudioManager._currentBgm && AudioManager._bgmBuffer) {
            AudioManager._currentBgm.volume = AudioManager._bgmBuffer._volume * 100;
        } gs._bgsBuffers_OC = AudioManager._bgsBuffers_OC; // We got our own BGS buffer...
        gs._bgsOnSave = AudioManager.saveBgs1();
        this.debug("savePluginData", gs);
    };

    // On map start >> play forced AEX tags // Triggered after onMapLoaded
    this.onMapStart = sm => {
        if (!OcRam._menuCalled) {
            this.debug("Scene_Map.start() - should be called only when new map!");
            $gameMap.events().forEach(ev => {
                parseComments(ev);
            }); playForcedAEX(); // Play forced AEX sounds
            AudioManager.updateBgsAEX(); _gameJustLoaded = false;
        }
    };

    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };

    // ----------------------------------------------------------------------------
    // Plugin commands
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "clearAEX", function (args) {
        _this.debug("Plugin command: clearAEX", args);
        if (Number(args.eventId) < 1) {
            AudioManager.clearAEXData(Number(this._eventId));
        } else {
            AudioManager.clearAEXData(Number(args.eventId));
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "playBGS", function (args) {

        _this.debug("Plugin command: playBGS", args);

        const bgs_name = ('' + args.name);

        let this_bgs = { name: bgs_name, volume: Number(args.volume), pitch: Number(args.pitch), pan: Number(args.pan) };
        this_bgs.AEX = {
            "type": "bg",
            "distance": 0,
            "radius": 0,
            "pan": false,
            "forced": false,
            "started": false,
            "dynamic": false,
            "commandIndex": 0,
            "eventId": 0
        }; AudioManager.playBgs(this_bgs, 0, Number(args.fade));

    });

    PluginManager.registerCommand("OcRam_" + this.name, "stopBGS", function (args) {
        _this.debug("Plugin command: stopBGS", args); const bgs_name = ('' + args.name);

        if (Number(args.fade) == 0) {
            if (!(args.name + '')) { // Stop all
                _processedBGS = []; AudioManager.stopBgs();
            } else { // Stop by name
                AudioManager.stopBgs(false, bgs_name);
            }
        } else {
            if (!(args.name + '')) { // Fade all
                AudioManager._bgsBuffers_OC.forEach(buffer => { });
            } else { // Fade by name
                AudioManager.fadeOutBgs(Number(args.fade), bgs_name);
            }
        }
        
    });

    PluginManager.registerCommand("OcRam_" + this.name, "fadeBGS", function (args) {
        _this.debug("Plugin command: fadeBGS", args); const bgs_name = ('' + args.name);
        if (bgs_name) {
            AudioManager.fadeToBgs_OC(bgs_name, Number(args.fade), Number(args.volume));
        }
    });

}.bind(OcRam.Audio)());