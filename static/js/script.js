$("#allGraphs").hide();
$("#leftSlide").hide();

$(document).ready(function () {

    // $("#allGraphs").hide();

    $("#intro-text").click(function () {
        $(".change-text").remove();
        $(".symbol-span").fadeOut(1000).hide();
        $("#allGraphs").show().fadeIn(1000);
        $("#leftSlide").show();
    });

    $("#intro-symbol").click(function () {
        $(".change-text").remove();
        $(".text-span").hide();
        $("#allGraphs").show();
        $("#leftSlide").show();
    });

    var text = ["AND", "&#8239;OR&nbsp;&#8239;", "NOT"];
    var symbol = ["&nbsp;&&nbsp;", "&nbsp;||&nbsp;", "&#8239;&#8239;!&#8239;&#8239;&#8239;"];
    var counter = 0;
    var elemT = document.getElementById("changeText");
    var elemS = document.getElementById("changeSymbol");
    var instT = setInterval(changeT, 175);
    var instS = setInterval(changeS, 175);


    function changeS() {
        elemS.innerHTML = symbol[counter];
        counter++;
        if (counter >= symbol.length) {
            counter = 0;
        }
    };

    function changeT() {
        elemT.innerHTML = text[counter];
        counter++;
        if (counter >= text.length) {
            counter = 0;
        }
        console.log(counter);
    };

    setTimeout(function () {
        clearInterval(instT)
    }, 2000);
    setTimeout(function () {
        clearInterval(instS)
    }, 2000);




    var percentAnd = document.getElementById("percent-of-and").outerText;
    console.log(percentAnd);
    var percentOr = document.getElementById("percent-of-or").outerText;
    console.log(percentOr);
    var percentNot = document.getElementById("percent-of-not").outerText;
    console.log(percentNot);

    var precentOfVals = [];

    $("#percentage-boxes").children().children().change(function() { console.log($(this).innerText()) });

});