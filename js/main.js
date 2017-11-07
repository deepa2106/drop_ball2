$(function() {
  console.log("DOM is loaded");
  function reset() {
    $(".line").animate({top: '-1500px'}, 10000);
  }

  $(document).keydown(function(e) {
    if(e.keyCode == 37){
      console.log("left");
      $(".circle").animate({marginLeft: "-=35px"}, 1 );
    }
    if(e.keyCode == 39){
      console.log("right");
      $(".circle").animate({marginLeft: "+=35px"}, 1 );
    }
  });
  reset();
});
