Redshirts.states.Preloader = function (game) {
    Redshirts.debug('stateHooks', 'Preloader.constructor');
};

Redshirts.states.Preloader.prototype = {

    preload: function () {
        Redshirts.debug('stateHooks', 'Preloader.preload');
        this.game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
        this.game.load.spritesheet('background', 'assets/spritesheets/background.png', 32, 32, 2);

    },

    create: function () {
        Redshirts.debug('stateHooks', 'Preloader.create');
        //this.preloadBar.cropEnabled = false;
    },

    update: function () {
        //this.ready = true;
        this.state.start(Redshirts.config.startState === null ? 'Ship' : Redshirts.config.startState);
    },
}
