$("#allGraphs").hide();


$(document).ready(function () {

    // $("#allGraphs").hide();

    $("#intro-text").click(function () {
        $(".change-text").remove();
        $(".symbol-span").hide();
        $("#allGraphs").show();
    });

    $("#intro-symbol").click(function () {
        $(".change-text").remove();
        $(".text-span").hide();
        $("#allGraphs").show();
    });

    var text = ["AND", "&#8239;OR&nbsp;&#8239;", "NOT"];
    var symbol = ["&nbsp;&&nbsp;", "&nbsp;||&nbsp;", "&#8239;&#8239;!&#8239;&#8239;&#8239;"];
    var counter = 0;
    var elemT = document.getElementById("changeText");
    var elemS = document.getElementById("changeSymbol");
    var instT = setInterval(changeT, 100);
    var instS = setInterval(changeS, 100);


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

    setTimeout(function(){ clearInterval(instT) }, 20000);
    setTimeout(function(){ clearInterval(instS) }, 20000);

    var percentAnd = document.getElementById("percent-of-and").outerText;
    console.log(percentAnd);
    var percentOr = document.getElementById("percent-of-or").outerText;
    console.log(percentOr);
    var percentNot = document.getElementById("percent-of-not").outerText;
    console.log(percentNot);

});
