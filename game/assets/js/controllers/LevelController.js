Redshirts.controllers.LevelController = function (game, level, filename, layerName) {
    this.game = game;
    this.level = level;
    this.filename = filename;
    this.layerName = layerName;
    this.levelID = 'ship';
    this.walls = 'walls';
    this.json = 'wallsjson';
    this.tileWidth = 32;
    this.tileHeight = 32;
}

Redshirts.controllers.LevelController.prototype = {
    preload: function () {
        this.game.load.tilemap(this.levelID, this.filename, null, Phaser.Tilemap.TILED_JSON);
        this.game.load.json(this.json, this.filename);
    },

    _loadGrid: function () {
        const layer = this.game.cache.getJSON(this.json).layers[0];
        const grid = [];

        for (let row = 0; row < layer.height; row++) {
            const newRow = [];
            grid.push(newRow);

            for (let col = 0; col < layer.width; col++) {
                newRow.push(layer.data[row * layer.height + col]);

                if (Redshirts.config.debug.grid) {
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
        }
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
        this.debugGridTexture = Redshirts.debugGraphics.create(this.game, 0xFFFF00, this.tileWidth, this.tileHeight);

        this._loadGrid();
        this._initializePathfinding();
    },

    addPath: function (entity, loc, callback) {
        const startingX = this.tileX(entity.sprite.x);
        const startingY = this.tileY(entity.sprite.y);
        const endingX = this.tileX(loc.x);
        const endingY = this.tileY(loc.y);

        // it returns null if the path is on an inaccessible block, but doesn't ever call if it's blocked off
        this.easystar.findPath(startingX, startingY, endingX, endingY, (path) => {
            if (path === null) {
                Redshirts.debug('grid', `${entity.sprite.key} can't path to ${endingX}, ${endingY}`);
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

    _initializePathfinding: function () {
        this.easystar = new EasyStar.js();
        this.easystar.setGrid(this.grid);
        this.easystar.setAcceptableTiles([0]);
        this.easystar.setIterationsPerCalculation(100);
    },
}