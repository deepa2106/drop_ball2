$(function() {
  console.log("DOM is loaded");
  function reset() {
    $(".line").animate({top: '-1000px'}, 5000);
  }
  reset();
});
