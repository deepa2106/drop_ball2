$(function() {
  // Variable to keep track of score
  var score = 0;
  // Variable to keep track of player 1 Score.
  var player1 = 0;
  // Variable to set animation time
  var time = 100000;
  // Variable to check player turn
  var firstPlayer = true;
  // Variable to check number of players
  var twoPlayers = true;
  // Variable to start animation
  var intervalId;

  // Function to start game when game is over
  function gameOver() {
    // Stops animations
    window.clearInterval(intervalId);
    $('.line').stop();
    $('.circle').stop();
    if(twoPlayers === false) {
      onePlayerGameOver();
    } else {
      twoPlayersGameOver();
    }
  }

  // Game over popup for 1 platyer game
  function onePlayerGameOver() {
    // Resets page after displaying score
    $(".line").fadeOut();
    $(".circle").fadeOut();
    $(".controls").fadeOut();
    $("#restart").css("display", "inline-block").html("Play again");
    $("aside").show().html("<h1>Game over!</h1>");
    $("aside").append("<h1>Score: " + score + "</h1>");
    $("#restart").click(reload);
  }

  // Game over popup for 2 player game
  function twoPlayersGameOver() {
    $(".line").fadeOut();
    $(".circle").fadeOut();
    $(".controls").fadeOut();
    $(".space").fadeOut();
    $(".row").fadeOut();
    // Condition to check if second player has played game
    if(firstPlayer === true) {
      player1 = score;
      $("#restart").css("display", "inline-block").html("Start");
      $("aside").show().html("<h1>Game over! Player 2, press start to begin</h1>");
      firstPlayer = false;
      $("#restart").click(reset);
    } else {
      $('.container').append('<aside></aside>');
      if(score > player1) {
        $("aside").show().html("<h1>Game over! Player 2 wins!</h1>");
      } else if (score < player1) {
        $("aside").show().html("<h1>Game over! Player 1 wins!</h1>");
      } else {
        $("aside").show().html("<h1>Game over! Player 1 and player 2 drew!</h1>");
      }
      $("#restart").css("display", "inline-block").html("Play again");
      $("#restart").click(reload);
    }
  }

  // Reloads page to restart game
  function reload() {
    location.reload();
  }

  // Resets divs on screen
  function reset() {
    $("#restart").fadeOut();
    $("aside").fadeOut();
    // Reset score to 0
    score = 0;
    // Reset animation time back to 100000ms
    time = 100000;
    $(".container").empty();
    $(".container").append("<p>Player 1: " + player1 + ", Score: <span id='result'></span></p>");
    $(".container").append("<button type='button' name='button' id='restart'>Restart</button>");
    start();
  }

  // Popup for when whole game is completed
  function gameComplete() {
    $(".line").fadeOut();
    $(".circle").fadeOut();
    $("#restart").css("display", "inline-block").html("Play again");
    $("aside").show().html("<h1>Congratulations! You have completed the game.</h1>");
    $("#restart").click(reset);
  }

  // Starts game by adding line position and transition
  function start() {
    // Function that adds all lines to html
    addLines();
    // Enable ball movement by controlButtons
    buttonMovement();
    // Function to start the transition of the lines
    $(".line").animate({top: '-15000px'}, time);
    // Checks collision function every 1ms
    intervalId = window.setInterval(function() {
      $('#result').text(collision($('.circle')))
    }, 1);

  }


  //Function to enable ball to move on key press
  function ballMovement() {
    $(document).keydown(function(e) {
      if(e.keyCode == 37){
        $(".circle").animate({marginLeft: "-=35px"}, 1);
      }
      if(e.keyCode == 39){
        $(".circle").animate({marginLeft: "+=35px"}, 1);
      }
    });
  }

  // Function to enable ball move on button click
  function buttonMovement() {
    $("#leftButton").click( function() {
      $(".circle").animate({marginLeft: "-=35px"}, 1);
    });
    $("#rightButton").click( function() {
      $(".circle").animate({marginLeft: "+=35px"}, 1);
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
    if(score === 50)
    {
      gameComplete();
    } else if(line1Bottom <= circleTop && line2Bottom <= circleTop) {
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

  // Function to add lines
  function addLines() {
    $(".container").append("<div class='controls'><button type='button' name='button' id='leftButton' class='controlButtons'>Left</button><button type='button' name='button' id='rightButton' class='controlButtons'>Right</button></div>");
    $(".container").append("<div class='circle'></div>");
    for (var i = 0; i < 50; i++) {
		  var pos1 = Math.floor((Math.random() * 10) + 1);
		  var pos2 = 10 - pos1;
      $(".container").append("<div class='row'><div class='col-xs-12 space'></div></div><div class='row'><div class='col-xs-" + pos1 + " line 1'></div><div class='col-xs-2 gap'></div><div class='col-xs-"+ pos2 + " line 2'></div></div>");
    }
  }

  // Function to show start button
  function startButton() {
    // Option for 1 player
    $("#1player").click( function() {
      $("#1player").fadeOut();
      $("#2players").fadeOut();
      $("aside").fadeOut();
      $('.title').fadeOut();
      twoPlayers = false;
      // Ball moves when you click left key or right key
      start();
      ballMovement();
    })
    // Option for 2 players
    $("#2players").click( function() {
      $("#1player").fadeOut();
      $("#2players").fadeOut();
      $("aside").fadeOut();
      $('.title').fadeOut();
      // Ball moves when you click left key or right key
      start();
      ballMovement();
    });
  }

  // start game
  startButton();
});
