Fruit = function() {

	this.x = 0;
	this.y = 0;
	// Specifies type of fruit
	// 0 = 10 points and pink
	// 1 = 20 points and orange
	// 2 = 50 points and green
	this.type = 0; 	

	this.generatePos = function() {
		this.x = Math.floor(Math.random() * cols) * SCALE;
		this.y = Math.floor(Math.random() * rows) * SCALE;
		var probableType = Math.random();

		switch (true) {
			case probableType < .6:
				this.type = 0;
				break;
			case probableType < .9:
				this.type = 1;
				break;
			case probableType < 1:
				this.type = 2;
				break;
		};
		for (var i = 0; i < snake.length - 1; i++) {
			if (snake.tail[i][0] === this.x && snake.tail[i][1] === this.y) {
				this.generatePos();
			}
		}
		// console.log(probableType);
		// console.log(this.type);
	}

	this.draw = function(ctx) {
		switch (this.type) {
			case 0:
				ctx.fillStyle = "#f0f";
				break;
			case 1:
				ctx.fillStyle = "#fa0";
				break;
			case 2:
				ctx.fillStyle = "#0c0";
				break;
		};
		ctx.fillRect(this.x, this.y, SCALE, SCALE)
	}

	this.addToTail = function() {
		snake.length++;
		snake.tail.push([snake.tail[snake.tail.length - 1][0], snake.tail[snake.tail.length - 1][1]]);
	}

	this.check = function() {
		if (this.x > cols * SCALE || this.y > rows * SCALE) {
			this.generatePos();
		}

		// Check for snake collisions
		if (snake.x === this.x && snake.y === this.y) {
			switch (this.type) {
				case 0:
					this.addToTail();
					score = score + 10;
					break
				case 1:
					this.addToTail();
					this.addToTail();
					score = score + 20;
					break;
				case 2:
					this.addToTail();
					this.addToTail();
					this.addToTail();
					this.addToTail();
					this.addToTail();
					score = score + 50;
					break;
			}
			this.generatePos();
		}

	}

}