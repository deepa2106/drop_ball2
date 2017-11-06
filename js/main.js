$(function() {
  console.log("DOM is loaded");
  function reset() {
    $(".first").slideUp(3000, function() {
      $(".second").slideUp(3000, reset);
    });
  }
  reset();
})
