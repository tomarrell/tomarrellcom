$(function() {
  $("body").swipe({
    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
      var info = document.getElementsByClassName("info")[0];
      switch (direction) {
        case "left": // LEFT SWIPE
          if (snake.xvel != 1) {	
            snake.changeDir(-1, 0);
          }
          break;
        case "up": // UP SWIPE
          if (snake.yvel != 1) {	
            snake.changeDir(0, -1);
          }
          info.style.opacity = "0";
          break;
        case "right": // RIGHT SWIPE
          if (snake.xvel != -1) {	
            snake.changeDir(1, 0);
          }
          break;
        case "down": // DOWN SWIPE
          if (snake.yvel != -1) {	
            snake.changeDir(0, 1);
          }
          info.style.opacity = "0";
          break;
      }
    },
    threshold: 20
  });
});
