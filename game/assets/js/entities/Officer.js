Redshirts.entities.officer = function (game, level, sprite, startingX, startingY) {
    this.game = game;
    this.level = level;

    this.speed = 150;
    this.startingX = startingX;
    this.startingY = startingY;

    this.path = null;
    this.tween = null;

    // The player and its settings
    this.sprite = this.game.add.sprite(this.startingX, this.startingY, sprite);

    this.debugColor = 0x4286F4;
    this.debugPathEndTexture = Redshirts.debugGraphics.createCircle(this.game, 
                                                                    this.debugColor, 
                                                                    this.level.levelController.tileWidth / 2); 

    this.pathSprites = [];
    this.debugSprite = null;

    this.queue = [];
}

Redshirts.entities.officer.prototype = {
    update: function () {
        // dequeue patrol item
        if (this.queue.length > 0) {
            this.dequeuePatrol();
        }
        // start tweening down the path
        // if nothing to do, idle
        this._move();
    },

    _move: function () {
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

    
    dequeuePatrol: function () {
        this.path = this.queue.pop();
        if (Redshirts.config.debug.officers) {
            const pathSprite = this.pathSprites.pop();
            // could change or animate sprite to be different

        }

        Redshirts.debug('officers', `dequeuePatrol ${this.path}`);
    },

    enqueuePatrol: function (loc) {
        Redshirts.debug('officers', `enqueuePatrol ${loc.x}, ${loc.y}`);
        if (Redshirts.config.debug.officers) {
            this.pathSprites.push(this.game.add.sprite(loc.x, loc.y, this.debugPathEndTexture));
        }

        // not sure if this guarentees the order of the patrol
        this.level.levelController.addPath(this, loc, (path) => {
            this.queue.push(path);
        });
    },
}
