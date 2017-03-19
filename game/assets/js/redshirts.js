
const d3Interpolate = require('d3-interpolate');
const d3Color = require('d3-color');
const d3ScaleChromatic = require('d3-scale-chromatic');
const easystar = require('easystarjs');
const config = require('./config.js');
const boot = require('./states/boot.js');
const preloader = require('./states/preloader.js');
const ship = require('./states/ship.js');

var Redshirts = {
    states: {},
    entities: {
        ui: {}
    },
    controllers: {},
    events: {},
    config: null
};

console.log(config);

window.onload = function() {
    const game = new Phaser.Game(config.viewport.width, config.viewport.height, Phaser.CANVAS, '');
    
    game.state.add('Boot', boot);
    game.state.add('Preloader', preloader);
    game.state.add('Ship', ship);
    
    console.log('starting game');
    game.state.start('Boot');

};
