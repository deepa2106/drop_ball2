$(function() {
  console.log("DOM is loaded");
  var score=0;


  function reset() {
    location.reload();
    score = 0;
    start();
  }

  function start() {
    $(".line").animate({top: '-3000px'}, 24000);
  }

  function collision($circle) {
    var $line1 = $('.1')[score];
    var $line2 = $('.2')[score];
    var circleLeft = $circle.offset().left;
    var circleTop = $circle.offset().top;
    var circleHeight = $circle.outerHeight(true);
    var circleWidth = $circle.outerWidth(true);
    var circleBottom = circleTop + circleHeight;
    var circleRight = circleLeft + circleWidth;
    var line1Left = $line1.offsetLeft;
    var line1Top = $line1.offsetTop;
    var line1Width = $line1.offsetWidth;
    var line1Height = $line1.offsetHeight;
    var line1Right = line1Left + line1Width;
    var line1Bottom = line1Top + line1Height;
    var line2Left = $line2.offsetLeft;
    var line2Top = $line2.offsetTop;
    var line2Height = $line2.offsetHeight;
    var line2Bottom = line2Top + line2Height;
    console.log("line1Top: " + line1Top);
      console.log("line2Top: " + line2Top);
      console.log("circleBottom: " + circleBottom);
    if(line1Bottom <= circleTop && line2Bottom <= circleTop) {
      score++;
    } else if (circleBottom <= line1Top && circleBottom <= line2Top) {
      return score;
    } else if(circleLeft >= line1Right && circleRight <= line2Left) {
      return score;
    } else {
      alert("Game over");
      reset();
    }
  }

  window.setInterval(function() {
    $('#result').text(collision($('.circle')))
  }, 1);

  $(document).keydown(function(e) {
    if(e.keyCode == 37){
      $(".circle").animate({marginLeft: "-=35px"}, 1 );
    }
    if(e.keyCode == 39){
      $(".circle").animate({marginLeft: "+=35px"}, 1 );
    }
  });
  start();
});

  var lines = {}
