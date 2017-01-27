Redshirts.states.Ship = function(game) {
    Redshirts.debug('stateHooks', 'Ship.constructor');
    this.game = game;
    this.player;
    this.platformGroup;
};

Redshirts.states.Ship.prototype = {
    preload: function() {
        Redshirts.debug('stateHooks', 'Ship.preload');

    },

    create: function() {
        Redshirts.debug('stateHooks', 'Ship.create');

        this.player = new Redshirts.entities.player(this.game, this, 32, this.game.world.height - 300);
        //this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

    },

    update: function() {
    },
}
