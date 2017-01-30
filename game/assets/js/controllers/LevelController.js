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
    
    createGround: function () {
        // draws the img
        this.map = this.game.add.tilemap(this.levelID, this.tileWidth, this.tileHeight);
        this.map.addTilesetImage('background');
        this.map.createLayer(this.layerName);

        // debug textures
        this.debugPathEndTexture = Redshirts.debugGraphics.create(this.game, 0xFF0000, this.tileWidth, this.tileHeight);
        this.debugGridTexture = Redshirts.debugGraphics.create(this.game, 0xFFFF00, this.tileWidth, this.tileHeight);

        this._loadGrid();
        this._initializePathfinding();
    },

    addPath: function (entity, endXInPx, endYInPx) {
        const startingX = this.tileX(entity.sprite.x);
        const startingY = this.tileY(entity.sprite.y);
        const endingX = this.tileX(endXInPx);
        const endingY = this.tileY(endYInPx);

        if (Redshirts.config.debug.grid) {
            const debugSprite = this.game.add.sprite(endingX * this.tileWidth, endingY * this.tileHeight, this.debugPathEndTexture);
        }

        // it returns null if the path is on an inaccessible block, but doesn't ever call if it's blocked off
        this.easystar.findPath(startingX, startingY, endingX, endingY, (path) => {
            if (path === null) {
                alert("path is null");
            } else {
                entity.path = path.map((loc) => {
                    loc.x *= this.tileWidth;
                    loc.y *= this.tileHeight;
                    return loc;
                });
            }
        });
    },

    _initializePathfinding: function () {
        this.easystar = new EasyStar.js();
        this.easystar.setGrid(this.grid);
        this.easystar.setAcceptableTiles([0]);
        this.easystar.setIterationsPerCalculation(1);
    },
}
