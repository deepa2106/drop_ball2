$(function() {
  console.log("DOM is loaded");
  function reset() {
    $(".line").animate({top: '-1000px'}, 4000, reset);
  }
  reset();
});
