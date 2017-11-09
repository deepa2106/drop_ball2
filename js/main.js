$(function() {
  // Variable to keep track of score
  var score=0;
  // Variable to set animation time
  var time = 24000;

  var originalLines = $('.line').attr('style');
  // Function to start game when game is over
  function gameOver() {
    $('.line').stop();
    $('.line').attr('style',originalLines);
    $("#start").css("display", "inline-block").html("Restart");
    $("aside").css("display", "inline-block").html("<h1>Game over!</h1>");
    $("#start").click( function() {
      $("#start").css("display", "none");
      $("aside").css("display", "none");
      // Reload page to refresh div positions
      // location.reload();
      // Reset score to 0
      score = 0;
      // Reset animation time back to 24000ms
      time = 24000;
      start();
    });
  }

  // Function to start the transition of the lines
  function start() {
    $(".line").animate({top: '-3000px'}, time);
  }

  // Function to check if ball has collided with the line
  function collision($circle) {
    // Stores lines that are closest to the ball
    var $line1 = $('.1')[score];
    var $line2 = $('.2')[score];
    // Stores exact position of ball
    var circleLeft = $circle.offset().left;
    var circleTop = $circle.offset().top;
    var circleHeight = $circle.outerHeight();
    var circleWidth = $circle.outerWidth();
    var circleBottom = circleTop + circleHeight;
    var circleRight = circleLeft + circleWidth;
    // Stores exact position of line on the  left
    var line1Left = $line1.offsetLeft;
    var line1Top = $line1.offsetTop;
    var line1Width = $line1.offsetWidth;
    var line1Height = $line1.offsetHeight;
    var line1Right = line1Left + line1Width;
    var line1Bottom = line1Top + line1Height;
    // Stores exact position of line on the right
    var line2Left = $line2.offsetLeft;
    var line2Top = $line2.offsetTop;
    var line2Height = $line2.offsetHeight;
    var line2Bottom = line2Top + line2Height;
    // Returns score only if ball does not touch line
    if(line1Bottom <= circleTop && line2Bottom <= circleTop) {
      // Adds 1 to score when it passes through the gap
      score++;
    } else if (circleBottom < line1Top && circleBottom < line2Top) {
      return score;
    } else if(circleLeft > line1Right && circleRight < line2Left) {
      return score;
    } else {
      // Ends game when ball touches line
      // Sets time for animation to 0 to stop animation
      time = 0;
      gameOver();
    }
  }

  // Checks collision function every 1ms
  window.setInterval(function() {
    $('#result').text(collision($('.circle')))
  }, 1);

  // Ball moves when you click left key or right key
  $(document).keydown(function(e) {
    if(e.keyCode == 37){
      $(".circle").animate({marginLeft: "-=35px"}, 1 );
    }
    if(e.keyCode == 39){
      $(".circle").animate({marginLeft: "+=35px"}, 1 );
    }
  });

  // Starts game
  // start();

  // Function to show start button
  function startButton() {
    $("#start").click( function() {
      $("#start").css("display", "none");
      $("aside").css("display", "none");
      start();
    })
  }

  startButton();
});
