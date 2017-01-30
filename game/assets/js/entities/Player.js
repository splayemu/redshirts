Redshirts.entities.player = function (game, level, startingX, startingY) {
    this.game = game;
    this.level = level;

    this.speed = 150;
    this.startingX = startingX;
    this.startingY = startingY;

    this.path = null;
    this.tween = null;

    // The player and its settings
    this.sprite = this.game.add.sprite(this.startingX, this.startingY, 'dude');

    //  Our two animations, walking left and right.
    // idle: 0 - 179, casting: 180 -239
    //var idleFrames = Array.apply(null, Array(180)).map(function (_, i) {return i;});
    //var castingFrames = Array.apply(null, Array(60)).map(function (_, i) {return i + 180;});

    //this.sprite.animations.add('idle', idleFrames, 40, true);
    //this.sprite.animations.add('casting', castingFrames, 30, true);

}

Redshirts.entities.player.prototype = {
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
