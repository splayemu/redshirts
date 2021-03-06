const debug = require('../debug.js');
const config = require('../config.js');
const EasyStar = require('easystarjs');

module.exports = function (game, level, filename, layerName) {
    debug.log('stateHooks', 'level-controller.constructor');
    this.game = game;
    this.level = level;
    this.filename = filename;
    this.layerName = layerName;
    this.levelID = 'ship';
    this.walls = 'walls';
    this.json = 'shipjson';
    this.tileWidth = 32;
    this.tileHeight = 32;
};

module.exports.prototype = {
    preload: function () {
        debug.log('stateHooks', 'level-controller.preload');
        this.game.load.tilemap(this.levelID, this.filename, null, Phaser.Tilemap.TILED_JSON);
        this.game.load.json(this.json, this.filename);
    },

    _loadGrid: function () {
        // can also look for a tilelayer
        const layer = this.game.cache.getJSON(this.json).layers[0];
        const grid = [];

        for (let row = 0; row < layer.height; row++) {
            const newRow = [];
            grid.push(newRow);

            for (let col = 0; col < layer.width; col++) {
                newRow.push(layer.data[row * layer.height + col]);

                if (config.debug.grid) {
                    if (layer.data[col + layer.height * row]) {
                        this.game.add.sprite(col * this.tileWidth, row * this.tileHeight, this.debugGridTexture);
                    }
                }
            }
        }

        this.grid = grid;
        this.gridWidth = layer.width;
        this.gridHeight = layer.height;
    },

    _loadRooms: function () {
        this.rooms = this.game.cache.getJSON(this.json).layers.filter((layer) => {
            return layer.name === "rooms";
        })[0].objects;

        this.rooms.forEach((room) => {
            room.midPoint = {
                x: room.x + room.width / 2,
                y: room.y + room.height / 2,
            };
        });

        if (config.debug.grid) {
            this.rooms.forEach((room) => {
                const roomTexture = debug.createSquare(this.game, 0xFFFF00, room.width, room.height);
                this.game.add.sprite(room.x, room.y, roomTexture);

                const style = { font: '18px Arial', fill: '#FFFFFF', align: 'left' };
                this.game.add.text(room.x, room.y, room.name, style);
            });
        }
    },

    copyRoom: function (room) {
        return {
            name: room.name,
            x: room.x,
            y: room.y,
            width: room.width,
            height: room.height,
            midPoint: room.midPoint,
        };
    },

    getRooms: function (startingRoom, objectiveRoomName) {
        const rooms = this.rooms.map(this.copyRoom);
        const entityStartingRoom = rooms.filter((room) => { return room.name === startingRoom; })[0];
        const objectiveRoom = rooms.filter((room) => { return room.name === objectiveRoomName; })[0];
        const otherRooms = rooms.filter((room) => {
            return room.name !== startingRoom && room.name !== objectiveRoomName;
        });

        return [entityStartingRoom, objectiveRoom, otherRooms];
   },

    tileX: function (xInPx) {
        return Math.floor(xInPx / this.tileWidth);
    },

    tileY: function (yInPx) {
        return Math.floor(yInPx / this.tileHeight);
    },


    convertTile: function (loc) {
        return {
            x: this.tileX(loc.x),
            y: this.tileY(loc.y),
        };
    },

    convertPx: function (loc) {
        return {
            x: loc.x * this.tileWidth,
            y: loc.y * this.tileHeight
        };
    },

    pxRound: function (loc) {
        return this.convertPx(this.convertTile(loc));
    },

    createGround: function () {
        // draws the img
        this.map = this.game.add.tilemap(this.levelID, this.tileWidth, this.tileHeight);
        this.map.addTilesetImage('background');
        this.map.createLayer(this.layerName);

        // debug textures
        this.debugGridTexture = debug.createSquare(this.game, 0xFFFF00, this.tileWidth, this.tileHeight);

        this._loadGrid();
        this._loadRooms();
    },


    createPathfinding: function () {
        console.log(EasyStar);
        const easystar = new EasyStar.js();
        easystar.setGrid(this.grid);

        // default to everything but the walls
        easystar.setAcceptableTiles([0]);
        easystar.setIterationsPerCalculation(100);

        return easystar;
    },

    addPath: function (easystar, start, end, callback) {
        const starting = this.convertTile(start);
        const ending = this.convertTile(end);

        // it returns null if the path is on an inaccessible block, but doesn't ever call if it's blocked off
        easystar.findPath(starting.x, starting.y, ending.x, ending.y, (path) => {
            if (path === null) {
                debug.log('grid', `${start.x}, ${start.y} can't path to ${ending.x}, ${ending.y}`);
            } else {
                //console.groupCollapsed('player');
                //console.log('new path found', entity.sprite.x, entity.sprite.y);
                //console.log('first location', path[0]);
                //console.groupEnd('player');

                callback(path.map((loc) => {
                    loc.x *= this.tileWidth;
                    loc.y *= this.tileHeight;
                    return loc;
                }));
            }
        });
    },
};
