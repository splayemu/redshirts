const d3Color = require('d3-color');
const d3ScaleChromatic = require('d3-scale-chromatic');

const utils = require('../utils.js');
const events = require('../events.js');
const Officer = require('../entities/officer.js');

module.exports = function (game, level, num) {
    this.game = game;
    this.level = level;
    this.num = num;

    this.officers = [];

    events.officerIdle.add(this.createPatrol, this);
};

module.exports.prototype = {
    preload: function () {},

    // spawning
    spawn: function () {
        this.easystar = this.level.levelController.createPathfinding();

        const [officerRoom,] = this.level.levelController.getRooms('bridge', 'lab');

        function colorScale (i, max) {
            const percent = (i + 1) / (max + 1);
            const color = d3Color.color(d3ScaleChromatic.interpolateBlues(percent));
            console.log('colorScale', percent, color, color.toString()); 
            return utils.parseColor(utils.rgbToHex(color), true);
        }

        for (var i = 0; i < this.num; i++) {
            const loc = {
                x: i * this.level.levelController.tileWidth + officerRoom.x, 
                y: officerRoom.y
            };
            console.log('spawning officer', Officer);
            this.officers.push(Officer(this.game,
                                       this.level,
                                       colorScale(i, this.num),
                                       loc.x,
                                       loc.y));

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
        const patrolRooms = utils.shuffle([officerRoom, objectiveRoom, ...utils.sample(otherRooms, 2)]);
        patrolRooms.forEach((room, i, arr) => {
            let prevLoc = null;
            if (i > 0) { 
                prevLoc = arr[i - 1].midPoint; 
            }
            officer.enqueuePatrol(room, prevLoc);
        });
    },

    // start patrol
    update: function () {
        this.easystar.calculate();
        this.officers.forEach((officer) => {
            officer.update();
        });
    },

}
