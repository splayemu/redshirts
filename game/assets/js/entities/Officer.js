const officerPrototype = {
    debug: function (msg) {
        Redshirts.debug('officers', `officer: ${this.id}, ${msg}`, this.color);
    },

    update: function () {
        // depatrolQueue patrol item

        if (this.waiting) {
            this.waiting -= 1;
        } else {
            // if nothing to do, idle
            this._move();
        }
    },

    _move: function () {
        if (this.path.length > 0) {
            if (this.tween === null) {
                const loc = this.path.shift();
                this.tween = this.game.add.tween(this.sprite).to(loc, this.speed, null, true);
                this.tween.onComplete.add((e) => { this.tween = null; }, this);
            }
        } else if (this.path.length === 0) {
            const nextRoom = this.peekPatrol();
            if (nextRoom) {
                if (nextRoom.path) this.dequeuePatrol();
            } else {
                //Redshirts.debug('officers', `officer: ${this.id}, officerIdle`, this.color);
                this.debug('officerIdle');
                Redshirts.events.officerIdle.dispatch(this);
            }

            this.waiting = this.waitTime;
        }
    },

    peekPatrol: function () {
        if (this.patrolQueue.length > 0) {
            return this.patrolQueue[0];
        } else {
            return null;
        }
    },

    dequeuePatrol: function () {
        const nextRoom = this.patrolQueue.shift();
        this.path = nextRoom.path;
        if (Redshirts.config.debug.officers) {
            const pathSprite = this.pathSprites.shift();
            // could change or animate sprite to be different

        }

        this.debug(`depatrolQueuePatrol ${nextRoom.name}: ${this.path[this.path.length - 1].x}, ${this.path[this.path.length - 1].y}`);
    },

    enqueuePatrol: function (room, prevLoc) {
        const loc = this.level.levelController.pxRound(prevLoc || this.sprite); 

        this.debug(`enpatrolQueueRoom ${room.name} starting at (${loc.x}, ${loc.y})`);

        if (Redshirts.config.debug.officers) {
            this.pathSprites.push(this.game.add.sprite(room.midPoint.x, room.midPoint.y, this.debugPathEndTexture));
        }

        this.patrolQueue.push(room);

        this.level.levelController.addPath(this.level.officerController.easystar, loc, room.midPoint, (path) => {
            room.path = path;
        });
    },
};

Redshirts.entities.createOfficer = (function () {
    let officerID = 0; 

    return function (game, level, color, startingX, startingY) {

        // The player and its settings
        const sprite = Redshirts.debugGraphics.create(game, color, 16, 16);

        const officer = Object.assign(Object.create(officerPrototype), {
            id: officerID,
            game: game,
            level: level,
            color: color, 

            speed: 150,
            startingX: startingX,
            startingY: startingY,

            path: [],
            tween: null,

            sprite: game.add.sprite(startingX, startingY, sprite),

            debugPathEndTexture: Redshirts.debugGraphics.createCircle(game, 
                                                                      color, 
                                                                      level.levelController.tileWidth / 4), 

            pathSprites: [],
            debugSprite: null,
            waitTime: 100,
            waiting: 0,

            patrolQueue: [],
        });

        officerID++;
        officer.debug(`created with color ${color}`);
        return officer;
    };
})();
