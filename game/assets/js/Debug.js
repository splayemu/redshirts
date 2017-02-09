Redshirts.debug = function(flag, message) {
    if (Redshirts.config.debug[flag]) {
        console.log(message);
    }
}

Redshirts.debugGraphics = {
    create: function (game, color, width, height) {
        console.log('create', color, width, height);
        const debugGraphics = game.add.graphics(0, 0);
        // doesn't seem to change anything
        //debugGraphics.boundsPadding = 0;

        debugGraphics.lineStyle(1, color);
        debugGraphics.beginFill(color, 0.5);
        debugGraphics.drawRect(0, 0, width, height);
        debugGraphics.endFill();


        const debugGraphicsTexture = debugGraphics.generateTexture();
        debugGraphics.destroy();
        return debugGraphicsTexture;
    },

    createCircle: function (game, color, radius) {
        console.log('createCircle', color, radius);
        const debugGraphics = game.add.graphics(0, 0);
        // doesn't seem to change anything
        //debugGraphics.boundsPadding = 0;

        debugGraphics.lineStyle(2, color);
        debugGraphics.beginFill(color, 0.5);
        debugGraphics.drawCircle(0, 0, radius);
        debugGraphics.endFill();


        const debugGraphicsTexture = debugGraphics.generateTexture();
        debugGraphics.destroy();
        return debugGraphicsTexture;
    },
}