const debug = require('../debug.js');
const config = require('../config.js');
const Ensign = require('../entities/ensign.js');

module.exports = function (game, level, num) {
    this.game = game;
    this.level = level;
    this.num = num;

    this.ensigns = [];
    this.selected = null;
};

module.exports.prototype = {
    preload: function () {},

    spawn: function () {
        this.easystar = this.level.levelController.createPathfinding();
        //const ensignGraphic = debug.createSquare(this.game, 0xFF0000, 16, 16);
        const [ensignRoom,] = this.level.levelController.getRooms('mess', 'lab');
        for (var i = 0; i < this.num; i++) {
            const loc = {
                x: i * this.level.levelController.tileWidth + ensignRoom.x, 
                y: ensignRoom.y
            };
            this.ensigns.push(Ensign(this.game,
                                     this.level,
                                     loc.x,
                                     loc.y));
        }

        this.selected = this.ensigns[0];
    },

    pathTo: function (e) {
        const x = this.game.input.mousePointer.x + this.game.camera.x;
        const y = this.game.input.mousePointer.y + this.game.camera.y;
        console.log(config.debug.player, this, 'mousedown', x, y);

        const loc = this.level.levelController.pxRound({ x: x, y: y });
 
        if (config.debug.player) {
            if (this.selected.debugSprite) this.selected.debugSprite.destroy();
            this.selected.debugSprite = this.game.add.sprite(loc.x, loc.y, this.selected.debugPathEndTexture);
        }

        this.level.levelController.addPath(this.easystar, this.selected.sprite, loc, (path) => {
            this.selected.path = path;
        });
    },

    getPlayer: function () {
        return this.selected;
    },

    update: function () {
        this.easystar.calculate();
        this.ensigns.forEach((ensign) => {
            ensign.update();
        });
    },
};
