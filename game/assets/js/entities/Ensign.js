Redshirts.entities.Ensign = function (game, level, startingX, startingY) {
    this.game = game;
    this.level = level;

    this.speed = 150;
    this.startingX = startingX;
    this.startingY = startingY;

    this.path = null;
    this.tween = null;

    this.debugColor = 0xFF0000;
    this.debugPathEndTexture = Redshirts.debugGraphics.create(this.game, 
                                                              this.debugColor, 
                                                              this.level.levelController.tileWidth, 
                                                              this.level.levelController.tileHeight);
    this.debugSprite = null;

    // The player and its settings
    this.sprite = this.game.add.sprite(this.startingX, this.startingY, 'betty');
}

Redshirts.entities.Ensign.prototype = {
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
    },
}