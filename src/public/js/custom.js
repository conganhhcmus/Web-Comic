// change wish icon when click on
$('.wishlist').on('click', function() {
    $("i", this).toggleClass("bi bi-heart-click bi bi-heart");
});

// some custom functions

function submitNextForm() {
    //check condition
    const length=document.getElementById("select").length;
    let chap = document.getElementById("select").value-(-1);
    if(chap<=length)   
    {
        document.getElementById("select").value=chap;
        $('form').submit();
    }
}


function submitPrevForm() {    
    //check condition
    const length=document.getElementById("select").length;
    let chap = document.getElementById("select").value-1;
    if(chap>=1)
    {
        document.getElementById("select").value=chap;
        $('form').submit();
    }
}

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