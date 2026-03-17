//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Title_Info.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.16) alert("OcRam core v1.16 or greater is required!");

OcRam.addPlugin("Title_Info", "1.01");

/*:
 * @target MZ
 * @plugindesc v1.01 This plugin allows you to show various information in title screen (such as version, copyright etc...)!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Title_Shuffler
 * @orderBefore OcRam_Credits
 * @
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS - None
 * ============================================================================
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 *
 * @param Title infos
 * @type struct<TitleInfo>[]
 * @desc These info elements are applied to title screen.
 * @default []
 *
 * @param Padding
 * @type number
 * @decimals 0
 * @max 999
 * @min 0
 * @text Screen padding
 * @desc Screen padding / margin in pixels.
 * @default 10
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
 * This plugin will enable you to show various information in title screen!
 * Example: Your game version, Copyright info, Website and even allows JS eval!
 * Example to show RPG Maker version: "Engine v" + Utils.RPGMAKER_VERSION;
 *
 * Please note that in MV there is no font bold property in bitmap class!
 * Therefore "Bold" parameter in title info does nothing in MV.
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
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2021/12/01 v1.00 - Initial release for v1.00
 * 2022/11/11 v1.01 - RETRO plugin order check fix (for MV)
 * 
 * ----------------------------------------------------------------------------
 * RMMZ CORE function overrides (destructive) are listed here
 * ============================================================================
 * -
 */
/*~struct~TitleInfo:
 *
 * @param Align
 * @type select
 * @option Top-Left
 * @value 7
 * @option Top-Center
 * @value 8
 * @option Top-Right
 * @value 9
 * @option Bottom-Left
 * @value 1
 * @option Bottom-Center
 * @value 2
 * @option Bottom-Right
 * @value 3
 * @text Alignment
 * @desc Where this info will be drawn?
 * @default 1
 *
 * @param Text
 * @type text
 * @desc What to write? JS Eval example (RPG Maker version): Utils.RPGMAKER_VERSION;
 * @text Text
 * @default My info here
 *
 * @param ElementType
 * @type select
 * @option Text
 * @value 0
 * @option JS Eval
 * @value 1
 * @option URL
 * @value 2
 * @text Type
 * @desc Type of this element?
 * @default 0
 * 
 * @param FontFace
 * @type text
 * @desc Font face.
 * @text Font Face
 * @default rmmz-mainfont
 *
 * @param FontSize
 * @type number
 * @decimals 0
 * @max 255
 * @min 1
 * @text Font Size
 * @desc Font size.
 * @default 18
 *
 * @param Bold
 * @type boolean
 * @text Bold
 * @desc Bold font?
 * @default false
 *
 * @param Italic
 * @type boolean
 * @text Italic
 * @desc Italic font?
 * @default false
 * 
 * @param TextColor
 * @type text
 * @text Text Color
 * @desc Text color as hex RGBA.
 * @default #ffffffff
 *
 * @param OutlineColor
 * @type text
 * @text Outline Color
 * @desc Outline color as hex RGBA.
 * @default #000000aa
 *
 * @param OutlineWidth
 * @type number
 * @decimals 0
 * @max 99
 * @min 0
 * @text Outline Width
 * @desc Outline width in pixels.
 * @default 4
 *
 * @param OffsetX
 * @type number
 * @decimals 0
 * @max 999
 * @min -999
 * @text X-Offset
 * @desc X-Offset for this element.
 * @default 0
 *
 * @param OffsetY
 * @type number
 * @decimals 0
 * @max 999
 * @min -999
 * @text Y-Offset
 * @desc Y-Offset for this element.
 * @default 0
 * 
 * @
~*/ // End of structs

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _padding = Number(this.parameters['Padding'] || 0);
    const _titleInfosRaw = OcRam.getJSON(this.parameters['Title infos']) || [];
    const _titleInfos = [];
    _titleInfosRaw.forEach(tl => {
        const json_info = JSON.parse(tl);
        json_info.Align = Number(json_info.Align || 1);
        json_info.FontSize = Number(json_info.FontSize || 18);
        json_info.Bold = OcRam.getBoolean(json_info.Bold);
        json_info.Italic = OcRam.getBoolean(json_info.Italic);
        json_info.OutlineWidth = Number(json_info.OutlineWidth || 0);
        json_info.OffsetX = Number(json_info.OffsetX || 0);
        json_info.OffsetY = Number(json_info.OffsetY || 0);
        json_info.ElementType = Number(json_info.ElementType || 0);
        _titleInfos.push(json_info);
    });

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    
    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================
    this.extend(TouchInput, "_onLeftButtonDown", function (event) {
        _this["TouchInput__onLeftButtonDown"].apply(this, arguments);
        if (!OcRam.scene() || !OcRam.scene().isTitle()) return;
        _titleInfos.forEach(ti => {
            if (ti.ElementType == 2) {
                if (event.pageY > ti.y && event.pageY < ti.y + ti.FontSize) {
                    if (event.pageX > ti.x && event.pageX < ti.x + Graphics.width * 0.333) {
                        window.open(ti.Text, "_blank");
                    };
                }
            }
        });
    });

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================

    // Already declared in OcRam_Core, but now this function actually does something!
    // Therefore this ain't actually RMMZ function override :)
    Scene_Title.prototype.drawTitleInfo = function () {

        const bitmap = this._gameTitleSprite.bitmap;

        _this.debug("_titleInfos:", _titleInfos);

        _titleInfos.forEach(ti => { // Loop title info elements defined in plugin parameters.
            const top = ti.Align == 7 || ti.Align == 8 || ti.Align == 9;
            const x = _padding;
            const y = top ? _padding : Graphics.height - (ti.FontSize) - _padding;
            ti.x = ti.Align == 7 || ti.Align == 1 ? _padding : ti.Align == 8 || ti.Align == 2 ? Graphics.width * 0.333 : Graphics.width * 0.666;
            ti.y = y;
            const maxWidth = Graphics.width - x * 2;
            let evalled_text = "";
            if (ti.ElementType == 1) {
                try { // Using JS Eval! Always catch errors!
                    evalled_text = eval(ti.Text);
                } catch (e) { // Shows error as text in this element
                    evalled_text = e.message;
                }
            } const text = ti.ElementType == 1 ? evalled_text : ti.Text;
            const align = ti.Align == 7 || ti.Align == 1 ? "left" : ti.Align == 9 || ti.Align == 3 ? "right" : "center";
            bitmap.fontFace = ti.FontFace;
            bitmap.textColor = ti.TextColor;
            bitmap.outlineColor = ti.OutlineColor;
            bitmap.outlineWidth = ti.OutlineWidth;
            bitmap.fontSize = ti.FontSize;
            bitmap.fontBold = ti.Bold;
            bitmap.fontItalic = ti.Italic;
            bitmap.drawText(text, x + ti.OffsetX, y + ti.OffsetY, maxWidth, ti.FontSize, align);
        });

    };

    // ------------------------------------------------------------------------------
    // OcRam_Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { };
    this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => { };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };
    this.onDatabaseLoaded = dm => { };

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================

}.bind(OcRam.Title_Info)());