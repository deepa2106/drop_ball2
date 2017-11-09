$(function() {
  // Variable to keep track of score
  var score = 0;
  // Vairable to keep track of player 1 Score.
  var player1 = 0;
  // Variable to set animation time
  var time = 24000;


  // Function to start game when game is over
  function gameOver() {
    $('.line').stop();
    $("#restart").css("display", "inline-block");
    $("aside").show().html("<h1>Game over!</h1>");
    $("#restart").click(reset);
  }

  function reset() {
    $("#restart").css("display", "none");
    $("aside").css("display", "none");
    // var initialContent = $(".container").html();
    // Reset score to 0
    player1 = score;
    score = 0;
    // Reset animation time back to 24000ms
    time = 24000;
    $(".container").empty();
    $(".container").append("<p>Score: <span id='result'></span></p><button type='button' name='button' id='restart'>Restart</button><aside></aside>");
    start();
  }

  // Starts game by adding line position and transition
  function start() {
    // Function that adds all lines to html
    addLines();
    // Function to start the transition of the lines
    $(".line").animate({top: '-3000px'}, time);
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


  // Starts game
  // start();

  // Function to add lines
  function addLines() {
    $(".container").append("<div class='circle'></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-6 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-4 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-7 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-3 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-4 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-6 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-2 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-8 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-6 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-4 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-3 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-7 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-5 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-5 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-7 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-3 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-9 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-1 line 2'></div></div>");
    $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-8 line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-2 line 2'></div></div>");
  }

  // Function to show start button
  function startButton() {
    $("#start").click( function() {
      $("#start").fadeOut();
      $("aside").fadeOut();
      start();
    })
  }

  startButton();
});
