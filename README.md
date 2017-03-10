Redshirts
===

A cat & mouse game inspired by John Scalzi's [Redshirts](https://www.amazon.com/Redshirts-Novel-Three-John-Scalzi/dp/1491514388).
Play as a group of ensigns to avoid the officers as they try to recruit you for fatal away missions.

## Installation
    npm install

## Usage
    npm run start-dev
    
## Release Notes
### 0.1.0 - Basic player and officer movement
* Pathfinding with easystar.js
* Officers patrol between rooms randomly
* Click to move player
* Designate rooms and walls via Tiled

## Making Maps
1. Download and run [Tiled](http://www.mapeditor.org/)
2. Create a new map: Map Size(Width: depending, Height: 15), Tile Size(Width: 32px, Height: 32px)
3. Keep your Tile Layer named 'Tile Layer 1'
4. Create an Object Layer named 'Object Layer 1'
5. Import tilesheet of choice
6. Add immovable tiles to the tile layer
7. Add movable tiles to the object layer

## Resources
* [Phaser Examples](http://phaser.io/examples)
* [Phaser API Docs](http://phaser.io/docs/2.6.2/index)
* [Making first game](http://phaser.io/tutorials/making-your-first-phaser-game)
* [Tile Generation](https://pnjeffries.itch.io/spartan-procjam-edition)
* [Level Building](http://www.mapeditor.org/)
