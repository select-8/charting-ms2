$("#allGraphs").hide();
$("#leftSlide").hide();

$(document).ready(function () {

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

    var text = ["AND","OR", "NOT"];
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
    }, 10000);
    setTimeout(function () {
        clearInterval(instS)
    }, 10000);


    $(window).on("load", function () {
        reorderMyData();
    });

    // something needs to happen for initial load

    $('svg').on("click", function () {
        reorderMyData();
    });

    // var svg = $('svg');

    // $(this.$('svg')).click(function () {
    //     reorderMyData();
    // });

    var reorderMyData = function () {
        let precentOfVals = [];
        let cleanVals = [];
        var pos1 = $('#percentage-boxes').children().eq(0).children()[0].innerText;
        var pos2 = $('#percentage-boxes').children().eq(1).children()[0].innerText;
        var pos3 = $('#percentage-boxes').children().eq(2).children()[0].innerText;
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
        const arr = cleanVals;
        console.log('this is const arr = getValues(): ' + arr);
        let max = Math.max(...arr);
        let min = Math.min(...arr);
        let max_i = arr.indexOf(max);
        let min_i = arr.indexOf(min);
        let mid_i = (max_i + min_i === 3) ? 0 : (max_i + min_i === 2) ? 1 : 2; // thanks johnL3_alumni
        let order = [max_i, mid_i, min_i];
        console.log(order);
        // return order;
        // https://stackoverflow.com/questions/929519/dynamically-arranging-divs-using-jquery
        var container = $("#percentage-boxes");
        var children = container.children();
        container.empty();
        for (var i = 0; i < order.length; i++) {
            container.append(children[order[i]])
        }
    }
});