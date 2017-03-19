const debug = require('../debug.js');
const LevelController = require('../controllers/level-controller.js');
const OfficerController = require('../controllers/officer-controller.js');
const EnsignController = require('../controllers/ensign-controller.js');

module.exports = function(game) {
    debug.log('stateHooks', 'Ship.constructor');
    this.game = game;
    this.player;
    this.platformGroup;
    this.levelController = new LevelController(this.game, 
                                               this, 
                                               'assets/levels/ship.json', 
                                               'Tile Layer 1');

    this.officerController = new OfficerController(this.game, this, 2);
    this.ensignController = new EnsignController(this.game, this, 1);
};

module.exports.prototype = {
    preload: function() {
        debug.log('stateHooks', 'Ship.preload');
        this.levelController.preload();
    },

    create: function() {
        debug.log('stateHooks', 'Ship.create');

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
