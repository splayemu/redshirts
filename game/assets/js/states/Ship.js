Redshirts.states.Ship = function(game) {
    Redshirts.debug('stateHooks', 'Ship.constructor');
    this.game = game;
    this.player;
    this.platformGroup;
    this.levelController = new Redshirts.controllers.LevelController(this.game, 
                                                                     this, 
                                                                     'assets/levels/ship.json', 
                                                                     'Tile Layer 1');

    this.officerController = new Redshirts.controllers.OfficerController(this.game, this, 2);
    this.ensignController = new Redshirts.controllers.EnsignController(this.game, this, 1);


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

        this.ensignController.spawn();
        this.player = this.ensignController.getPlayer();

        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // click events
        this.game.input.onDown.add(this.ensignController.pathTo, this.ensignController);

        // create officers
        this.officerController.spawn();
        //this.officerController.createPatrols();
    },

    update: function() {
        this.player.update();
        this.officerController.update();
        this.ensignController.update();

    },

    render: function () {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);

    }
}
