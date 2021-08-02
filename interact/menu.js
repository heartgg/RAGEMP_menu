const { getSquareSize, getRadians, betweenRadians, getCoords } = require('./interact/utils');

class Menu {
    /**
     * @param {Number} [maxItems] Max amount of items that will show when the menu is open.
     * @param {Number} [itemScale] Size of each selectable item in the menu.
     * @param {Number} [wheelScale] Size of texture in the center of the menu.
     * @param {Number} [radius] Size of each selectable item in the menu.
     * @param {RGBA} [color] Default color for all items (unless altered for each individual item added)
     * @param {RGBA} [hoverColor] Default hover color for all items (unless altered for each individual item added)
     * @param {Array} [wheelTexture] [textureDict, textureName] of the menu's center.
     * @param {Array} [backgroundTexture] [textureDict, textureName] of the optional background for items.
     */
    constructor (maxItems = 8, itemScale = 3, wheelScale = 6.5, radius = .05, color = [255, 255, 255, 155], hoverColor = [255, 255, 255, 255], wheelTexture = ['mpmissmarkers128', 'corona_marker'], backgroundTexture = ['mpinventory', 'in_world_circle']) {
        this.items = [];
        this.maxItems = maxItems;
        this.selected;
        this.itemScale = itemScale;
        this.wheelScale = wheelScale;
        this.radius = radius;
        this.relSize = getSquareSize(this.itemScale);
        this.relWheelSize = getSquareSize(this.wheelScale);
        this.color = color;
        this.hoverColor = hoverColor;
        this.wheelTexture = wheelTexture;
        this.backgroundTexture = backgroundTexture;
        this.coords = getCoords(this.radius, this.maxItems);
        this.loadTextures();
    }
    /**
     * @param {String} name Item identifier.
     * @param {String} textureDict Item icon texture dictionary.
     * @param {String} textureName Item icon texture name.
     * @param {Boolean} [background] Whether the item should have the optional background (recommended for icons without backgrounds).
     * @param {Boolean} [closeMenu] Whether the menu should be closed on item select.
     * @param {RGBA} [color] Color for the item in the menu (default takes color from the menu).
     * @param {RGBA} [hoverColor] Hover color for the item in the menu (default takes hover color from the menu).
     * @param {Function} callback Callback to execute on item select.
     */
    add (name, textureDict, textureName, background = false, closeMenu = true, color = this.color, hoverColor = this.hoverColor, callback) {
        mp.game.graphics.requestStreamedTextureDict(textureDict, true);
        if (this.items.length >= this.maxItems) return;
        this.items.push({ 
            name: name, 
            textureDict: textureDict, 
            textureName: textureName, 
            background: background, 
            closeMenu: closeMenu,
            color: color,
            hoverColor: hoverColor,
            onClick: function () {
                callback();
            } 
        });
    }
    render () {
        var radial = getRadians(mp.gui.cursor.position[0], mp.gui.cursor.position[1]);
        mp.game.graphics.drawSprite(this.wheelTexture[0], this.wheelTexture[1], .5, .5, this.relWheelSize.sizeX, this.relWheelSize.sizeY, 0, ...this.color);
        this.selected = null;
        this.coords.forEach((coord, i) => {
            if (this.items[i] && mp.game.graphics.hasStreamedTextureDictLoaded(this.items[i].textureDict)) {
                var color = this.items[i].color;
                if (betweenRadians(radial, coord.range.min, coord.range.max)) {
                    this.selected = i;
                    color = this.items[i].hoverColor;
                } 
                mp.game.graphics.drawSprite(this.items[i].textureDict, this.items[i].textureName, coord.x, coord.y, this.relSize.sizeX, this.relSize.sizeY, 0, ...color);
                if (this.items[i].background) mp.game.graphics.drawSprite(this.backgroundTexture[0], this.backgroundTexture[1], coord.x, coord.y, this.relSize.sizeX, this.relSize.sizeY, 0, ...color);
            }
        });
        mp.game.controls.disableControlAction(1, 1, true);
        mp.game.controls.disableControlAction(1, 2, true);
        mp.game.controls.disableControlAction(32, 24, true);
    }
    select () {
        if (this.selected != null) {
            this.items[this.selected].onClick();
            return this.items[this.selected].closeMenu
        } else return false;
    }
    loadTextures () {
        mp.game.graphics.requestStreamedTextureDict(this.wheelTexture[0], true);
        mp.game.graphics.requestStreamedTextureDict(this.backgroundTexture[0], true);
    }
}
exports = Menu;