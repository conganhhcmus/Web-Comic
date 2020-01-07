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