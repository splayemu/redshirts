Redshirts.states.Ship = function(game) {
    Redshirts.debug('stateHooks', 'Ship.constructor');
    this.game = game;
    this.player;
    this.platformGroup;
    this.levelController = new Redshirts.controllers.LevelController(this.game, 
                                                                     this, 
                                                                     'assets/levels/ship.json', 
                                                                     'Tile Layer 1');
};

Redshirts.states.Ship.prototype = {
    preload: function() {
        Redshirts.debug('stateHooks', 'Ship.preload');
        this.levelController.preload();
    },

    create: function() {
        Redshirts.debug('stateHooks', 'Ship.create');

        this.tweens.frameBased = true;
        this.levelController.createGround();

        this.game.world.setBounds(0, 0, 2000, 2000);

        const playerX = this.levelController.tileWidth * 4;
        const playerY = this.levelController.tileHeight * 10;
        this.player = new Redshirts.entities.player(this.game, this, playerX, playerY);

        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        this.game.input.onDown.add(this.pathTo, this);
    },

    pathTo: function (e) {
        const x = this.game.input.mousePointer.x + this.game.camera.x;
        const y = this.game.input.mousePointer.y + this.game.camera.y;
        console.log(e, 'mousedown', x, y);
        this.levelController.addPath(this.player, x, y);
    },

    update: function() {
        this.levelController.easystar.calculate();
        this.player.update();

    },

    render: function () {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);

    }
}
