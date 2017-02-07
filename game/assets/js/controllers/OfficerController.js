Redshirts.controllers.OfficerController = function (game, level, num) {
    this.game = game;
    this.level = level;
    this.num = num;

    this.officers = [];
    this.officerLocations = [
        {
            'x': 0,
            'y': 0,
        },
        {
            'x': 15,
            'y': 0,
        },
    ]
}

Redshirts.controllers.OfficerController.prototype = {
    preload: function () {},

    // spawning
    spawn: function () {
        const officerGraphic = Redshirts.debugGraphics.create(this.game, 0xFF0000, 16, 16);
        this.officerLocations.forEach((loc) => {
            this.officers.push(new Redshirts.entities.officer(this.game, this.level, officerGraphic,
                                                              loc.x * this.level.levelController.tileWidth, 
                                                              loc.y * this.level.levelController.tileHeight));
        });
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

    // start patrol
    update: function () {
        this.officers.forEach((officer) => {
            officer.update();
        });
    },

}