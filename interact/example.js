const interactKey = 0x42; // B key

const Menu = require('./interact/menu');
const MenuManager = require('./interact/manager');

// Setting up a menu.
const sampleMenu = new Menu(8, 3, 6.5, .05, [145, 205, 245, 155], [145, 205, 245, 255], ...Array(2)); // Declare a new menu with the last 2 parameters set to default
sampleMenu.add('Button 1', 'commonmenu', 'shop_ammo_icon_a', ...Array(4), () => { // Add 7 buttons with all default properties.
    mp.game.graphics.notify('Button 1');
});
sampleMenu.add('Button 2', 'commonmenu', 'shop_armour_icon_a', ...Array(4), () => {
    mp.game.graphics.notify('Button 2');
});
sampleMenu.add('Button 3', 'commonmenu', 'shop_barber_icon_a', ...Array(4), () => {
    mp.game.graphics.notify('Button 3');
});
sampleMenu.add('Button 4', 'commonmenu', 'shop_clothing_icon_a', ...Array(4), () => {
    mp.game.graphics.notify('Button 4');
});
sampleMenu.add('Button 5', 'commonmenu', 'shop_franklin_icon_a', ...Array(4), () => {
    mp.game.graphics.notify('Button 5');
});
sampleMenu.add('Button 6', 'commonmenu', 'shop_garage_bike_icon_a', ...Array(4), () => {
    mp.game.graphics.notify('Button 6');
});
sampleMenu.add('Button 7', 'commonmenu', 'shop_garage_icon_a', ...Array(4), () => {
    mp.game.graphics.notify('Button 7');
});
sampleMenu.add('Button 8', 'commonmenu', 'shop_gunclub_icon_a', false, false, [255, 255, 125, 155], [125, 255, 125, 255], () => { // Add 1 button with different colors that switches to another menu.
    menuManager.switch(subMenu);
});

// Setting up a menu.
const subMenu = new Menu(); // Declare a new menu with all defaults
subMenu.add('Button 1', 'commonmenu', 'shop_gunclub_icon_a', false, false, [255, 255, 125, 155], [125, 255, 125, 255], () => { // Add 1 button with different colors that switches to another menu.
    menuManager.switch(sampleMenu);
});
subMenu.add('Button 2', 'commonmenu', 'shop_gunclub_icon_a', false, true, ...Array(2), () => { 
    mp.game.graphics.notify('Button 2');
});

// Setting up a menu manager.
const menuManager = new MenuManager(sampleMenu); // Declare the menu manager to handle the menus with mainMenu = sampleMenu.

mp.keys.bind(interactKey, true, () => { menuManager.display(true) }); // Holding B sets the menu open.
mp.keys.bind(interactKey, false, () => { menuManager.display(false) }); // Letting go off B closes the menu.

mp.events.add('render', () => {
    menuManager.render(); // Must be in render for menu to work.
});

mp.events.add('click', (x, y, upOrDown, leftOrRight, relativeX, relativeY, worldPosition, hitEntity) => {
    if (leftOrRight == 'left' && upOrDown == 'down') menuManager.select(); // Pressing Mouse 1 executes the callback associated with the selected item.
});