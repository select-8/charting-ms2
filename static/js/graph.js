queue()
    .defer(d3.csv, "data/mydata.csv")
    .await(makeGraphs);

function makeGraphs(error, opData) {
    var ndx = crossfilter(opData);
    opData.forEach(function (d) {
        d.salary = parseInt(d.salary);
        d.time_as = parseInt(d.time_as);
    })
    // console.log(opData);


    show_percentage_logical(ndx, "AND", "#percent-of-and");
    show_percentage_logical(ndx, "OR", "#percent-of-or");
    show_percentage_logical(ndx, "NOT", "#percent-of-not");
    country_rowchart(ndx);
    discipline_bargraph(ndx);
    show_count_of_choices_by_logical_op(ndx); //maybe should be other way around
    show_count_of_operator_over_time(ndx);

    dc.renderAll();

    function show_percentage_logical(ndx, logical, element) {

        var dim = ndx.dimension(function (d) {
            return d.logical_op;
        });

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
        var numDis = dc.numberDisplay(element);
        numDis
            .formatNumber(d3.format(".2%"))
            .valueAccessor(function (p, d) {
                if (p.count == 0) {
                    return 0;
                } else {
                    return (p.count / dim.groupAll().value());
                    // return (p.count / dim_total);
                }
            })
            .dimension(dim)
            .group(lgop_group)
    }

    function country_rowchart(ndx) {
        var dim = ndx.dimension(dc.pluck('country'));
        var group = dim.group();

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

    function discipline_bargraph(ndx) {

        var dim = ndx.dimension(dc.pluck('discipline'));
        var group = dim.group();

        var dis_bargraph = dc.barChart("#discipline-bar");
        dis_bargraph
            .width(520)
            .height(520)
            .margins({
                top: 0,
                right: 50,
                bottom: 20,
                left: 80
            })
            .dimension(dim)
            .group(group)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .yAxis().ticks(14);
    }


    function show_count_of_choices_by_logical_op(ndx) {
        var logical_dim = ndx.dimension(function (d) {
            return d.logical_op;
        });
        var groupByDogs = logical_dim.group().reduce(
            function reduceAdd(p, v) {
                if (v.choice === "DOGS") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.choice === "DOGS") {
                    p--
                }
                return p;
            },
            function reduceInitial() {
                return 0;
            }
        );
        var groupByCats = logical_dim.group().reduce(
            function reduceAdd(p, v) {
                if (v.choice === "CATS") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.choice === "CATS") {
                    p--
                }
                return p;
            },
            function reduceInitial() {
                return 0;
            }
        );

        var stackedChart = dc.barChart("#stacked-choice");
        stackedChart
            .dimension(logical_dim)
            .group(groupByDogs, "Dogs")
            .stack(groupByCats, "Cats")
            .width(350)
            .height(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));

    }

    function show_count_of_operator_over_time(ndx) {
        var time_as_dim = ndx.dimension(function (d) {
            return d.time_as;
        });
        var groupByAnd = time_as_dim.group().reduce(
            function reduceAdd(p, v) {
                // console.log(v.choice);
                if (v.logical_op === "AND") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.logical_op === "AND") {
                    p--
                }
                return p;
            },
            function reduceInitial() {
                return 0;
            }
        );
        var groupByOr = time_as_dim.group().reduce(
            function reduceAdd(p, v) {
                // console.log(v.choice);
                if (v.logical_op === "OR") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.logical_op === "OR") {
                    p--
                }
                return p;
            },
            function reduceInitial() {
                return 0;
            }
        );
        var groupByNot = time_as_dim.group().reduce(
            function reduceAdd(p, v) {
                // console.log(v.choice);
                if (v.logical_op === "NOT") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.logical_op === "NOT") {
                    p--
                }
                return p;
            },
            function reduceInitial() {
                return 0;
            }
        );


        // console.log(groupByAnd.top(Infinity));

        var minTime = time_as_dim.bottom(1)[0].time_as;
        var maxTime = time_as_dim.top(1)[0].time_as;

            var compositeChart = dc.compositeChart('#composite-chart');
            compositeChart
                .width(750)
                .height(500)
                .dimension(time_as_dim)
                .x(d3.scale.linear().domain([minTime, maxTime]))
                .yAxisLabel("Count Logical Operator")
                .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
                .renderHorizontalGridLines(true)
                .compose([
                    dc.lineChart(compositeChart)
                    .colors('green')
                    .group(groupByAnd, 'AND'),
                    dc.lineChart(compositeChart)
                    .colors('red')
                    .group(groupByOr, 'OR')
                    .dashStyle([2,2]),
                    dc.lineChart(compositeChart)
                    .colors('blue')
                    .group(groupByNot, 'NOT')
                ])
                .brushOn(true)
                .elasticY(true);
    }



    // function op_bar(ndx) {
    //     var op_dim = ndx.dimension(dc.pluck('logical_op'));
    //     var op_group = op_dim.group();
    //     var op_bargraph = dc.barChart("#op-bar");
    //     op_bargraph
    //         .width(550)
    //         .height(350)
    //         .margins({
    //             top: 10,
    //             right: 50,
    //             bottom: 30,
    //             left: 50
    //         })
    //         .dimension(op_dim)
    //         .group(op_group)
    //         .transitionDuration(500)
    //         .x(d3.scale.ordinal())
    //         .xUnits(dc.units.ordinal)
    //         .xAxisLabel("logical_op")
    //         .yAxis().ticks(14);

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
    // 
}