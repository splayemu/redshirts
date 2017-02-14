Redshirts.controllers.OfficerController = function (game, level, num) {
    this.game = game;
    this.level = level;
    this.num = num;

    this.officers = [];

    Redshirts.events.officerIdle.add(this.createPatrol, this);
}

Redshirts.controllers.OfficerController.prototype = {
    preload: function () {},

    // spawning
    spawn: function () {
        this.easystar = this.level.levelController.createPathfinding();
        const officerGraphic = Redshirts.debugGraphics.create(this.game, 0xFF0000, 16, 16);

        const [officerRoom,] = this.level.levelController.getRooms('bridge', 'lab');

        for (var i = 0; i < this.num; i++) {
            const loc = {
                x: i * this.level.levelController.tileWidth + officerRoom.x, 
                y: officerRoom.y,
            }
            this.officers.push(new Redshirts.entities.officer(this.game, this.level, officerGraphic, loc.x, loc.y));

        }
    },

    // mechanism for patrol
    addPatrol: function () {
        this.officers.forEach((officer) => { 
            for (var i = 1; i < 4; i++) {
                const loc = { x: officer.sprite.x, y: (officer.sprite.y + i * this.level.levelController.tileHeight * 5) };
                officer.enqueuePatrol(loc);
            }
        });
    },

    createPatrol: function (officer) {
        const [officerRoom, objectiveRoom, otherRooms] = this.level.levelController.getRooms('bridge', 'lab');
        // random ordering of rooms
        const patrolRooms = shuffle([officerRoom, objectiveRoom, ...sample(otherRooms, 2)]);
        patrolRooms.forEach((room, i, arr) => {
            let prevLoc = null;
            if (i > 0) { 
                prevLoc = arr[i - 1].midPoint; 
            }
            officer.enqueuePatrol(room, prevLoc);
        });
    },

    // mechanism for patrol
    createPatrols: function () {
        this.officers.forEach(this.createPatrol, this);
    },

    // start patrol
    update: function () {
        this.easystar.calculate();
        this.officers.forEach((officer) => {
            officer.update();
        });
    },

}