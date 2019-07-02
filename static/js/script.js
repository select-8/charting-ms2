$(document).ready(function () {


    $(".intro-text").click(function () {
        $("#symbol-rep").hide();
        window.location.href = "index.html";
        $(".change-text").remove();
    });

    var percentAnd = document.getElementById("percent-of-and").outerText;
    console.log(percentAnd);
    var percentOr = document.getElementById("percent-of-or").outerText;
    console.log(percentOr);
    var percentNot = document.getElementById("percent-of-not").outerText;
    console.log(percentNot);

});


