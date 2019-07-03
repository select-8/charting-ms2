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


    $(function () {
        $('svg').click(function () {


            function getValues() {
                var precentOfVals = [];
                var cleanVals = [];
                var pos1 = document.getElementById("pos-1").innerText.slice(0);
                var pos2 = document.getElementById("pos-2").innerText.slice(0);
                var pos3 = document.getElementById("pos-3").innerText.slice(0);
                precentOfVals.push(pos1);
                precentOfVals.push(pos2);
                precentOfVals.push(pos3);
                var newPos1 = precentOfVals.slice(0)[0];
                var newPos2 = precentOfVals.slice(0)[1];
                var newPos3 = precentOfVals.slice(0)[2];
                var cleanPos1 = Number(newPos1.split(":").pop().split('%')[0].trim());
                var cleanPos2 = Number(newPos2.split(":").pop().split('%')[0].trim());
                var cleanPos3 = Number(newPos3.split(":").pop().split('%')[0].trim());
                cleanVals.push(cleanPos1);
                cleanVals.push(cleanPos2);
                cleanVals.push(cleanPos3);
                return cleanVals;
            }
            // if (getValues[1] > getValues[2]) {
            //     console.log("you go top");
            // } else {
            //     return console.log("stay put");
            // }
            console.log(getValues());
        })

    })

});


// $(document).ready(function() {  

//     function resizeChanges(){
//        if(isMenuVisible() == true){
//           $('#my-nav').removeClass('navbar-fixed-bottom');
//           $('#my-nav').addClass('navbar-fixed-top');
//           $('body').css('padding-top', '50px');
//         }else{
//           $('#my-nav').removeClass('navbar-fixed-top');
//           $('#my-nav').addClass('navbar-fixed-bottom');
//           $('body').css('padding-top', '0');  
//         }   
//     }

//     $(window).resize(resizeChanges);

//     resizeChanges();
//    });