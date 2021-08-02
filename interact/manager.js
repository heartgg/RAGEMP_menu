const Menu = require('./interact/menu');

class MenuManager {
    /**
     * @param {Menu} mainMenu The menu that opens when manager is displayed.
     */
    constructor (mainMenu) {
        this.mainMenu = mainMenu;
        this.menu = this.mainMenu;
        this.displayed = false;
    }
    /**
     * @param {Menu} menu The menu to switch to (use this in callback if you want complex menus).
     */
    switch (menu) {
        if (menu instanceof Menu) {
            this.menu = menu;
        }
    }
    render () {
        if (this.isDisplayed()) this.menu.render();
    }
    async select () {
        if (!this.isDisplayed()) return;
        const result = this.menu.select();
        if (result) this.display(false);
    }
    /**
     * @param {Boolean} toggle Toggle menu visibility.
     */
    display (toggle) {
        this.displayed = toggle;
        this.menu = this.mainMenu;
    }
    isDisplayed () {
        return this.displayed;
    }
}
exports = MenuManager;