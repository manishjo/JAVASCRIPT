(function(){
  var canv = document.getElementById('myCanvas'),
      c = canv.getContext('2d'),
      gravity = 0.1,
      speedBreaker=0.99;
    
  var circle = {
    x: 500,
    y: 100,
    vx: 0,
    vy: 0,
    radius: 20
  };
  
  function clearCircle(){
    c.clearRect(0, 0, canv.width, canv.height);
  };
  
  function makingCircle(){
    c.fillStyle = "red";
    c.beginPath();
    c.arc(circle.x, circle.y, circle.radius,
          0, 360);
    c.closePath();
    c.fill();
  };

  function bounceBack(){
   if(circle.y + circle.radius > canv.height){
      circle.y=canv.height-circle.radius,
      circle.vy = -Math.abs(circle.vy);
    }
  };
  
  function executeFrame(){
    // Increment location by velocity
    circle.x += circle.vx;
    circle.y += circle.vy;

    // Increment Gravity
    circle.vy += gravity;

    //Slow down its speed
    circle.vy *=speedBreaker;
    circle.vx *=speedBreaker;


     bounceBack();

     clearCircle();

     makingCircle();

     requestAnimFrame(executeFrame);
  }
  executeFrame();

})();