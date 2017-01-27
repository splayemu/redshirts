Redshirts.entities.player = function (game, level, startingX, startingY) {
    this.game = game;
    this.level = level;

    this.startingX = startingX;
    this.startingY = startingY;

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
    update: function () {},
}
