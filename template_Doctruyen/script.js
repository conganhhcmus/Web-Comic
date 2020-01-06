var scrollableElement = document.body; //document.getElementById('scrollableElement');

scrollableElement.addEventListener('wheel', checkScrollDirection);
var a = document.getElementById("chap");
function checkScrollDirection(event) {
  if (checkScrollDirectionIsUp(event)) {
    a.style.display = "block";
    a.style.position="fixed";
  } 
  else {
    a.style.display = "none";
  }
}

function checkScrollDirectionIsUp(event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0;
  }
  return event.deltaY < 0;
}