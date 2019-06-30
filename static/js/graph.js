queue()
    .defer(d3.csv, "data/mydata.csv")
    .await(makeGraphs);

function makeGraphs(error, opData) {
    var ndx = crossfilter(opData);

    opData.forEach(function (d) {
        d.salary = parseInt(d.salary);
    })


    show_percentage_logical(ndx, "AND", "#percent-of-and");
    show_percentage_logical(ndx, "OR", "#percent-of-or");
    show_percentage_logical(ndx, "NOT", "#percent-of-not");
    country_rowchart(ndx);
    discipline_bargraph(ndx);
    show_count_of_choices_by_logical_op(ndx);


    dc.renderAll();

    function show_percentage_logical(ndx, logical, element) {

        var dim = ndx.dimension(function (d) {
            return d.total;
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
        dc.numberDisplay(element)
            .formatNumber(d3.format(".2%"))
            .valueAccessor(function (p, d) {
                if (p.count == 0) {
                    return 0;
                } else {
                    return (p.count / dim.groupAll().value());
                }
            })
            .dimension(dim)
            .group(lgop_group)
    }

    function country_rowchart(ndx) {
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

        // bargraph.renderlet(function (d) {
        //     bargraph.selectAll("g.x text")
        //         .style("text-anchor", "start")
        //         .attr('dx', '5')
        //         .attr('dy', '-5')
        //         .attr('transform', "rotate(-90)");
        // });
    }


    function show_count_of_choices_by_logical_op(ndx) {
        var logical_dim = ndx.dimension(function (d) {
            return d.logical_op;
        });
        var logical_group = logical_dim.group();
        
        var choices_dim = ndx.dimension(function (d) {
            return d.choice;
        });
        // console.log(choices_group.top(Infinity));

        // totals are the same

        var countOfDogsPerLop = logical_dim.group().reduce(
            function (d) {
                if (d.choice === "DOGS") {
                    d.choice++;
                    return d;
                } 
                else {
                    return 0;
                }
            },
            function (d) {
                if (d.choice === "DOGS") {
                    d.choice--;
                    return p;
                } else {
                    return 0;
                }
            },
            function () {
                return {
                    choice: 0
                };
            });
        console.log(countOfDogsPerLop.top(Infinity));

        var countOfCatsPerLop = logical_dim.group().reduce(
            function (p, d) {
                if (d.choice === "CATS") {
                    p.choice++;
                    return p;
                } else {
                    return 0;
                }
            },
            function (p, d) {
                if (d.choice === "CATS")
                    p.choice--;
                return p;
            },
            function () {
                return {
                    choice: 0
                };
            });
        console.log(countOfCatsPerLop.top(Infinity));

        var stackedChart = dc.barChart("#stacked-choice");
        stackedChart
            .width(500)
            .height(500)
            .dimension(logical_dim)
            .group(logical_group)
            // .stack(countOfDogsPerLop)
            // .stack(countOfCatsPerLop)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));

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