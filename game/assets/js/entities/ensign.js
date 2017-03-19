const debug = require('../debug.js');

const ensignPrototype = {
    update: function () {
        if (this.path !== null && this.path.length > 0) {
            if (this.tween === null) {
                const loc = this.path.shift();
                this.tween = this.game.add.tween(this.sprite).to(loc, this.speed, null, true);
                this.tween.onComplete.add((e) => { this.tween = null; }, this);
            } 
        } else if (this.path !== null && this.path.length === 0) {
            this.path = null;
        }
    }
};

let ensignID = 0;

module.exports = function (game, level, startingX, startingY) {
    const debugColor = 0xFF0000;
    // The player and its settings
    //const sprite = Redshirts.debugGraphics.create(game, color, 16, 16);

    const ensign = Object.assign(Object.create(ensignPrototype), {
        game: game,
        level: level,

        speed: 150,
        startingX: startingX,
        startingY: startingY,

        path: null,
        tween: null,

        debugColor: debugColor, 
        debugPathEndTexture: debug.createSquare(game, 
                                                debugColor, 
                                                level.levelController.tileWidth, 
                                                level.levelController.tileHeight),
        debugSprite: null,

        // The player and its settings
        sprite: game.add.sprite(startingX, startingY, 'betty')
    });

    ensignID++;
    return ensign;
};
