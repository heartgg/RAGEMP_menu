# RAGEMP_menu
## Overview
This is a highly customizable and responsive interact menu script that does not require any CEF magic. All of the components of this menu come from `mp.game.graphics`. There is an `example.js` included in the repository files that set up a menu manager along with two menus that you can switch between.

## Installation
Place the `interact` folder inside your `client_packages` folder.

Paste the below code into your `client_packages/index.js` file.
```javascript
require('./interact/example');
```

## API Usage
Getting required classes
```javascript
const Menu = require('./interact/menu');
const MenuManager = require('./interact/manager');
```

Setting up a menu
```javascript
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
const sampleMenu = new Menu(maxItems, itemScale, wheelScale, radius, color, hoverColor, wheelTexture, backgroundTexture);
```

Adding items to the menu
```javascript
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
sampleMenu.add(name, textureDict, textureName, background, closeMenu, color, hoverColor, () => {
    mp.game.graphics.notify('Button 1');
});
```

Setting up the menu manager
```javascript
/**
 * @param {Menu} mainMenu The menu that opens when manager is displayed.
 */
const menuManager = new MenuManager(mainMenu);
```

Using the menu manager
```javascript
/**
 * @param {Menu} menu The menu to switch to (use this in callback if you want complex menus).
 */
menuManager.switch(menu);
```
```javascript
/**
 * @param {Boolean} toggle Toggle menu visibility.
 */
menuManager.display(toggle);
```
```javascript
// Running this executes the callback associated with the selected item.
menuManager.select();
```
