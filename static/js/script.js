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
        // console.log(counter);
    };

    setTimeout(function () {
        clearInterval(instT)
    }, 2000);
    setTimeout(function () {
        clearInterval(instS)
    }, 2000);

    // something needs to happen for initial load
    $('svg').on("click", function () {
        function getValues() {
            let precentOfVals = [];
            let cleanVals = [];
            let pos1 = document.getElementById("para-pos-1").innerText.slice(0);
            let pos2 = document.getElementById("para-pos-2").innerText.slice(0);
            let pos3 = document.getElementById("para-pos-3").innerText.slice(0);
            precentOfVals.push(pos1);
            precentOfVals.push(pos2);
            precentOfVals.push(pos3);
            let newPos1 = precentOfVals.slice(0)[0];
            let newPos2 = precentOfVals.slice(0)[1];
            let newPos3 = precentOfVals.slice(0)[2];
            let cleanPos1 = Number(newPos1.split(":").pop().split('%')[0].trim());
            let cleanPos2 = Number(newPos2.split(":").pop().split('%')[0].trim());
            let cleanPos3 = Number(newPos3.split(":").pop().split('%')[0].trim());
            cleanVals.push(cleanPos1);
            cleanVals.push(cleanPos2);
            cleanVals.push(cleanPos3);
            return cleanVals;
        }
        // console.log(getValues()[0]);
        // console.log(getValues()[1]);
        // console.log(getValues()[2]);

        const arr = getValues();
        console.log('this is const arr = getValues(): ' + arr);
        console.log('this is typeOf arr: ' + typeof arr);
        let max = Math.max(...arr);
        let min = Math.min(...arr);
        let max_i = arr.indexOf(max);
        let min_i = arr.indexOf(min);
        console.log(max_i, min_i);
        let mid_i = (max_i + min_i === 3) ? 0 : (max_i + min_i === 2) ? 1 : 2; // thanks johnL3_alumni
        // something needs to happen two values are the same!!!
        let order = [max_i, mid_i, min_i];
        console.log(order);
        // let middle = arr.indexOf(mid_i);
        // console.log(middle);
        // https://stackoverflow.com/questions/929519/dynamically-arranging-divs-using-jquery
        var container = $("#percentage-boxes");
        var children = container.children();
        container.empty();
        for (var i = 0; i < order.length; i++) {
            container.append(children[order[i]])
        }
    });
});