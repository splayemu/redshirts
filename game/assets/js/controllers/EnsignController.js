Redshirts.controllers.EnsignController = function (game, level, num) {
    this.game = game;
    this.level = level;
    this.num = num;

    this.ensigns = [];
    this.ensignLocations = [
        {
            'x': 4,
            'y': 10,
        },
    ];
    this.selected = null;
}

Redshirts.controllers.EnsignController.prototype = {
    preload: function () {},

    // spawning
    spawn: function () {
        this.easystar = this.level.levelController.createPathfinding();
        //const ensignGraphic = Redshirts.debugGraphics.create(this.game, 0xFF0000, 16, 16);
        this.ensignLocations.forEach((loc) => {
            this.ensigns.push(new Redshirts.entities.Ensign(this.game, this.level, 
                                                            loc.x * this.level.levelController.tileWidth, 
                                                            loc.y * this.level.levelController.tileHeight));
        });

        this.selected = this.ensigns[0];
    },


    pathTo: function (e) {
        const x = this.game.input.mousePointer.x + this.game.camera.x;
        const y = this.game.input.mousePointer.y + this.game.camera.y;
        console.log(Redshirts.config.debug.player, this, 'mousedown', x, y);

        const loc = this.level.levelController.pxRound({ x: x, y: y });
 
        if (Redshirts.config.debug.player) {
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

}