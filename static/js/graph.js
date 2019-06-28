queue()
    .defer(d3.csv, "data/mydata.csv")
    .await(makeGraphs);

function makeGraphs(error, opData) {
    var ndx = crossfilter(opData);

    opData.forEach(function (d) {
        d.salary = parseInt(d.salary);
    })

    // show_op_selector(ndx);
    show_op_pie(ndx);
    get_and_show_country(ndx);
    // get_and_show_average_discipline(ndx);
    // get_and_show_average_genger(ndx);


    dc.renderAll();
    // console.log(opData);
}

function show_op_pie(ndx) {
    var dim = ndx.dimension(dc.pluck('logical_op'));
    var group = dim.group();

    dc.pieChart('#dis-pie')
        .height(330)
        .radius(360)
        .transitionDuration(1500)
        .dimension(dim)
        .group(group)
        .colors(d3.scale.ordinal().range(
            [ 'RED', 'BLUE', 'GREEN']))
        .legend(dc.legend().x(460).y(10).itemHeight(13).gap(10))
        .on('pretransition', function (d) {
            d.selectAll('text.pie-slice').text(function (d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        });
}

function get_and_show_country(ndx) {
    var dim = ndx.dimension(dc.pluck('country'));
    var group = dim.group();

    // console.log(group.all())
    var rowchart = dc.rowChart('#country-chart')
    rowchart
        .height(520)
        .margins({
            top: 5,
            left: 10,
            right: 10,
            bottom: 20
        })
        .elasticX(true)
        .dimension(dim)
        .group(group)
        .colors(d3.scale.category20())
        .xAxis().ticks(13);
}

// function show_bar_chart_countries(ndx) {
//     var dim = ndx.dimension(dc.pluck('discipline'));
//     var group = dim.group();
//     // var group = dim.group().reduceCount(dc.pluck('country'));

//     var bargraph = dc.barChart("#country-chart");
//     bargraph
//         .width(550)
//         .height(250)
//         .margins({
//             top: 10,
//             right: 50,
//             bottom: 30,
//             left: 50
//         })
//         .dimension(dim)
//         .group(group)
//         .transitionDuration(500)
//         .x(d3.scale.ordinal())
//         .xUnits(dc.units.ordinal)
//         .xAxisLabel("Country")
//         .yAxis().ticks(3);

//     bargraph.renderlet(function (chart) {
//         bargraph.selectAll("g.x text")
//             .style("text-anchor", "start")
//             .attr('dx', '5')
//             .attr('dy', '-5')
//             .attr('transform', "rotate(-90)");
//     });

// }


// var loopDimension = ndx.dimension(dc.pluck('logical_op'));


// GENDER
// function show_loop_pref_by_gender(ndx) {
//     var loopDimension = ndx.dimension(dc.pluck('logical_op'));
//     var sexDimension = ndx.dimension(function (d) {
//         return d.sex
//     });
//     var sexFilterW = sexDimension.filter("female");
//     console.log(sexFilterW.top(Infinity));
//     // console.log(sexFilter.groupAll());
//     // var sexOp = sexDimension.group().reduceCount(dc.pluck('logical_op'));
//     // console.log(sexOp);
//     var sexGroup = loopDimension.group();

//     dc.barChart("#female-loop")
//                 .width(400)
//                 .height(400)
//                 .margins({
//                     top: 10,
//                     right: 50,
//                     bottom: 30,
//                     left: 50
//                 })
//                 .dimension(sexDimension)
//                 .group(sexGroup)
//                 .x(d3.scale.ordinal())
//                 .xUnits(dc.units.ordinal)
//                 .xAxisLabel("Logical Operator Preferences with Women")
//                 .yAxis().ticks(40);

//     sexDimension.filterAll();
//     var sexFilterM = sexDimension.filter("male");
//     var sexGroup = loopDimension.group();
//     console.log(sexFilterM.top(Infinity));

//     dc.barChart("#male-loop")
//                 .width(400)
//                 .height(400)
//                 .margins({
//                     top: 10,
//                     right: 50,
//                     bottom: 30,
//                     left: 50
//                 })
//                 .dimension(sexDimension)
//                 .group(sexGroup)
//                 .x(d3.scale.ordinal())
//                 .xUnits(dc.units.ordinal)
//                 .xAxisLabel("Logical Operator Preferences with Men")
//                 .yAxis().ticks(40);
// }