Redshirts.states.Preloader = function (game) {
    Redshirts.debug('stateHooks', 'Preloader.constructor');
};

Redshirts.states.Preloader.prototype = {

    preload: function () {
        Redshirts.debug('stateHooks', 'Preloader.preload');

        this.game.load.image('box', 'assets/img/box.png');
        this.game.load.image('moon', 'assets/img/moon.png');

        this.game.load.spritesheet('luna', 'assets/spritesheets/luna.png', 48, 64, 240);
        this.game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
        this.game.load.spritesheet('ground', 'assets/spritesheets/ground.png', 32, 32, 2);

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
