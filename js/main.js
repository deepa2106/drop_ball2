$(function() {
  console.log("DOM is loaded");
  function reset() {
    $(".line").animate({top: '-1500px'}, 7000);
  }

  $(document).keydown(function(e) {
    if(e.keyCode == 37){
      console.log("test");
        $(".circle").animate({marginLeft: "-=15px"}, 5 );
    }
  });
  reset();
});
