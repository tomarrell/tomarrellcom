Snake = function(xPos, yPos) {
  if (!xPos) {
    var xPos = 0;
    var yPos = 0;
  }

  this.tail = [];
  this.length = 1;
  this.lockedInput = false;

  this.x = xPos;
  this.y = yPos;

  this.xvel = 1;
  this.yvel = 0;

  this.changeDir = function(xvel, yvel) {
    if (!this.lockedInput) {
      this.xvel = xvel;
      this.yvel = yvel;	
    }
    this.lockedInput = true;
  }

  this.update = function() {
    this.x = this.x + this.xvel * SCALE;
    this.y = this.y + this.yvel * SCALE;
    if (this.x < 0) { 								// Check for LEFT edge collision
      this.x = (cols - 1) * SCALE;
    }
    if (this.y < 0) {								// Check for TOP edge collision
      this.y = (rows - 1) * SCALE;
    }
    if (this.x > (cols - 1) * SCALE && this.xvel === 1) {		// Check for right edge
      this.x = 0;
    }
    if (this.y > (rows - 1) * SCALE && this.yvel === 1) {		// Check for bottom edge
      this.y = 0;
    }

    this.tail = this.tail.slice(0, length - 1);
    this.tail.unshift([this.x, this.y]);

    // console.log(this.tail);
    for (var i = 1; i < this.length - 1; i++) {
      if (collisions && this.x == this.tail[i][0] && this.y == this.tail[i][1]) {
        main();
      }
    } 

  }

  this.draw = function(ctx) {
    this.lockedInput = false;
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, SCALE, SCALE)
    if (this.length > 0) {
      for (var i = 1; i < this.length; i++) {
        ctx.fillRect(this.tail[i][0], this.tail[i][1], SCALE, SCALE)
      }
    }
  }

}
