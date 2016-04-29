var stage, player1SS, player2SS, bulletSS, tileSS, powerupSS;

//Player and sprite lists are related (player 1 location = player1sprite location)
var playerList = [];
var spriteList = [];

var bulletList = [];
var bulletSpriteList = [];

var powerupList = [];
var powerupSpriteList = [];

var tileList = [];
var tileSpriteList = [];

var canvas;
var mapTileWidth = 32;
var mapTileHeight = 32;
var gravity = 0.5;
var powerupSpawnFreq = 10;
var prevPowerupTime;
var currentMap;
var killTarget;
var player1_name;
var player2_name;
//2d array representing map tiles
var map1 = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0],
	[0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0],
	[0, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 0],
	[0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 0],
	[0, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var map2 = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0],
	[0, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//x,y coordinate arrays for possible powerup locations
//Array are linked and used together to retrieve coords
//powerupXLocations[1] gives x coord powerupYLocations[1] gives y coord : (x,y)
var powerupXLocations_map1 = [123, 38, 248, 456, 300, 249];
var powerupYLocations_map1 = [192, 288, 288, 288, 96, 448];

var powerupXLocations_map2 = [128, 64];
var powerupYLocations_map2 = [448, 448];
//Array of possible powerup types
var powerupTypes = ['HP', 'moveSpeed', 'jumpHeight'];

// Keyboard input helper object
var Key = {
	//Arrays of pressed and released keys
	_pressed: {},
	_released: {},
	//Key code variables
	A: 65,
	D: 68,
	W: 87,
	L: 76,
	SPACE: 32,
	LEFT_ARROW: 37,
	RIGHT_ARROW: 39,
	UP_ARROW: 38,
	FWD_SLASH: 191, //Temporary player 2 attack key as SP3 has no right CTRL
	RGHT_CTRL: 17,
	ZERO: 96,

	//Function returns the corresponding variable to the keycode of the key pressed down
	isDown: function(keyCode) {
		return this._pressed[keyCode];
	},

	//Function returns the corresponding variable to the keycode of the key pressed down
	isUp: function(keyCode) {
		return this._released[keyCode];
	},

	//Function adds keycode of pressed key to _pressed{} and
	//Removes keycode of key pressed from _released{}
	onKeydown: function(event) {
		this._pressed[event.keyCode] = true;
		delete this._released[event.keyCode];
	},

	//Opposite of onKeydown function above
	onKeyup: function(event) {
		this._released[event.keyCode] = true;
		delete this._pressed[event.keyCode];
	}
};

//Keydown listener hooked up to Key helper object to track keys pressed
window.addEventListener('keydown', function(event) {
	Key.onKeydown(event);
}, false);

//Keyup listener hooked up to Key helper object to track keys released
window.addEventListener('keyup', function(event) {
	Key.onKeyup(event);
}, false);

//Initialisation function, loads basic game assets
function init(map, killtarget) {
	// Create easelJS canvas
	createGameView();
	//load spritesheet image
	player1SS = ("marioSheetNew.png");
	player2SS = ("poliwagSheet.png");
	bulletSS = ("bulletSheet.png");
	tileSS = ("tileSheet.png");
	powerupSS = ("powerupSheet.png");
	killTarget = killtarget;
	currentMap = map;
	startGame();
}

//Manipulates HTML page to show game canvas
function createGameView() {
	document.body.innerHTML = "";
	var h = document.createElement('h1');
	var t = document.createTextNode("Game on!");
	h.appendChild(t);
	h.id = "mainTitle";
	document.body.appendChild(h);

	var canv = document.createElement('canvas');
	canv.id = 'gameCanvas';
	canv.width = 512;
	canv.height = 544;
	document.body.appendChild(canv);
	canvas = document.getElementById("gameCanvas");

	ctx = canvas.getContext('2d');
	stage = new createjs.Stage("gameCanvas");
}

//Start game function, handles generation of map and players
function startGame() {
	// Create player1(mario) spritesheet object
	player1Sheet = new createjs.SpriteSheet({
		images: [player1SS],
		frames: {
			//Set dimensions and number of frames
			width: 16,
			height: 30,
			count: 9,
		},
		animations: {
			stand: [0], //Single frame animations
			standLeft: [4],
			standRight: [1],
			walkLeft: {
				frames: [5, 4], //Multiple frame animations
				speed: 0.2 //0.2x normal playback speed
			},
			walkRight: {
				frames: [2, 1],
				speed: 0.2
			},
			jumpLeft: [7],
			jumpRight: [8],
		}
	});

	player2Sheet = new createjs.SpriteSheet({
		images: [player2SS],
		frames: {
			//Set dimensions and number of frames
			width: 32,
			height: 32,
			count: 7,
		},
		animations: {
			stand: [0], //Single frame animations
			standLeft: [3],
			standRight: [1],
			walkLeft: {
				frames: [4, 3], //Multiple frame animations
				speed: 0.2 //0.2x normal playback speed
			},
			walkRight: {
				frames: [2, 1],
				speed: 0.2
			},
			jumpLeft: [5],
			jumpRight: [6],
		}
	});

	bulletSheet = new createjs.SpriteSheet({
		images: [bulletSS],
		frames: {
			width: 32,
			height: 32,
			count: 4,
		},
		animations: {
			fire: [0],
		}
	});

	tileSheet = new createjs.SpriteSheet({
		images: [tileSS],
		frames: {
			width: 32,
			height: 32,
			count: 3,
		},
		animations: {
			backgroundTile: [0],
			wallTile: [1],
			platformTile: [2],
		}
	});

	powerupSheet = new createjs.SpriteSheet({
		images: [powerupSS],
		frames: {
			width: 32,
			height: 32,
			count: 3,
		},
		animations: {
			HP: [0],
			moveSpeed: [1],
			jumpHeight: [2]
		}

	});

	mapRenderer(currentMap, tileSheet);

	//Create player objects
	generatePlayer(player1_name, 100, 250, 1, 1, 1, 0, 12, 20, 162, 0, 512, Key.A, Key.D, Key.W, Key.SPACE);
	generatePlayer(player2_name, 300, 300, 1, 1, 1, 0, 12, 20, 314, 312, 512, Key.LEFT_ARROW, Key.RIGHT_ARROW, Key.UP_ARROW, Key.L);

	//Create easelJS player sprite objects
	generateSprite("player1Sprite", "player", player1Sheet, playerList[0], "stand");
	generateSprite("player2Sprite", "player", player2Sheet, playerList[1], "stand");

	generatePowerup(powerupSheet, 1, 1);



	var targetLabel = new createjs.Text("Target:" + killTarget);
	targetLabel.x = 232;
	targetLabel.y = (512 + mapTileHeight / 2) - 3;
	stage.addChild(targetLabel);

	//Create ticker/gameloop
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);

}

function replay() {
	playerList = [];
	spriteList = [];
	createGameView();
	startGame();
}

//Generate map function, takes 2d array of map tiles
function mapRenderer(map, tilesheet) {

	mapRenderer.createTile = function(xArray, yArray, tile, traversable) {
		//Create game logic tile object
		var newTile = {
			width: mapTileWidth,
			height: mapTileHeight,
			x: xArray * mapTileWidth,
			y: yArray * mapTileHeight,
			xArray: xArray,
			yArray: yArray,
			bounds: null,
			traversable: traversable
		};

		tileList.push(newTile);

		//Create tile sprite object to be displayed on canvas
		generateSprite('tile', 'tile', tilesheet, newTile, tile);
		newTile.bounds.x = newTile.x;
		newTile.bounds.y = newTile.y;
		stage.update();
	};

	//Iterate through 2d array to generate tiles in correct location
	for (var yLoop = 0; yLoop < map.length; yLoop++) { // 'y direction' loop
		var tiles = map[yLoop];
		for (var xLoop = 0; xLoop < tiles.length; xLoop++) { // 'x direction' loop
			switch (tiles[xLoop]) {
				case 0: //Wall
					mapRenderer.createTile(xLoop, yLoop, "wallTile", false);
					break;
				case 1: //backGround
					mapRenderer.createTile(xLoop, yLoop, "backgroundTile", true);
					break;
				case 2: //platform
					mapRenderer.createTile(xLoop, yLoop, "platformTile", false);
					break;
				default:
					break;
			}
		}
	}
}

//Entity and Sprite generation functions
function generatePlayer(name, x, y, scaleX, scaleY, maxXVel, yVel, maxJump, maxHP, KDLabelX, healthBarX, healthBarY, leftKey, rightKey, jumpKey, attackKey) {
	//Create local newPlayer
	var newPlayer = {
		name: name,
		//Position of player
		x: x,
		y: y,
		scaleX: scaleX,
		scaleY: scaleY,
		//Player x,y velocities for movement
		xVel: maxXVel,
		maxXVel: maxXVel,
		yVel: yVel,
		maxJump: maxJump,
		movingDir: 'STOP',
		falling: null,
		facingDir: null,
		onGround: false,
		tileBeforeJump: null,
		jumping: false,
		sideCollide: false,
		animating: false,
		canFire: true,
		lastFired: null,
		currentShots: null,
		bounds: null,
		maxHP: maxHP,
		currentHP: maxHP,
		powerupActive: false,
		activePowerup: null,
		powerupTime: null,
		alive: true,
		respawning: false,
		rightCollide: false,
		leftCollide: false,
		topCollide: false,
		bottomCollide: false,
		collidingTileBounds: null,
		killCount: 0,
		deathCount: 0,
		healthBar: new createjs.Shape(),
		KDLabel: new createjs.Text()
	};

	newPlayer.moveLeft = function() {
		this.facingDir = 'LEFT';
		this.movingDir = 'LEFT';
		this.x -= this.xVel;
		collision(this);
		var tileBounds = this.collidingTileBounds;
		if (tileBounds.y != 0) {
			if (this.leftCollide) {
				if (this.bottomCollide) {
					this.x = tileBounds.x;
				}
				else {
					this.x = tileBounds.x + tileBounds.width;
				}
			}
		}
	};

	newPlayer.moveRight = function() {
		this.facingDir = 'RIGHT';
		this.movingDir = 'RIGHT';
		this.x += this.xVel;
		collision(this);
		var tileBounds = this.collidingTileBounds;
		if (tileBounds.y != 0) {
			if (this.rightCollide) {
				//Prevent clipping through block when collidingTileBounds is one tile more than visually
				//Caused by looping through tiles and checking collision when bounding box collides with 3 tiles
				if (this.x - this.bounds.width < tileBounds.x) {
					this.x = tileBounds.x - this.bounds.width;
				}
				else {
					this.x = (tileBounds.x + tileBounds.width) - this.bounds.width;
				}
			}
		}
	};

	newPlayer.startJump = function() {
		this.movingDir = 'JUMP';
		if (this.onGround) {
			this.yVel = -this.maxJump;
			this.jumping = true;
			this.falling = false;
			this.onGround = false;
			this.xVel *= 2; //Increase horizontal movement for improved mechanics
		}
	};

	newPlayer.endJump = function() {
		if (this.yVel < -5) { //If player is still  ascending in jump
			this.yVel = 5; //Limit the speed of  ascent
		}
		this.jumping = false;
		this.falling = true;
	};

	newPlayer.moveStop = function(faceFront) {
		this.movingDir = 'STOP';
		if (faceFront) {
			this.facingDir = 'FRONT';
		}
	};

	newPlayer.attack = function() {
		if (this.canFire == true) {
			this.canFire = false;
			this.lastFired = Date.now() / 1000;
			this.currentShots++;
			generateBullet(this, 0.7, 0.7, 5, bulletSheet);
		}
		//If it has been > 1s since last shot and less than 5 are currently on canvas
		if ((Date.now() / 1000) - this.lastFired >= 1 && this.currentShots < 5) {
			this.canFire = true;
		}
	};

	newPlayer.takeDamage = function(bulletOwner) {
		this.currentHP -= 10; //Reduce HP
		updateHealthbar(this, healthBarX, healthBarY);
		if (this.currentHP <= 0) { //If HP reaches 0, player dies
			this.alive = false;
			this.deathCount += 1;

			bulletOwner.killCount += 1;

			if (this.deathCount == killTarget) {
				endGame(bulletOwner);
			}
			this.respawn();
		}
	};

	newPlayer.respawn = function() {
		this.movingDir = 'STOP';
		this.facingDir = 'FRONT';
		this.respawning = true;
		this.x = 400;
		this.currentHP = this.maxHP;
		updateHealthbar(this, healthBarX, healthBarY);
		this.alive = true;
	};

	newPlayer.addPowerup = function(powerup) {
		switch (powerup.type) {
			case 'HP':
				this.currentHP = this.maxHP; //Refill HP
				updateHealthbar(newPlayer, healthBarX, healthBarY);
				break;
			case 'moveSpeed':
				this.activePowerup = powerup.type;
				this.powerupActive = true;
				this.powerupTime = Date.now() / 1000;
				this.maxXVel *= 2; //Double xVelocity
				break;
			case 'jumpHeight':
				this.activePowerup = powerup.type;
				this.powerupActive = true;
				this.powerupTime = Date.now() / 1000;
				this.maxJump *= 1.5; //50% increase maxJump height
				break;
			default:
				break;
		}
	};

	newPlayer.update = function() {
		//Movement functions called depending on key press + key release data
		if (Key.isDown(leftKey)) {
			this.moveLeft();
		}
		if (Key.isUp(leftKey)) {
			this.moveStop();
		}
		if (Key.isDown(rightKey)) {
			this.moveRight();
		}
		if (Key.isDown(rightKey) && Key.isDown(leftKey)) {
			this.moveStop(true);
		}
		if (Key.isDown(jumpKey)) {
			this.startJump();
		}
		if (Key.isUp(jumpKey)) {
			this.endJump();
		}
		if (Key.isDown(attackKey)) {
			this.attack();
		}

		if (this.powerupActive) {
			if ((Date.now() / 1000) - this.powerupTime >= 5) { //If 5sec since powerup activated
				switch (this.activePowerup) {
					case 'moveSpeed':
						this.activePowerup = null;
						this.powerupActive = false;
						this.maxXVel /= 2;
						this.xVel = maxXVel; //Reset xVel
						break;
					case 'jumpHeight':
						this.activePowerup = null;
						this.powerupActive = false;
						this.maxJump = maxJump; //Reset jump height
						break;
					default:
						break;
				}
			}
		}

		this.yVel += gravity;
		this.y += this.yVel;

		collision(this);
		var tileBounds = this.collidingTileBounds;
		if (tileBounds != null) {
			if (this.bottomCollide && this.jumping == false && this.collidingTileBounds.y != 0) {
				this.y = tileBounds.y - tileBounds.height; //'undo' the last vertical movement
				this.yVel = 0; //Stop vertical movement
				this.xVel = this.maxXVel; //Reset xVel after increase from startJump()
				this.falling = false;
				this.onGround = true;
			}
		}

		if (this.topCollide) {
			this.y = tileBounds.y + this.bounds.height + 5;
			this.falling = true;
		}

		if (this.yVel > 0 && this.onGround == false) { //+ve yVel = character moving 'down' the canvas therefore falling
			this.falling = true;
			this.jumping = false;
		}
		//Update player bounds for collision detection
		this.bounds.x = this.x;
		this.bounds.y = this.y;
		newPlayer.KDLabel.text = "K:D " + newPlayer.killCount + ":" + newPlayer.deathCount;
	};

	// /newPlayer.KDLabel.text = "K:D " + newPlayer.killCount + ":" + newPlayer.deathCount;
	newPlayer.KDLabel.x = KDLabelX;
	newPlayer.KDLabel.y = (512 + mapTileHeight / 2) - 3;
	newPlayer.KDLabel.font = 'PressStart2P';
	stage.addChild(newPlayer.KDLabel);

	updateHealthbar(newPlayer, healthBarX, healthBarY);
	//add local newPlayer to playerList
	playerList.push(newPlayer);
}

function generateBullet(playerFired, scaleX, scaleY, xVel, spritesheet) {
	//Create new local variable newBullet
	if (playerFired.facingDir == 'RIGHT') {
		scaleX *= -1;
		xVel *= -1;
	}

	var newBullet = {
		owner: playerFired,
		x: playerFired.x,
		y: playerFired.y,
		scaleX: scaleX,
		scaleY: scaleY,
		xVel: xVel,
		spriteSheet: spritesheet,
		movingDir: playerFired.facingDir,
		spawnTime: Date.now() / 1000,
		animating: false,
		bounds: null
	};

	newBullet.move = function() {
		if (this.x >= canvas.width || this.x - this.bounds.width <= mapTileWidth) { //Within horizontal canvas boundaries
			this.xVel *= -1; //Velocity in opposite direction
			this.scaleX *= -1; //Flip horizontally
		}

		this.x += this.xVel;
		this.bounds.x = this.x;
		this.bounds.y = this.y;
	};

	newBullet.update = function() {
		//Check is 5s or more has passed
		if ((Date.now() / 1000) - this.spawnTime >= 5) {
			removeBullet(this);
		}
		//Collision and movement handling
		else {
			//if bullet and player other than player who fired collide:
			for (var key in playerList) {
				if (checkCollision(this.bounds, playerList[key].bounds) && playerList[key] != this.owner) {
					playerList[key].takeDamage(this.owner);
					removeBullet(this);
				}
			}
			if (checkTileCollision(this.bounds)) {
				this.x -= this.xVel;
				this.xVel *= -1;
				this.scaleX *= -1;
			}
			this.move();
		}
	};

	//add local newBullet to bulletList
	bulletList.push(newBullet);
	generateSprite(newBullet.owner, "bullet", newBullet.spriteSheet, newBullet, "fire");
}

function generatePowerup(spriteSheet, scaleX, scaleY) {

	generatePowerup.selectLocation = function(powerup) {
		//Generate random int to use in powerupX/YLocations arrays to randomise spawnpoint
		if (currentMap == map1) {
			var xLocations = powerupXLocations_map1;
			var yLocations = powerupYLocations_map1;
		}
		else if (currentMap == map2) {
			xLocations = powerupXLocations_map2;
			yLocations = powerupYLocations_map2;
		}
		var locationArrayIndex = Math.floor(Math.random() * xLocations.length);
		var locationAvailable = true; //Bool to track if array location already used - prevent overlapping spawn
		if (powerupList.length >= 0) {
			//Check whether locationArrayIndex above is already used for another powerup
			for (var key in powerupList) {
				if (powerupList[key].locationArrayIndex == locationArrayIndex) {
					locationAvailable = false;
				}
			}
			if (locationAvailable) {
				powerup.locationArrayIndex = locationArrayIndex;
				powerup.x = xLocations[locationArrayIndex];
				powerup.y = yLocations[locationArrayIndex];
			}
			else {
				//If locationArrayIndex already used, recur function to find available location
				generatePowerup.selectLocation(powerup);
			}
		}
	};

	//Create new local powerup object
	var newPowerup = {
		//Generate random int and use as index for powerupTypes array to select a type
		type: powerupTypes[Math.floor(Math.random() * powerupTypes.length)],
		locationArrayIndex: null, //Index used in locations arrays to produce x and y
		x: null,
		y: null,
		scaleX: scaleX,
		scaleY: scaleY,
		spriteSheet: spriteSheet,
		spawnTime: Date.now() / 1000,
		bounds: null
	};

	generatePowerup.selectLocation(newPowerup);

	newPowerup.update = function() {
		//powerup despawn after 5 seconds
		if ((Date.now() / 1000) - this.spawnTime >= 5) {
			removePowerup(this);
		}
		else {
			//Check whether a player has collided with the powerup
			for (var key in playerList) {
				if (checkCollision(this.bounds, playerList[key].bounds)) {
					playerList[key].addPowerup(this);
					removePowerup(this);
				}
			}
		}
	};

	generateSprite(null, 'powerup', newPowerup.spriteSheet, newPowerup, newPowerup.type);
	newPowerup.bounds.x = newPowerup.x;
	newPowerup.bounds.y = newPowerup.y;
	powerupList.push(newPowerup);
	//Global variable to track last powerup generated
	prevPowerupTime = Date.now() / 1000;
}

function generateSprite(name, type, spriteSheet, entity, startAni) {

	if (type == "player") {
		//Create new local easelJS sprite object for player
		var newSprite = new createjs.Sprite(spriteSheet, startAni);

		//Set location and scale
		newSprite.x = entity.x;
		newSprite.y = entity.y;
		newSprite.scaleX = entity.scaleX;
		newSprite.scaleY = entity.scaleY;
		//add local newSprite to spriteList and add to canvas
		spriteList.push(newSprite);
		//Set bounds for width and height
		entity.bounds = newSprite.getBounds();
		//Make logical player object height equal to the mapTileHeight for collision between player and tiles
		if (entity.bounds.height != mapTileHeight) {
			entity.bounds.height += (mapTileHeight - entity.bounds.height);
		}
		stage.addChild(newSprite);
	}


	if (type == "bullet") {
		//Create new local easelJS sprite object for bullet
		var newSpriteBullet = new createjs.Sprite(spriteSheet, startAni);
		//Set location and scale
		newSpriteBullet.x = entity.x;
		newSpriteBullet.y = entity.y;
		newSpriteBullet.scaleX = entity.scaleX;
		newSpriteBullet.scaleY = entity.scaleY;
		//add local newSprite to spriteList and add to canvas
		bulletSpriteList.push(newSpriteBullet);
		//Set bounds for width and height
		entity.bounds = newSpriteBullet.getBounds();
		stage.addChild(newSpriteBullet);
	}

	if (type == "tile") {
		var newSpriteTile = new createjs.Sprite(spriteSheet, startAni);
		newSpriteTile.x = entity.x;
		newSpriteTile.y = entity.y;
		tileSpriteList.push(newSpriteTile);
		entity.bounds = newSpriteTile.getBounds();
		stage.addChild(newSpriteTile);
	}

	if (type == "powerup") {
		var newSpritePowerup = new createjs.Sprite(spriteSheet, startAni);
		newSpritePowerup.x = entity.x;
		newSpritePowerup.y = entity.y;
		powerupSpriteList.push(newSpritePowerup);
		entity.bounds = newSpritePowerup.getBounds();
		stage.addChild(newSpritePowerup);
	}
}

//Entity and Sprite update fucntions
function updatePlayers() {
	for (var key in playerList) {
		playerList[key].update();
	}
}

function updateBullets() {
	for (var key in bulletList) {
		bulletList[key].update();
	}
}

function updatePowerups() {
	for (var key in powerupList) {
		powerupList[key].update();
	}
}

function updateHealthbar(player, x, y) {
	if (x != 0) {
		player.healthBar.graphics.clear().beginFill('Green').beginStroke('Black').setStrokeStyle(1).rect(x += (512 - x) - (player.currentHP * 32) / 4, y, ((player.currentHP * 32) / 4), mapTileHeight);
	}
	else {
		player.healthBar.graphics.clear().beginFill('Green').beginStroke('Black').setStrokeStyle(1).rect(x, y, (player.currentHP * 32) / 4, mapTileHeight);
	}
	stage.addChild(player.healthBar);
}

function updatePlayerSprites(sprite, arrayLocation) {
	//Function matches sprite data to player data
	var player = playerList[arrayLocation];
	sprite.x = player.x;
	sprite.y = player.y;

	if (player.movingDir == 'STOP') { //When player is stopped, face left or right
		switch (player.facingDir) {
			case 'LEFT':
				player.animating = false;
				sprite.gotoAndPlay('standLeft');
				break;
			case 'RIGHT':
				player.animating = false;
				sprite.gotoAndPlay('standRight');
				break;
			case 'FRONT':
				player.animating = false;
				sprite.gotoAndPlay('stand');
				break;

			default:
		}
	}
	else {
		switch (player.movingDir) {
			case 'LEFT': //Only run if player is not jumping or animating
				if (player.onGround == true && player.animating == false) {
					player.animating = true;
					sprite.gotoAndPlay('walkLeft');
				}
				break;
			case 'RIGHT':
				if (player.onGround == true & player.animating == false) {
					player.animating = true;
					sprite.gotoAndPlay('walkRight');
				}
				break;
			case 'JUMP':
				if (player.facingDir == 'LEFT') { //Change jump animation based on direction facing
					player.animating = false;
					sprite.gotoAndPlay('jumpLeft');
				}
				if (player.facingDir == 'RIGHT') {
					player.animating = false;
					sprite.gotoAndPlay('jumpRight');
				}
				break;
			default:
				break;
		}
	}
}

function updateBulletSprites(sprite, arrayLocation) {
	var bullet = bulletList[arrayLocation]; // Local variable for easy access to array
	sprite.x = bullet.x;
	sprite.scaleX = bullet.scaleX;
}

//Remove bullet instance from game 
function removeBullet(bullet) {
	//Get array location of bullet
	var index = bulletList.indexOf(bullet);
	if (index > -1) {
		bulletList[index].owner.currentShots -= 1;
		bulletList.splice(index, 1); //Remove bullet from bulletList
		stage.removeChild(bulletSpriteList[index]); //Remove bullet sprite object from stage
		bulletSpriteList.splice(index, 1); // Remove bullet sprite object from bulletSpriteList
	}
}

//Remove powerup instance from game
function removePowerup(powerup) {
	var index = powerupList.indexOf(powerup); //Find array location of powerup
	if (index > -1) {
		powerupList.splice(index, 1); //Remove powerup object from array
		stage.removeChild(powerupSpriteList[index]); //Remove powerup sprite from canvas
		powerupSpriteList.splice(index, 1); //Remove powerup sprite object from array
	}
}

//Player and tile collision detection function
function collision(object) {
	//Reset collision variables
	object.topCollide = false;
	object.bottomCollide = false;
	object.leftCollide = false;
	object.rightCollide = false;

	//Calculate map array location of object
	var objectTileArrayLocationX = Math.floor(object.bounds.x / 32);
	var objectTileArrayLocationY = Math.floor(object.bounds.y / 32);

	//Loop through tiles which would cause collision
	for (var key in tileList) {
		//Only check collision on map tiles on left, right, above and below the players tile
		if (tileList[key].xArray <= objectTileArrayLocationX + 1 && tileList[key].xArray >= objectTileArrayLocationX - 1 &&
			tileList[key].yArray <= objectTileArrayLocationY + 1 && tileList[key].yArray >= objectTileArrayLocationY - 1) {
			if (tileList[key].traversable == false) {

				//Bounds reference variables
				var objectBounds = object.bounds;
				var tileBounds = tileList[key].bounds;

				//Coords of object centre
				var objectCentreX = objectBounds.x + (objectBounds.width / 2);
				var objectCentreY = objectBounds.y + (objectBounds.height / 2);

				//Coords of tile centre
				var tileCentreX = tileBounds.x + (tileBounds.width / 2);
				var tileCentreY = tileBounds.y + (tileBounds.width / 2);

				//Calculate Minkowski sum of object rectangle and tile rectangle
				//Variables represent the Minkowski sum rectangle properties
				var w = 0.5 * (objectBounds.width + tileBounds.width); //Width
				var h = 0.5 * (objectBounds.height + tileBounds.height); //Height
				var dx = objectCentreX - tileCentreX; //X coord
				var dy = objectCentreY - tileCentreY; // Y coord

				//Compare object centre relative to minkowski rectangle to determine collision
				if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
					//Collsion!

					//Calculate diagonals of minkowski rectangle
					var wy = w * dy;
					var hx = h * dx;

					//Compare centre of object relative to minkowski digaonals
					//Determines collision direction
					if (wy > hx) {
						if (wy > -(hx)) {
							//Top Collision
							object.topCollide = true;
						}
						else {
							//Right Collision
							object.rightCollide = true;
						}
					}
					else {
						if (wy > -(hx)) {
							//Left collision
							object.leftCollide = true;
						}
						else {
							//Bottom Collision
							object.bottomCollide = true;
						}
					}
					//Update object current colliding tile
					object.collidingTileBounds = tileBounds;
				}
			}
		}
	}
}

function checkTileCollision(objectBounds) {
	for (var key in tileList) { //Iterate through list of tiles
		if (tileList[key].traversable == false) { //Don't run check on unecessary blocks
			var tileBounds = tileList[key].bounds;
			if (objectBounds.x < tileBounds.x + tileBounds.width &&
				objectBounds.x + objectBounds.width > tileBounds.x &&
				objectBounds.y < tileBounds.y + tileBounds.height &&
				objectBounds.height + objectBounds.y > tileBounds.y) {
				return true;
			}
		}
	}
	return false;
} //Basic collision for non player objects and tiles (bullets)

function checkCollision(rect1, rect2) {
	if (rect1.x >= rect2.x + rect2.width ||
		rect1.x + rect1.width <= rect2.x ||
		rect1.y >= rect2.y + rect2.height ||
		rect1.y + rect1.height <= rect2.y) {
		return false;
	}
	return true;
}

function endGame(winner) {
	createjs.Ticker.off("tick", tick);
	document.body.innerHTML = "";

	var h = document.createElement('h1');
	var t = document.createTextNode("Good Fight?");
	h.appendChild(t);
	h.id = "mainTitle";
	document.body.appendChild(h);

	h = document.createElement('h1');
	t = document.createTextNode(winner.name + " wins!");
	h.appendChild(t);
	h.id = "subTitle";
	document.body.appendChild(h);

	a = document.createElement('a');
	t = document.createTextNode("Replay");
	a.appendChild(t);
	a.setAttribute("class", "button");
	a.setAttribute("onClick", "replay();");
	document.body.appendChild(a);

	a = document.createElement('a');
	t = document.createTextNode("Main Menu");
	a.appendChild(t);
	a.setAttribute("class", "button");
	a.setAttribute("href", "mainMenu.html");
	document.body.appendChild(a);
}

function setVars() {
	var map = document.getElementById("_level");
	var _m = map.options[map.selectedIndex].value;
	var kills = document.getElementById("_kills");
	var _k = kills.options[kills.selectedIndex].value;
	player1_name = document.getElementById("player1_name").value;
	player2_name = document.getElementById("player2_name").value;
	init(window[_m], parseInt(_k, 10));
}

function randomiseGameVars() {
	var mapNumber = Math.floor(Math.random() * 2) + 1;
	switch (mapNumber) {
		case 1:
			currentMap = map1;
			break;
		case 2:
			currentMap = map2;
			break;
		default:
			break;
	}
	killTarget = Math.floor(Math.random() * 20) + 1;
	init(currentMap, killTarget);
}
//EaselJS tick event (game loop)
function tick(event) {
	updatePlayers();
	updateBullets();
	updatePowerups();

	//Add new powerup to game if correct time has passed
	if ((Date.now() / 1000 - prevPowerupTime) >= powerupSpawnFreq) {
		generatePowerup(powerupSheet, 1, 1);
	}

	for (var key in spriteList) {
		updatePlayerSprites(spriteList[key], key);

	}

	if (bulletSpriteList.length != 0) {
		for (var key in bulletList) {
			updateBulletSprites(bulletSpriteList[key], key);
		}
	}
	stage.update();

}