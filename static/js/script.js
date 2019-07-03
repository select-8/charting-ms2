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


    // $(function () {
    $('svg').on("click", function () {
        // var clicked_svg = $(this).val();

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
        console.log(getValues()[0]);
        console.log(getValues()[1]);
        console.log(getValues()[2]);

        const arr = getValues();
        console.log('this is const arr = getValues(): ' + arr);
        console.log('this is typeOf arr: ' + typeof arr);
        let order = [];
        let minmax = [];
        let max = Math.max(...arr);
        let max_i = arr.indexOf(Math.max(...arr)) + 1;
        let min = Math.min(...arr);
        let min_i = arr.indexOf(Math.min(...arr)) + 1;
        minmax.push(max);
        minmax.push(min);
        const middle = $(arr).not(minmax).get();
        let middle_i = arr.indexOf(middle);
        order.push(max_i);
        order.push(middle_i);
        order.push(min_i);

        //https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript

        console.log('this is var middle: ' + middle);
        console.log('this is indexOf middle: ' + middle_i);
        console.log('this is arr.indexOf(33.29): ' + arr.indexOf(33.29));
        console.log('this is typeOf middle_i: ' + typeof middle_i);
        console.log('Im getting middle this way: let middle = $(arr).not(minmax).get(); Resulting in: ' + $(arr).not(minmax).get());
        console.log('this is order[]: ' + order);


        var container = $("#percentage-boxes");
        var children = container.children();
        container.empty();
        for (var i = 0; i < order.length; i++) {
            container.append(children[order[i] - 1])
        }
    });
    // https://stackoverflow.com/questions/929519/dynamically-arranging-divs-using-jquery
    // var order_div = [3, 2, 1];
    // var container = $("#percentage-boxes");
    // var children = container.children();
    // container.empty();
    // for (var i = 0; i < order_div.length; i++) {
    //     container.append(children[order_div[i] - 1])
    // }

});