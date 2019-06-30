queue()
    .defer(d3.csv, "data/mydata.csv")
    .await(makeGraphs);

function makeGraphs(error, opData) {
    var ndx = crossfilter(opData);

    opData.forEach(function (d) {
        d.salary = parseInt(d.salary);
    })

    // show_op_selector(ndx);
    op_pie(ndx);
    op_bar(ndx);
    get_and_show_country(ndx);
    discipline_bar(ndx);
    // get_total(ndx);
    show_percent_that_are_professors(ndx, "AND", "#percent-of-and");
    show_percent_that_are_professors(ndx, "OR", "#percent-of-or");
    show_percent_that_are_professors(ndx, "NOT", "#percent-of-not");


    dc.renderAll();
    // console.log(opData);
}
// function get_total(ndx) {
// var dim = ndx.dimension(function(d) {return d.total; });
// // console.log(id_dim.groupAll().value());

// }

function show_percent_that_are_professors(ndx, logical, element) {

    var id_dim = ndx.dimension(function(d) {return d.total; });
    console.log(id_dim.groupAll().value());

    var lgop_group = ndx.groupAll().reduce(
        function (p, v) {
            if (v.logical_op === logical)
                p.count++;
            return p;
        },
        function (p, v) {
            if (v.logical_op === logical)
                p.count--;
            return p;
        },
        function () {
            return {
                count: 0
            };
        }
    );
    dc.numberDisplay(element)
        .formatNumber(d3.format(".2%"))
        .valueAccessor(function (p, d) {
            if (p.count == 0) {
                return 0;
            }
            else {
                return (p.count / id_dim.groupAll().value());
            }
        })
        .dimension(id_dim)
        .group(lgop_group)
}


function op_pie(ndx) {
    var dim = ndx.dimension(dc.pluck('logical_op'));
    var group = dim.group();

    dc.pieChart('#dis-pie')
        .height(330)
        .radius(360)
        .transitionDuration(1500)
        .dimension(dim)
        .group(group)
        .colors(d3.scale.ordinal().range(
            ['RED', 'BLUE', 'GREEN']))
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

function discipline_bar(ndx) {

    var dis_dim = ndx.dimension(dc.pluck('discipline'));

    var dis_group = dis_dim.group();

    var dis_bargraph = dc.barChart("#discipline-bar");
    dis_bargraph
        .width(550)
        .height(350)
        .margins({
            top: 10,
            right: 50,
            bottom: 30,
            left: 50
        })
        .dimension(dis_dim)
        .group(dis_group)
        // .valueAccessor
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("discipline")
        .yAxis().ticks(14);

    // bargraph.renderlet(function (d) {
    //     bargraph.selectAll("g.x text")
    //         .style("text-anchor", "start")
    //         .attr('dx', '5')
    //         .attr('dy', '-5')
    //         .attr('transform', "rotate(-90)");
    // });
}

function op_bar(ndx) {
    var op_dim = ndx.dimension(dc.pluck('logical_op'));
    var op_group = op_dim.group();
    var op_bargraph = dc.barChart("#op-bar");
    op_bargraph
        .width(550)
        .height(350)
        .margins({
            top: 10,
            right: 50,
            bottom: 30,
            left: 50
        })
        .dimension(op_dim)
        .group(op_group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("logical_op")
        .yAxis().ticks(14);

}


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