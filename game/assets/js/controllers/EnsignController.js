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
        //const ensignGraphic = Redshirts.debugGraphics.create(this.game, 0xFF0000, 16, 16);
        this.ensignLocations.forEach((loc) => {
            this.ensigns.push(new Redshirts.entities.Ensign(this.game, this.level, 
                                                            loc.x * this.level.levelController.tileWidth, 
                                                            loc.y * this.level.levelController.tileHeight));
        });
    },

    getPlayer: function () {
        return this.ensigns[0];
    },
    // mechanism for patrol
    //addPatrol: function () {
    //    this.officers.forEach((officer) => { 
    //        for (var i = 1; i < 4; i++) {
    //            const loc = { x: officer.sprite.x, y: (officer.sprite.y + i * this.level.levelController.tileHeight * 5) };
    //            officer.enqueuePatrol(loc);
    //        }
    //    });
    //},

    // start patrol
    update: function () {
        this.ensigns.forEach((ensign) => {
            ensign.update();
        });
    },

}