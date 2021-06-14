var startQuizBtn = document.getElementById("startQuizBtn");

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

 startQuizBtn.addEventListener("click", function(){
    clearBox("firstRow");
 });