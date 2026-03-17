//=============================================================================
// LZ Plugin - Change Screen Resolution Ingame (MZ)
// LZ_ChangeScreenRes.js
// by Lanzy
// Date: June 6, 2022
//=============================================================================

var Imported = Imported || {};
Imported.LZ_ChangeScreenRes = true;

var LZ = LZ || {};
LZ.ChangeScreenRes = LZ.ChangeScreenRes || {};
LZ.ChangeScreenRes.version = 1.00;

console.log(`LZ_ChangeScreenRes.js v${LZ.ChangeScreenRes.version} LOADED`);

/*:
 *
 * @plugindesc v1.00 This plugin for MZ enables to change the screen resolution during the game.
 * @author Lanzy
 *
 * @param ---Screen---
 *
 * @param Display Config default
 * @parent ---Screen---
 *
 * @param Width
 * @parent Display Config default
 * @type number
 * @desc This must be same as Screen width in System 2 settings.
 * @default 816
 *
 * @param Height
 * @parent Display Config default
 * @type number
 * @desc This must be same as Screen height in System 2 settings.
 * @default 624
 *
 * @param Display Config A
 * @parent ---Screen---
 *
 * @param Config A to options
 * @parent Display Config A
 * @type boolean
 * @on YES
 * @off NO
 * @desc Add to menu options?
 * NO - false   YES - true
 * @default true
 *
 * @param WidthA
 * @parent Display Config A
 * @type number
 * @desc Default is 1104 (native resolution).
 * @default 1104
 *
 * @param HeightA
 * @parent Display Config A
 * @type number
 * @desc Default is 624 (native resolution).
 * @default 624
 *
 * @param Display Config B
 * @parent ---Screen---
 *
 * @param Config B to options
 * @parent Display Config B
 * @type boolean
 * @on YES
 * @off NO
 * @desc Add to menu options?
 * NO - false   YES - true
 * @default true
 *
 * @param WidthB
 * @parent Display Config B
 * @type number
 * @desc Default is 1280.
 * @default 1280
 *
 * @param HeightB
 * @parent Display Config B
 * @type number
 * @desc Default is 720.
 * @default 720
 *
 * @param Display Config C
 * @parent ---Screen---
 *
 * @param Config C to options
 * @parent Display Config C
 * @type boolean
 * @on YES
 * @off NO
 * @desc Add to menu options?
 * NO - false   YES - true
 * @default true
 *
 * @param WidthC
 * @parent Display Config C
 * @type number
 * @desc Default is 1920.
 * @default 1920
 *
 * @param HeightC
 * @parent Display Config C
 * @type number
 * @desc Default is 1080.
 * @default 1080
 *
 * @help
 * =============================================================================
 * Github
 * =============================================================================
 *
 * https://github.com/CodeRedLancer/LZ_ChangeScreenRes.git
 *
 * =============================================================================
 * Introduction
 * =============================================================================
 *
 * This gives the options and convencience of changing screen resolutions ingame,
 * while not having to worry about hard coding the resolution. Also a nice feature
 * if you want to test the screen resolution compatibilies in your game without
 * having to restart and change screen resolutions everytime.
 *
 * In total you can use up to 4 different screen resolutions. The default
 * resolution, which is set in the System 2 config in MZ is selected by default.
 * There is no restriction on setting the screen resolution. MZ is the limit
 * however, I'm sure there are boundaries.
 *
 * Note: Changing the game resolution ingame will keep the resolution on the next
 * game start. Like with other audio or game options, the screen resolution is
 * also saved in the config files.
 *
 * =============================================================================
 * How to use
 * =============================================================================
 *
 * Example:
 * Config A to options - Whether or not Config A should be shown in the game options
 * Width - Screen width in pixels
 * Height - Screen height in pixels
 *
 * Note:
 *  - Default Config is always seen in the ingame options.
 *  - Default screen size in System 2 settings MUST be same as in Display Config
 *    default in the plugin setting. Otherwise ingame default screen size won't
 *    match the screen size shown on the option button.
 *
*/

//=============================================================================
// Parameter Configuration
//=============================================================================

LZ.Parameters = PluginManager.parameters('LZ_ChangeScreenRes');
LZ.Param = LZ.Param || {};

//=============================================================================
// Screen Config
//=============================================================================

LZ.Param.Screen = LZ.Param.Screen || {};
LZ.Param.Screen.sizes = LZ.Param.Screen.sizes || [];

defaultSize = {
    name:"defaultSize",
    show:"true",
    selected:true,
    width:Number(LZ.Parameters['Width']),
    height:Number(LZ.Parameters['Height'])
};

size1 = {
    name:"size1",
    show:String(LZ.Parameters['Config A to options']),
    selected:false,
    width:Number(LZ.Parameters['WidthA']),
    height:Number(LZ.Parameters['HeightA'])
};

size2 = {
    name:"size2",
    show:String(LZ.Parameters['Config B to options']),
    selected:false,
    width:Number(LZ.Parameters['WidthB']),
    height:Number(LZ.Parameters['HeightB'])
};

size3 = {
    name:"size3",
    show:String(LZ.Parameters['Config C to options']),
    selected:false,
    width:Number(LZ.Parameters['WidthC']),
    height:Number(LZ.Parameters['HeightC'])
};

LZ.Param.Screen.sizes.push(
    defaultSize, //default must be first in list
    size1,
    size2,
    size3
);

//=============================================================================
// Configmanager
//=============================================================================

LZ.ConfigManager = LZ.ConfigManager || {};

LZ.ConfigManager.defineScreenProperty = function(propertyName) {
    Object.defineProperty(ConfigManager, propertyName, {
        get: function() {
            let Size = {};
            let sizes = LZ.Param.Screen.sizes;
            for (let i = 0; i < sizes.length; i++) {
                if (sizes[i].name == propertyName) {
                    Size = sizes[i];
                    return {width: Size.width, height: Size.height, selected:Size.selected};
                }
            }
        },
        set: function(value) {
            if (value.selected) {
                Graphics.resize(value.width, value.height);
                ConfigManager.adjustBoxSize();
                ConfigManager.adjustWindow();
            }
        },
        configurable: true
    });
};

LZ.ChangeScreenRes.restartSceneOptions = function() {
    if (SceneManager._scene !== null &&
        SceneManager._scene.constructor.name === "Scene_Options") {
        SceneManager.push(SceneManager._previousClass);
        do {
            if (SceneManager._scene.isStarted()) {
                SceneManager.pop();
                break;
            }
        } while (true);
    }
};

//Defines all screen config properties to ConfigManager
(function () {
    let sizes = LZ.Param.Screen.sizes;
    for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].show === 'true') {
            LZ.ConfigManager.defineScreenProperty(sizes[i].name);
        }
    }
})();

ConfigManager.adjustBoxSize = function() {
    const boxMargin = 4;
    Graphics.boxWidth = Graphics._width - boxMargin * 2;
    Graphics.boxHeight = Graphics._height - boxMargin * 2;
}

ConfigManager.adjustWindow = function() {
    Scene_Boot.prototype.adjustWindow.call(this);
}

LZ.ConfigManager.makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    const config = LZ.ConfigManager.makeData.call(this);
    let sizes = LZ.Param.Screen.sizes;
    let name = "";
    for (let i = 0; i < sizes.length; i++) {
        name = sizes[i].name;
        if (sizes[i].show === 'true' || name == "defaultSize") {
            config[name] = this[name];
        }
    }
    return config;
};

//defaultSize is always selected when nothing else saved
LZ.ConfigManager.applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    LZ.ConfigManager.applyData.call(this, config);
    let sizes = LZ.Param.Screen.sizes;
    let name = "";
    for (let i = 0; i < sizes.length; i++) {
        name = sizes[i].name;
        if (sizes[i].show === 'true') {
            this[name] = this.readScreenSize(config, name);
        }
    }
};

ConfigManager.readScreenSize = function(config, name) {
    if (name in config) {
        return config[name];
    } else {
        return LZ.Param.Screen.sizes[0]; //default must be on index 0
    }
}

//=============================================================================
// Scenes
//=============================================================================

LZ.Scene = LZ.Scene || {};

LZ.Scene.Boot_resizeScreen = Scene_Boot.prototype.resizeScreen;
Scene_Boot.prototype.resizeScreen = function() {
    ConfigManager.load(); //loading current screen size instantly resizes screen
};

LZ.Scene.Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
    let sizes = LZ.Param.Screen.sizes;
    let amountOfVisibleScreenSizes = 0;
    for (let i = 0; i < sizes.length; i++) {
        amountOfVisibleScreenSizes += sizes[i].show === 'true' ? 1 : 0;
    }
    return LZ.Scene.Options_maxCommands.call(this) + amountOfVisibleScreenSizes;
};

//=============================================================================
// Window_Options
//=============================================================================

LZ.Window = LZ.Window || {};

LZ.Window.Options_makeCommandList =
    Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    let sizes = LZ.Param.Screen.sizes;
    for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].show === 'true') {
            this.addCommand(sizes[i].width + "x" + sizes[i].height, sizes[i].name);
        } else if (sizes[i].name == "defaultSize") {
            this.addCommand(sizes[i].width + "x" + sizes[i].height + " (recommended) ", sizes[i].name);
        }
    }
    LZ.Window.Options_makeCommandList.call(this);
}

LZ.Window.Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);
    const currentScreenSize = {width:Graphics.width, height:Graphics.height};
    if (this.isScreenSize(symbol)){
        return value.width === currentScreenSize.width &&
            value.height === currentScreenSize.height ? "IN USE" : "";
    } else {
        return LZ.Window.Options_statusText.call(this, index);
    }
}

Window_Options.prototype.isScreenSize = function(symbol) {
    return symbol.toLowerCase().includes("size");
}

LZ.Window.Options_proceedOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isScreenSize(symbol)) {
        this.updateScreenSizeSelection(symbol);
        this.changeResolution(symbol);
        for (let i = 0; i < this._list.length; i++) {
            this.redrawItem(i);
        }
    } else {
        LZ.Window.Options_proceedOk.call(this);
    }
}

Window_Options.prototype.updateScreenSizeSelection = function(symbol) {
    let sizes = LZ.Param.Screen.sizes;
    for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].name !== symbol) {
            sizes[i].selected = false;
        } else {
            sizes[i].selected = true;
            ConfigManager[sizes[i].name].selected = true;
        }
    }
}

LZ.Window.Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isScreenSize(symbol)) return;
    LZ.Window.Options_cursorRight.call(this);
}

LZ.Window.Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isScreenSize(symbol)) return;
    LZ.Window.Options_cursorLeft.call(this);
}

Window_Options.prototype.changeResolution = function(symbol) {
    const value = this.getConfigValue(symbol);
    if (ConfigManager[symbol].selected) {
        this.setConfigValue(symbol, value);
        LZ.ChangeScreenRes.restartSceneOptions();
    }
    this.redrawItem(this.findSymbol(symbol));
    this.playCursorSound();
}
