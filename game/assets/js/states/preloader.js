const debug = require('../debug.js');
const config = require('../config.js');

module.exports = function (game) {
    debug.log('stateHooks', 'Preloader.constructor');
};

module.exports.prototype = {

    preload: function () {
        debug.log('stateHooks', 'Preloader.preload');
        this.game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
        //opengameart.org/content/one-more-lpc-alternate-character
        this.game.load.spritesheet('betty', 'assets/spritesheets/betty.png', 32, 32, 8, 8);
        this.game.load.spritesheet('background', 'assets/spritesheets/background.png', 32, 32, 2);

    },

    create: function () {
        debug.log('stateHooks', 'Preloader.create');
        //this.preloadBar.cropEnabled = false;
    },

    update: function () {
        //this.ready = true;
        this.state.start(config.startState === null ? 'Ship' : config.startState);
    },
}
