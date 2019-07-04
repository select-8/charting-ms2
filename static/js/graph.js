queue()
    .defer(d3.csv, "data/mydata.csv")
    .await(makeGraphs);


var width;
$(window).on('load', function () {
    width = $(window).width();
    // console.log(width);
})

function makeGraphs(error, opData) {
    var ndx = crossfilter(opData);
    opData.forEach(function (d) {
        d.salary = parseInt(d.salary);
        d.time_as = parseInt(d.time_as);
        d.hours_per_week = parseInt(d.hours_per_week);
    })
    // console.log(opData);


    show_percentage_logical_t(ndx, "AND", "#percent-of-and");
    show_percentage_logical_t(ndx, "OR", "#percent-of-or");
    show_percentage_logical_t(ndx, "NOT", "#percent-of-not");
    country_rowchart(ndx);
    discipline_bargraph(ndx);
    show_count_of_choices_by_logical_op(ndx);
    show_count_of_operator_over_time(ndx);
    remove_empty_bins();

    dc.renderAll();

    //https://github.com/dc-js/dc.js/wiki/FAQ#remove-empty-bins

    function remove_empty_bins(source_group) {
        return {
            all: function () {
                return source_group.all().filter(function (d) {
                    return d.value != 0;
                });
            }
        };
    };

    function show_percentage_logical_t(ndx, logical, element) {

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
                    var totalCount = dim.groupAll().value();
                    console.log((p.count / totalCount) * 100);
                    return (p.count / totalCount);
                }
            })
            .dimension(dim)
            .group(lgop_group);
    }

    function country_rowchart(ndx) {
        var dim = ndx.dimension(dc.pluck('country'));
        var country_group = dim.group();
        var filtered_group = remove_empty_bins(country_group);

        var rowchart = dc.rowChart('#country-chart')
        rowchart
            .height(520)
            .width(220)
            .margins({
                top: 5,
                left: 10,
                right: 10,
                bottom: 20
            })
            .elasticX(true)
            .dimension(dim)
            .group(filtered_group)
            .colors(d3.scale.category20())
            .xAxis().ticks(13);
    }

    function discipline_bargraph(ndx) {

        var dis_dim = ndx.dimension(dc.pluck('discipline'));

        var salary_group = dis_dim.group().reduce(

            function (p, v) {
                p.count++;
                p.total += v.salary;
                p.average = p.total / p.count;
                return p;
            },
            function (p, v) {
                p.count--;
                if (p.count == 0) {
                    p.total = 0;
                    p.average = 0;
                } else {
                    p.total -= v.salary;
                    p.average = p.total / p.count;
                }
                return p;
            },
            function () {
                return {
                    count: 0,
                    total: 0,
                    average: 0
                };
            }
        );

        var dis_bargraph = dc.barChart("#discipline-bar");
        dis_bargraph
            .width(500)
            .height(520)
            .margins({
                top: 50,
                right: 0,
                bottom: 50,
                left: 50
            })
            .dimension(dis_dim)
            .group(salary_group)
            .valueAccessor(function (d) {
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xAxisLabel("Main Language Practised")
            .yAxisLabel("Average Salary")
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .yAxis().ticks(14);
    }

    function show_count_of_choices_by_logical_op(ndx) {
        var logical_dim = ndx.dimension(function (d) {
            return d.level;
        });

        var groupByFalse = logical_dim.group().reduce(
            function reduceAdd(p, v) {
                if (v.choice === "FALSE") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.choice === "FALSE") {
                    p--
                }
                return p;
            },
            function reduceInitial() {
                return 0;
            }
        );
        var groupByTrue = logical_dim.group().reduce(
            function reduceAdd(p, v) {
                if (v.choice === "TRUE") {
                    p++
                }
                return p;
            },
            function reduceRemove(p, v) {
                if (v.choice === "TRUE") {
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
            .group(groupByFalse, "Female")
            .stack(groupByTrue, "Male")
            .width(350)
            .height(520)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true)
            .legend(dc.legend().x(250).y(10).itemHeight(13).gap(5))
    }

    // function show_count_of_operator_over_time(ndx) {
    //     var time_as_dim = ndx.dimension(dc.pluck('time_as'));

    //     var jsHoursPerWeek = time_as_dim.group().reduceSum(function (d) {
    //         if (d.discipline === 'JavaScript') {
    //             return +d.hours_per_week
    //         } else {
    //             return 0;
    //         }
    //     });

    //     var jHoursPerWeek = time_as_dim.group().reduceSum(function (d) {
    //         if (d.discipline === 'Java') {
    //             return +d.hours_per_week
    //         } else {
    //             return 0;
    //         }
    //     });

    //     var pyHoursPerWeek = time_as_dim.group().reduceSum(function (d) {
    //         if (d.discipline === 'Python') {
    //             return +d.hours_per_week
    //         } else {
    //             return 0;
    //         }
    //     });

    //     var minTimeAs = time_as_dim.bottom(1)[0].time_as;
    //     var maxTimeAs = time_as_dim.top(1)[0].time_as;
    //     console.log(minTimeAs);
    //     console.log(maxTimeAs);

    //     var compositeChart = dc.compositeChart('#composite-chart');
    //     compositeChart
    //         .width(width)
    //         .height(500)
    //         .margins({
    //             top: 50,
    //             right: 50,
    //             bottom: 50,
    //             left: 50
    //         })
    //         .dimension(time_as_dim)
    //         .x(d3.scale.linear().domain([minTimeAs, maxTimeAs]))
    //         .xAxisLabel("Hours worked per week")
    //         .yAxisLabel("Career Length so-far")
    //         .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    //         .renderHorizontalGridLines(true)
    //         .compose([
    //             dc.lineChart(compositeChart)
    //             .colors('green')
    //             .group(jsHoursPerWeek, 'Javascript'),
    //             dc.lineChart(compositeChart)
    //             .colors('red')
    //             .group(jHoursPerWeek, 'Java')
    //             .dashStyle([2, 2]),
    //             dc.lineChart(compositeChart)
    //             .colors('blue')
    //             .group(pyHoursPerWeek, 'Python')
    //         ])
    //         .brushOn(false)
    //         .elasticY(true);
    // }

    function show_count_of_operator_over_time(ndx) {
    var hours_per_dim = ndx.dimension(dc.pluck('hours_per_week'));
    var total_spend_per_date = hours_per_dim.group().reduceCount(dc.pluck('time_as'));

    var minDate = hours_per_dim.bottom(1)[0].hours_per_week;
    var maxDate = hours_per_dim.top(1)[0].hours_per_week;

    dc.lineChart("#composite-chart")
        .width(1000)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(hours_per_dim)
        .group(total_spend_per_date)
        .transitionDuration(500)
        .x(d3.scale.linear().domain([minDate, maxDate]))
        .xAxisLabel("Hours Worked Per Week")
        .yAxisLabel("Years as a Developer")
        .elasticY(true)
        .yAxis().ticks(10);
    }

}