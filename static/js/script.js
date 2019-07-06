$(document).ready(function () {
//variable should be cached for performance
    const p = $('#para1');
    p.hide();
    $("#button1").click(function () {
        p.slideToggle("slow")
    });

    // var svg = d3.select("#stacked-choice").append("svg")
    // .attr("top", 200)
    // .attr("height", 200);

    // $("svg").css({top: 0, left: 0, position:'absolute'});

});